import { CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  ParagraphElementDataFragmentDoc,
  type ParagraphElementDataFragment,
} from "@/gql/graphql";
import { CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import {
  isUPocParagraphProps,
  ParagraphElementLayoutProps,
} from "./displayTemplates";
import { DefaultParagraphElement } from "./_default";
import { UPocParagraphElement } from "./_upoc";

/**
 * Paragraph
 *
 */
export const ParagraphElementElement: CmsComponent<
  ParagraphElementDataFragment,
  ParagraphElementLayoutProps
> = ({ data, layoutProps, contentLink, ctx }) => {
  if (isUPocParagraphProps(layoutProps)) {
    return (
      <CmsEditable
        as={UPocParagraphElement}
        ctx={ctx}
        cmsFieldName="text"
        forwardCtx
        cmsId={contentLink.key}
        data={data}
        layoutProps={layoutProps}
      />
    );
  }
  return (
    <CmsEditable
      as={DefaultParagraphElement}
      ctx={ctx}
      cmsFieldName="text"
      forwardCtx
      cmsId={contentLink.key}
      data={data}
      layoutProps={layoutProps}
    />
  );
};
ParagraphElementElement.displayName = "Paragraph (Element/ParagraphElement)";
ParagraphElementElement.getDataFragment = () => [
  "ParagraphElementData",
  ParagraphElementDataFragmentDoc,
];

export default ParagraphElementElement;
