import * as React from "react";
import * as Class from "./class"

export type Direction = 'x' | 'y' | 'xy'

export function Container({ children, className, style, direction='xy' }: { children: React.ReactNode, className?: string, style?: React.CSSProperties, direction?: Direction }) {
    let dirStyle = ''
    if (direction === 'xy') dirStyle = 'p-2 sm:p-4'
    else if (direction === 'x') dirStyle = 'px-2 sm:px-4'
    else if (direction === 'y') dirStyle = 'py-2 sm:py-4'
    return (
        <div className={Class.names(className, 'container max-w-screen-xl mx-auto', dirStyle)} style={style}>
            {children}
        </div>
    )
}

export function SectionBox({ children, className, direction='xy' }: { children: React.ReactNode, className?: string, direction?: Direction }) {
    console.log({direction})
    let dirStyle = ''
    if (direction === 'xy') dirStyle = 'p-4 xs:p-8 md:p-16'
    else if (direction === 'x') dirStyle = 'px-4 xs:px-8 md:px-16'
    else if (direction === 'y') dirStyle = 'py-4 xs:py-8 md:py-16'
    return (
        <div className={Class.names('section', className, dirStyle)}>
            {children}
        </div>
    )
}


export function Section({ children, background, style, className, direction='xy' }: { children?: React.ReactNode, background?: React.ReactNode, className?: string, style?: React.CSSProperties, direction?: Direction}) {
    return (
        <Container className={className} style={style} direction={direction}>
            <div className="w-full h-full relative">
                {background && (
                    <div className="_background absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden">
                        {background}
                    </div>
                )}
                <SectionBox className="w-full h-full" direction={direction}>
                    {children}
                </SectionBox>
            </div>
        </Container>
    )
}
