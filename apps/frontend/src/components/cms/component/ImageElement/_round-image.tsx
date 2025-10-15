import 'server-only'
import { type ImageElementDataFragment } from "@/gql/graphql"

// To be moved to library
import Image from '@/components/shared/cms_image'
import { type RoundImageElementComponent, ImageElementLayoutProps, RoundImageElementProps } from './displayTemplates'

export const RoundImageElement : RoundImageElementComponent<ImageElementDataFragment> = ({ data: { altText, imageLink }, layoutProps, ...props }) => {
    return <div className="not-prose relative w-full overflow-hidden aspect-square rounded-full" { ...props }>
        <Image alt={altText ?? ""} src={ imageLink } fill className="object-cover" />
    </div>
}

export function isRoundImageLayout(layoutProps : ImageElementLayoutProps | undefined | null) : layoutProps is RoundImageElementProps
{
    return layoutProps?.template == "RoundImageElement"
}

export default RoundImageElement