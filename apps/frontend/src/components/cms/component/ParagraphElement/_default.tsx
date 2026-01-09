import { ParagraphElementDataFragment } from "@gql/graphql";
import { DefaultParagraphComponent } from "./displayTemplates";
import { extractSettings, RichText } from "@remkoj/optimizely-cms-react/rsc";
import clsx from "clsx";

enum AlignClasses {
  left = "mr-auto ml-0",
  center = "mx-auto",
  right = "ml-auto mr-0",
}

export const DefaultParagraphElement: DefaultParagraphComponent<
  ParagraphElementDataFragment
> = ({ data: { text }, layoutProps, className, ...restProps }) => {
  const { placement = "left", transform = "default" } =
    extractSettings(layoutProps);

  return (
    <RichText
      text={text?.json}
      className={clsx(className, "prose", AlignClasses[placement], {
        "max-w-none": transform == "full",
      })}
      {...restProps}
    />
  );
};
