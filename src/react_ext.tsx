import * as React from "react";

export function useStateRef<T>(initial: T) {
    const [state, setState] = React.useState<T>(initial)
    const ref = React.useRef<T>(state)

    const set = React.useCallback(
        (value: React.SetStateAction<T>) => {
            setState(prev => {
                const next =
                    typeof value === "function"
                        ? (value as (prev: T) => T)(prev)
                        : value

                ref.current = next
                return next
            })
        },
        []
    )

    return [state, set, ref] as const
}
