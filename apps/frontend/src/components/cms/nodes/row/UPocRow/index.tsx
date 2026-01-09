import {
  CmsLayoutComponent,
  extractSettings,
} from "@remkoj/optimizely-cms-react/rsc";
import { UPocRowProps } from "../displayTemplates";
import clsx, { ClassValue } from "clsx";

type UPocRowLayoutSpec = Required<
  ReturnType<typeof extractSettings<UPocRowProps>>
>;
type UPocRowLayoutDict<K extends keyof UPocRowLayoutSpec, T = any> = {
  [P in UPocRowLayoutSpec[K]]: T;
};

const alignmentClasses: UPocRowLayoutDict<"alignment", ClassValue> = {
  start: "justify-start",
  middle: "justify-center",
  end: "justify-end",
};

const spacingClasses: UPocRowLayoutDict<"spacing", ClassValue> = {
  none: "gap-0",
  small: "gap-2",
  medium: "gap-3",
  large: "gap-5",
};

export const UPocRowComponent: CmsLayoutComponent<UPocRowProps> = ({
  layoutProps,
  children,
}) => {
  const { alignment = "start", spacing = "small" } =
    extractSettings(layoutProps);

  return (
    <div
      className={clsx(
        "vb:row vb:row:UPocRow relative z-[10] flex max-md:flex-col",
        alignmentClasses[alignment],
        spacingClasses[spacing],
      )}
    >
      {children}
    </div>
  );
};

export default UPocRowComponent;
