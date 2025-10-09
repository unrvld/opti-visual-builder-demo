import { OptimizelyNextPage as CmsComponent } from "@remkoj/optimizely-cms-nextjs";
import { BlankExperienceDataFragmentDoc, type BlankExperienceDataFragment } from "@/gql/graphql";
import { getFragmentData } from "@/gql/fragment-masking";
import { ExperienceDataFragmentDoc, type Locales, type InputMaybe } from "@/gql/graphql";
import { OptimizelyComposition, isNode, CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import { getSdk } from "@/gql"

import { getLinkData, linkDataToUrl } from "@/lib/urls";
import { toValidOpenGraphType } from "@/lib/opengraph";
import { type Metadata } from "next";

/**
 * Blank Experience
 * An experience without a predefined layout.
 */
export const BlankExperienceExperience : CmsComponent<BlankExperienceDataFragment> = ({ data, ctx }) => {
    if (ctx) ctx.editableContentIsExperience = true;
    const composition = getFragmentData(ExperienceDataFragmentDoc, data).composition;
    return <div className="vb:experience" data-component="BlankExperience">
        { composition && isNode(composition) && <OptimizelyComposition node={composition} ctx={ ctx } /> }
    </div>
}
BlankExperienceExperience.displayName = "Blank Experience (Experience/BlankExperience)"
BlankExperienceExperience.getDataFragment = () => ['BlankExperienceData', BlankExperienceDataFragmentDoc]
BlankExperienceExperience.getMetaData = async (contentLink, locale, client) => {
    const sdk = getSdk(client);
    const data = await sdk.getBlankExperienceMetaData({
        key: contentLink.key,
        locale: locale as InputMaybe<Locales> | undefined
    })
    const pageData = data.page?.items?.at(0)
    if (!pageData)
        return {}
        
    const meta : Omit<Metadata, 'openGraph'> & { openGraph: NonNullable<Required<Metadata>['openGraph']>} = {
        title: pageData.seo?.title || pageData.meta?.displayName,
        description: pageData.seo?.description,
        metadataBase: tryToUrl(pageData?.meta?.url?.base),
        openGraph: {
            title: pageData.seo?.title ?? pageData.meta?.displayName ?? undefined,
            description: pageData.seo?.description ?? undefined
        },
        other: {
          "idio:content-type": "Blank experience"
        }
    }

    const ogType = toValidOpenGraphType(pageData.seo?.type)
    if (ogType) {
        //@ts-expect-error The type is set by explicit subtypes
        meta.openGraph.type = ogType
    }

    const pageImage = linkDataToUrl(getLinkData(pageData.seo?.image))
    if (pageImage) {
        meta.openGraph.images = [{
            url: pageImage
        }]
    }
    return meta
}

function tryToUrl(toConvert: string | null | undefined)
{
    if (!toConvert)
        return undefined
    try {
        return new URL(toConvert)
    } catch {
        return undefined
    }
}

export default BlankExperienceExperience
