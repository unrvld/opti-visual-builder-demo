import { extractSettings } from "@remkoj/optimizely-cms-react/rsc";
import { UPocGridComponent, UPocGridProps } from "../displayTemplates";
import clsx, { ClassValue } from "clsx";

type UPocGridLayoutSpec = Required<
  ReturnType<typeof extractSettings<UPocGridProps>>
>;
type UPocGridLayoutDict<K extends keyof UPocGridLayoutSpec, T = any> = {
  [P in UPocGridLayoutSpec[K]]: T;
};

const paddingClasses: UPocGridLayoutDict<"padding", ClassValue> = {
  extraSmall: "p-spacing-2",
  small: "p-spacing-3",
  medium: "p-spacing-4",
  large: "p-spacing-5",
  extraLarge: "p-spacing-6",
};

const minimumHeightClasses: UPocGridLayoutDict<"minimumHeight", ClassValue> = {
  none: "min-h-[unset]",
  small: "min-h-[400px] md:min-h-[475px]",
  medium: "min-h-[600px] md:min-h-[638px]",
  large: "min-h-[600px] md:min-h-[790px]",
  extraLarge: "min-h-[780px] md:min-h-[843px]",
};

const themeClasses: UPocGridLayoutDict<"theme", ClassValue> = {
  none: "",
  light: "group light bg-grey-200 text-grey-600",
  dark: "group dark bg-grey-600 text-white",
};

export const UPocGrid: UPocGridComponent = ({ children, layoutProps }) => {
  const {
    padding = "medium",
    minimumHeight = "none",
    theme = "none",
  } = extractSettings(layoutProps);

  return (
    <section
      className={clsx(
        "vb:section vb:section:UPocGrid isolate relative container mx-auto",
        paddingClasses[padding],
        minimumHeightClasses[minimumHeight],
        themeClasses[theme],
      )}
    >
      {children}
    </section>
  );
};

export default UPocGrid;
