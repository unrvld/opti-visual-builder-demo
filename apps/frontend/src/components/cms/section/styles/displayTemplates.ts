import type { LayoutProps } from "@remkoj/optimizely-cms-react"
import type { ReactNode } from "react"
import type DefaultGridStyles from "./DefaultGrid/DefaultGrid.opti-style.json"
import type UPocGridStyle from "./UPocGrid/UPocGridStyle.opti-style.json"

export type DefaultGridProps = LayoutProps<typeof DefaultGridStyles>
export type DefaultGridComponentProps<DT extends Record<string, any> = Record<string, any>> = {
    data: DT
    layoutProps: DefaultGridProps | undefined
} & JSX.IntrinsicElements['div']
export type DefaultGridComponent<DT extends Record<string, any> = Record<string, any>> = (props: DefaultGridComponentProps<DT>) => ReactNode

export type UPocGridProps = LayoutProps<typeof UPocGridStyle>
export type UPocGridComponentProps<DT extends Record<string, any> = Record<string, any>> = {
    data: DT
    layoutProps: UPocGridProps | undefined
} & JSX.IntrinsicElements['div']
export type UPocGridComponent<DT extends Record<string, any> = Record<string, any>> = (props: UPocGridComponentProps<DT>) => ReactNode


export type SectionLayoutProps = DefaultGridProps | UPocGridProps
export type SectionComponentProps<DT extends Record<string, any> = Record<string, any>, LP extends SectionLayoutProps = SectionLayoutProps> = {
    data: DT
    layoutProps: LP | undefined
} & JSX.IntrinsicElements['div']

export type SectionComponent<DT extends Record<string, any> = Record<string, any>, LP extends SectionLayoutProps = SectionLayoutProps> = (props: SectionComponentProps<DT,LP>) => ReactNode

export function isDefaultProps(props?: SectionLayoutProps | null) : props is DefaultGridProps
{
    return props?.template == "DefaultGrid"
}

export function isUPocGridProps(props? : SectionLayoutProps | null) : props is UPocGridProps
{
    return props?.template == "UPocGridStyle"
}

export function isDefaultGridProps(props?: SectionLayoutProps | null) : props is DefaultGridProps
{
    return props?.template == "DefaultGrid"
}