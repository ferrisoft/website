import * as React from "react";

export function useStateRef<T>(initial: T) {
    const [state, setState] = React.useState<T>(initial)
    const ref = React.useRef<T>(state)

    const set = React.useCallback((value: T | ((prev: T) => T)) => {
        setState(prev => {
            const next = typeof value === "function" ? (value)(prev) : value
            ref.current = next
            return next
        })
    }, [])
    return [state, set, ref] as const
}
