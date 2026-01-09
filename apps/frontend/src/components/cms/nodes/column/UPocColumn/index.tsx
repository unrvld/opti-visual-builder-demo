import {
  CmsLayoutComponent,
  extractSettings,
} from "@remkoj/optimizely-cms-react/rsc";
import { UPocColumnProps } from "../displayTemplates";
import clsx, { ClassValue } from "clsx";

type UPocColumnLayoutSpec = Required<
  ReturnType<typeof extractSettings<UPocColumnProps>>
>;
type UPocColumnLayoutDict<K extends keyof UPocColumnLayoutSpec, T = any> = {
  [P in UPocColumnLayoutSpec[K]]: T;
};

const backgroundClasses: UPocColumnLayoutDict<"backGround", ClassValue> = {
  none: "bg-transparent text-inherit",
  light: "bg-grey-200 text-grey-600",
  dark: "bg-grey-500 text-white",
};

const spacingClasses: UPocColumnLayoutDict<"spacing", ClassValue> = {
  extraSmall: "gap-y-spacing-1",
  small: "gap-y-spacing-1_5",
  medium: "gap-y-spacing-2",
  large: "gap-y-spacing-3",
  extraLarge: "gap-y-spacing-4",
};

const paddingClasses: UPocColumnLayoutDict<"padding", ClassValue> = {
  extraSmall: "p-spacing-1_5",
  small: "p-spacing-2",
  medium: "p-spacing-3",
  large: "p-spacing-4",
  extraLarge: "p-spacing-5",
};

const sizeClassName: UPocColumnLayoutDict<"size", ClassValue> = {
  full: "flex-1",
  half: "max-md:flex-1 md:w-1/2",
  twoThirds: "max-md:flex-1 md:w-2/3",
};

export const UPocColumn: CmsLayoutComponent<UPocColumnProps> = ({
  children,
  layoutProps,
}) => {
  const {
    spacing = "medium",
    padding = "medium",
    backGround = "none",
    size = "full",
  } = extractSettings(layoutProps);

  const tpl = layoutProps?.template ?? "none";

  return (
    <div
      className={clsx(
        "relative top-0 vb:column flex flex-col",
        `vb:column:${tpl}`,
        spacingClasses[spacing],
        paddingClasses[padding],
        backgroundClasses[backGround],
        sizeClassName[size],
        "content-start items-start",
      )}
    >
      {children}
    </div>
  );
};
UPocColumn.displayName = "UPocColumn";

export default UPocColumn;
