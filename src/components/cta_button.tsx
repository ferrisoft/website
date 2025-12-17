// =================
// === Component ===
// =================

export type Props = {
    onMouseDown?: () => void
}

export function Component(props: Props) {
    return (
        <div className='fixed left-0 top-0 w-full h-dvh flex justify-center items-end z-100 pb-8'>
            <div
                className='
                    select-none cursor-pointer
                    h-10 px-4 rounded-full
                    inline-flex items-center justify-center
                    text-white
                    bg-black/80 backdrop-blur-lg
                    ring-4 ring-white
                '
                onMouseDown={props.onMouseDown}
            >
                Contact Us
            </div>
        </div>
    )
}
