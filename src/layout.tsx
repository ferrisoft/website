import * as React from 'react'
import * as Class from './class'

export type DivProps = React.ComponentPropsWithoutRef<'div'>

// =================
// === Container ===
// =================

export function Container(props: DivProps) {
    return (
        <div
            {...props}
            className={Class.names(props.className, '_container w-full max-w-screen-xl mx-auto')}
        >
            {props.children}
        </div>
    )
}

// ===================
// === RootPadding ===
// ===================

export function RootPaddingX(props: DivProps) {
    return (
        <div
            {...props}
            className={Class.names(props.className, '_root_padding_x relative w-full h-full px-2 sm:px-8')}
        >
            {props.children}
        </div>
    )
}

export function RootPaddingY(props: DivProps) {
    return (
        <div
            {...props}
            className={Class.names(props.className, '_root_padding_y relative w-full h-full py-2 sm:py-8')}
        >
            {props.children}
        </div>
    )
}

export function ContentPaddingX(props: DivProps) {
    return (
        <div
            {...props}
            className={Class.names(props.className, '_content_padding_x relative w-full h-full px-8 xs:px-8 md:px-12')}
        >
            {props.children}
        </div>
    )
}

export function ContentPaddingY(props: DivProps) {
    return (
        <div
            {...props}
            className={Class.names(props.className, '_content_padding_y relative w-full h-full py-8 xs:py-8 md:py-12')}
        >
            {props.children}
        </div>
    )
}

// ===============
// === Section ===
// ===============

export function Section(props: DivProps) {
    return (
        <Container {...props}>
            <RootPaddingX>
                <ContentPaddingX>{props.children}</ContentPaddingX>
            </RootPaddingX>
        </Container>
    )
}

export function SectionCard(props: {
    children?: React.ReactNode
    background?: React.ReactNode
    className?: string
    style?: React.CSSProperties
}) {
    return (
        <Container
            className={props.className}
            style={props.style}
        >
            <RootPaddingX>
                <div className='w-full h-full relative'>
                    {props.background && (
                        <div className='_background absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden'>
                            {props.background}
                        </div>
                    )}
                    <ContentPaddingX className='w-full h-full'>
                        <ContentPaddingY>{props.children}</ContentPaddingY>
                    </ContentPaddingX>
                </div>
            </RootPaddingX>
        </Container>
    )
}
