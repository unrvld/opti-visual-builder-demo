import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  LinkDataFragmentDoc,
  LinkItemDataFragmentDoc,
  ListOfLinksElementDataFragmentDoc,
  type ListOfLinksElementDataFragment,
} from "@/gql/graphql";
import { getFragmentData } from "@gql";
import Link from "next/link";
import { CmsEditable } from "@remkoj/optimizely-cms-react/rsc";

export const ListOfLinksElementComponent: CmsComponent<
  ListOfLinksElementDataFragment
> = ({ data, ctx }) => {
  return (
    <section>
      <CmsEditable
        as="h2"
        cmsFieldName="heading"
        ctx={ctx}
        className="font-sans text-3xl font-bold"
      >
        {data.heading}
      </CmsEditable>
      <CmsEditable
        as="ol"
        ctx={ctx}
        cmsFieldName="pageLinks"
        className="mt-3 space-y-1 list-decimal pl-4"
      >
        {data.pageLinks?.map((page) => {
          const pageData = getFragmentData(LinkItemDataFragmentDoc, page);
          const linkUrl = getFragmentData(LinkDataFragmentDoc, pageData?.url);
          if (!pageData || !linkUrl?.default) return null;
          return (
            <li
              key={pageData.text}
              className="cursor-pointer rounded-lg hover:bg-mischka px-2 py-1 w-fit"
            >
              <Link href={linkUrl.default}>{pageData?.text}</Link>
            </li>
          );
        })}
      </CmsEditable>
    </section>
  );
};
ListOfLinksElementComponent.displayName =
  "List of links (Component/ListOfLinksElement)";
ListOfLinksElementComponent.getDataFragment = () => [
  "ListOfLinksElementData",
  ListOfLinksElementDataFragmentDoc,
];

export default ListOfLinksElementComponent;
