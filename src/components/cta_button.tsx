import * as React from 'react'

// =================
// === Component ===
// =================

export function Component() {
    const ref = React.useRef<HTMLDivElement>(null)
    return (
        <>
            <div
                id='contact'
                ref={ref}
            />
            <div className='w-full flex justify-center sticky bottom-4 pt-8 z-100'>
                <div
                    className='
                    select-none cursor-pointer
                    h-10 px-4 rounded-full
                    inline-flex items-center justify-center
                    text-white
                    bg-black/80 backdrop-blur-lg
                    ring-4 ring-white
                '
                    onMouseDown={() => {
                        if (ref.current) ref.current.scrollIntoView({behavior: 'smooth'})
                    }}
                >
                    {/*Contact Us*/}
                    Book a consultation
                </div>
            </div>
        </>
    )
}
