import * as React from "react";

export type CSSVars = Record<`--${string}`, string | number>

export type CSSProperties = React.CSSProperties & CSSVars
