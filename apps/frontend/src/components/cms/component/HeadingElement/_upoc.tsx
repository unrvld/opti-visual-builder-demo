import { type FunctionComponent, type ComponentProps } from "react";
import { type UPocHeadingStylesComponent } from "./displayTemplates";
import { type HeadingElementDataFragment } from "@/gql/graphql";
import { extractSettings } from "@remkoj/optimizely-cms-react/rsc";
import clsx, { type ClassValue } from "clsx";

type UPocHeadingElementProps = ComponentProps<
  UPocHeadingStylesComponent<HeadingElementDataFragment>
> & {
  withReducedMotion?: boolean;
};

const headingSizeClasses: Record<string, ClassValue> = {
  extraLarge: "type-display-01",
  default: "type-display-02",
  medium: "type-display-03",
  small: "type-display-04",
};

export const UPocHeadingElement: FunctionComponent<UPocHeadingElementProps> = ({
  data: { headingText },
  layoutProps,
  className,
  ...containerProps
}) => {
  const cssClasses: string[] = [className ?? ""];
  const { headingSize = "default" } = extractSettings(layoutProps);

  return (
    <div {...containerProps}>
      <h2
        className={clsx(
          className,
          "type-display",
          headingSizeClasses[headingSize],
        )}
      >
        {headingText ?? ""}
      </h2>
    </div>
  );
};
