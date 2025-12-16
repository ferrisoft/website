import * as React from "react";
import LogoRaw from '@/assets/logo/ferrisoft.svg?react'

// =================
// === Component ===
// =================

export type BadgeCSSVars = {
    "--badge-background"?: string
    "--badge-letter"?: string
    "--name-letter"?: string
}

export type Props = Omit<React.ComponentPropsWithoutRef<"svg">, "style"> & {
    style?: React.CSSProperties & BadgeCSSVars
}

export function Component(props: Props) {
    return <LogoRaw {...props} />
}
