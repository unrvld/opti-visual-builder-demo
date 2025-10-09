"use server"
import { getSdk, type Sdk } from "@/gql/client";
import { getFragmentData } from "@/gql/fragment-masking";
import * as Schema from "@/gql/graphql"
import * as ContentIntel from '@/lib/integrations/optimizely-content-intelligence'
import { createClient, type ContentLinkWithLocale } from "@remkoj/optimizely-graph-client"
import type { NodeInput } from "@remkoj/optimizely-cms-react/rsc"
import { site_search as getSearchConfig } from "@/flags"

export type FacetFilters = {
    "ctype": string
    "locale": string
}

// Input filters
export type Filters = {
    [K in keyof FacetFilters]?: Array<FacetFilters[K]> | FacetFilters[K] | null
}
// Output filters
export type FilterOutputOptions = {
    [K in keyof FacetFilters]: {
        key: K
        label?: string | null
        options: Array<{
            key: FacetFilters[K]
            label?: string | null
            count?: number
        }>
    }
}

export type ContentSearchOptions = {
    facets?: Filters
    filters?: Filters
    limit?: number
    start?: number
    cursor?: string
    locale?: Schema.InputMaybe<Schema.InputMaybe<Schema.Locales> | Array<Schema.InputMaybe<Schema.Locales>>>
    sdk?: Sdk
    personalize?: boolean
}

export type ContentSearchResultItem = {
    id: ContentLinkWithLocale
    url?: {
        __typename?: "ContentUrl";
        base?: string | null;
        hierarchical?: string | null;
        default?: string | null;
    } | null
    title: string
    abstract?: NodeInput | null
    published?: string
    author?: string
    type?: string
    types?: Array<string>
}
export type ContentSearchFacet = FilterOutputOptions[keyof FilterOutputOptions]

export type ContentSearchResults = {
    term: string
    total: number
    paging: {
        start: number
        limit: number
        pages: number
    }
    items: Array<ContentSearchResultItem>
    facets?: Array<ContentSearchFacet>
    isPersonalized: boolean
}

/**
 * Server Side search implementation, which can be used across both APIs and 
 * React Server Components. Set the option "personalize" to "false", to prevent
 * Next.JS from bailing out of static generation.
 * 
 * @param term 
 * @param param1 
 */
export async function contentSearch(term: string, { facets, limit = 12, start = 0, locale, filters, sdk, personalize = true }: ContentSearchOptions = {}) : Promise<ContentSearchResults>
{
    const config = {
        use_personalization: true,
        interest_boost: 5,
        ...(await getSearchConfig()) as Partial<ReturnType<typeof getSearchConfig>>
    }
    const usePersonalization = config?.use_personalization && personalize
    const app = sdk || getSdk(createClient(undefined, undefined, { nextJsFetchDirectives: true, cache: true, queryCache: true }))

    const rawResults = await (async () => {
        if (usePersonalization) {
            const boost = config.interest_boost
            const topInterest = await getTopTopic()
            return app.personalizedSearchContent({
                term,
                topInterest,
                pageSize: limit,
                start,
                withinLocale: locale,
                boost,
                locale: filters?.locale == "" ? undefined : filters?.locale,
                types: filters?.ctype == "" ? undefined : filters?.ctype
            })
        }
        return app.searchContent({
            term,
            pageSize: limit,
            start,
            withinLocale: locale,
            locale: filters?.locale == "" ? undefined : filters?.locale,
            types: filters?.ctype == "" ? undefined : filters?.ctype
        })
    })()
    

    return {
        term,
        total: rawResults.Content?.total || 0,
        paging: {
            start,
            limit,
            pages: Math.max(Math.ceil((rawResults.Content?.total || 0) / limit), 1)
        },
        items: (rawResults.Content?.items?.filter(isNotNullOrUndefined) || []).map(item => {
            // Read fragments
            const searchItemData = getFragmentData(Schema.SearchDataFragmentDoc, item)
            const iContentData = getFragmentData(Schema.IContentDataFragmentDoc, searchItemData)
            const iContentMetaData = getFragmentData(Schema.IContentInfoFragmentDoc, iContentData?._metadata)
            const iContentUrlData = getFragmentData(Schema.LinkDataFragmentDoc, iContentMetaData?.url)

            // Build ID
            const contentLink : ContentLinkWithLocale = {
                key: iContentMetaData?.key ?? '-',
                version: iContentMetaData?.version ?? undefined,
                locale: iContentMetaData?.locale ?? undefined
            }

            //Construct output
            return {
                id: contentLink,
                url: iContentUrlData,
                title: tryReadStringProp(item, 'title') ?? iContentMetaData?.displayName ?? '',
                abstract: tryReadObjectProp(item, 'abstract.json') as NodeInput | null | undefined ?? tryReadStringProp(item, 'seodata.MetaDescription') as string | undefined,
                published: tryReadStringProp(item, '_metadata.published'),
                author: tryReadStringProp(item, 'author'),
                image: tryReadObjectProp(item, 'image') ?? tryReadObjectProp(item, 'seodata.SharingImage'),
                type: item.__typename ?? undefined,
                types: iContentMetaData?.types?.filter(isNotNullOrUndefined)
            }
        }),
        isPersonalized: usePersonalization,
        facets: [
            {
                key: 'ctype',
                options: (rawResults.Content?.facets?._metadata?.types || []).map(ctype => {
                    return {
                        key: ctype?.name ?? 'n/a',
                        count: ctype?.count ?? 0
                    }
                })
            },
            {
                key: "locale",
                options: (rawResults.Content?.facets?._metadata?.locale || []).map(locale => {
                    return {
                        key: locale?.name ?? 'n/a',
                        count: locale?.count ?? 0
                    }
                })
            }
        ]
    }
}

async function getTopTopic() : Promise<string | undefined>
{
    const interests = await ContentIntel.getTopTopics()
    return interests.slice(0,3).join(',')
}

function isNotNullOrUndefined<T>(toTest?: T | null) : toTest is T
{
    return (toTest != null && toTest != undefined) ? true : false
}

function tryReadStringProp(data: any, prop: string): string | undefined
{
    const path = prop.split('.')
    if (path.length > 1) {
        prop = path.pop() as string
        data = tryReadObjectProp(data, path.join('.'))
    }
    
    if (typeof(data) == 'object' && data[prop] && typeof(data[prop]) == 'string')
        return data[prop]
    return undefined
}

function tryReadObjectProp(data: any, prop: string): Object | undefined
{
    const path = prop.split('.')
    if (path.length > 1) {
        prop = path.pop() as string
        data = tryReadObjectProp(data, path.join('.'))
    }

    if (typeof(data) == 'object' && data[prop] && typeof(data[prop]) == 'object')
        return data[prop]
    return undefined
}

export default contentSearch