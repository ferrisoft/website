import * as React from 'react'

// =================
// === Component ===
// =================

const MIN_MARGIN = 64

export function Component({id, children}: {id: string; children: React.ReactNode}) {
    const idRef = React.useRef<HTMLDivElement>(null)
    const innerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (!innerRef.current) return

        const resizeObserver = new ResizeObserver(() => {
            if (!innerRef.current || !idRef.current) return
            const innerHeight = innerRef.current.offsetHeight ?? 0
            const viewportHeight = window.innerHeight
            const margin = Math.max((viewportHeight - innerHeight) / 2, MIN_MARGIN)
            idRef.current.style.top = `-${margin}px`
        })
        resizeObserver.observe(innerRef.current)
        return () => resizeObserver.disconnect()
    }, [])

    const margin = `calc(128px + 128px * var(--content-size-norm)`

    return (
        <div
            className='relative w-full flex-col'
            style={{
                marginTop: margin,
                marginBottom: margin,
            }}
        >
            <div
                id={id}
                ref={idRef}
                className='absolute left-0 top-0'
            />
            <div
                className='w-full'
                ref={innerRef}
            >
                {children}
            </div>
        </div>
    )
}
