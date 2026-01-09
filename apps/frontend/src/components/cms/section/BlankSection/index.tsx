import { CmsComponent } from "@remkoj/optimizely-cms-react";
import { BlankSectionDataFragmentDoc, type BlankSectionDataFragment } from "@/gql/graphql";
import { isUPocGridProps, SectionLayoutProps } from "../styles/displayTemplates";
import DefaultGrid from "../styles/DefaultGrid";
import { CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import UPocGrid from "../styles/UPocGrid";

/**
 * Blank Section
 * A section without a predefined layout.
 */
export const BlankSectionSection : CmsComponent<BlankSectionDataFragment, SectionLayoutProps> = ({ contentLink, layoutProps, children, ctx, data }) => {
    console.log(layoutProps?.template);
    
    if (isUPocGridProps(layoutProps)) {
        return <CmsEditable as={UPocGrid} data={data} layoutProps={layoutProps} cmsId={contentLink.key} ctx={ctx}>{children}</CmsEditable>
    }
    return <CmsEditable as={DefaultGrid} data={{}} layoutProps={ layoutProps } cmsId={ contentLink.key } ctx={ ctx }>{ children }</CmsEditable>
}
BlankSectionSection.displayName = "Blank Section (Section/BlankSection)"
BlankSectionSection.getDataFragment = () => ['BlankSectionData', BlankSectionDataFragmentDoc]

export default BlankSectionSection