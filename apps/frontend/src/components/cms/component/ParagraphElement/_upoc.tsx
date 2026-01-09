import { ParagraphElementDataFragment } from "@gql/graphql";
import { UPocParagraphComponent } from "./displayTemplates";
import { extractSettings, RichText } from "@remkoj/optimizely-cms-react/rsc";
import clsx from "clsx";

enum AlignClasses {
  left = "text-left",
  center = "text-center",
  right = "text-right",
}

enum TextSizeClasses {
  small = "type-body-short",
  medium = "type-body-long",
  large = "type-body-quote",
  extraLarge = "type-body-featured",
}

export const UPocParagraphElement: UPocParagraphComponent<
  ParagraphElementDataFragment
> = ({ data: { text }, layoutProps, className, ...restProps }) => {
  const { alignText = "left", textSize = "large" } =
    extractSettings(layoutProps);

  return (
    <RichText
      text={text?.json}
      className={clsx(
        className,
        "prose",
        AlignClasses[alignText],
        TextSizeClasses[textSize],
      )}
      {...restProps}
    />
  );
};
