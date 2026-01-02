import * as React from 'react'
import * as Prism from 'prism-react-renderer'
import * as Class from '@/class'

function stripMinLeadingSpaces(multiline: string): string {
    const lines = multiline.replace(/\r\n?/g, '\n').split('\n')

    let minIndent = Infinity

    for (const line of lines) {
        if (line.trim().length === 0) continue
        const leadingSpaces = line.match(/^ */)?.[0].length ?? 0
        if (leadingSpaces < minIndent) minIndent = leadingSpaces
    }

    if (!isFinite(minIndent) || minIndent === 0) return lines.join('\n')

    return lines.map(line => (line.startsWith(' '.repeat(minIndent)) ? line.slice(minIndent) : line)).join('\n')
}

function splitLineAttrs(line: Prism.Token[]): [string | null, Prism.Token[]] {
    let index = 0
    for (; ; index++) {
        const token = line[index]
        if (token == null) return [null, line]
        if (token.content.trim().length == 0) continue
        const match = token.content.match(/\/\*@([!a-zA-Z0-9_-]+)\*\//)
        if (match == null) return [null, line]
        return [match[1], line.filter((_, i) => i != index)]
    }
}

// =================
// === Component ===
// =================

export function Component({
    src,
    className,
    roundedBottom = true,
    lineClassName,
}: {
    src: string
    className?: string
    roundedBottom?: boolean
    lineClassName?: string
}) {
    const srcClean = stripMinLeadingSpaces(src).trim()
    const themeBase = Prism.themes.vsLight
    const theme = {
        styles: themeBase.styles,
        plain: {
            backgroundColor: 'transparent',
            color: 'rgba(0, 0, 0, 0.8)',
        },
    }
    return (
        <div className={Class.names('text-[14px] leading-[1.3em]', className)}>
            <div className='relative'>
                <div
                    className={Class.names(
                        'relative bg-zinc-100 overflow-scroll',
                        roundedBottom ? 'rounded-2xl' : 'rounded-t-2xl',
                    )}
                >
                    <Prism.Highlight
                        theme={theme}
                        code={srcClean}
                        language='rust'
                    >
                        {({style, tokens, getLineProps, getTokenProps}) => (
                            <pre
                                className='py-8 w-max min-w-full'
                                style={style}
                            >
                                {(() => {
                                    return tokens.map((lineAndAttrs, i) => {
                                        const [attrs, line] = splitLineAttrs(lineAndAttrs)
                                        return (
                                            <div className={Class.names('px-8', lineClassName, attrs)}>
                                                <div
                                                    key={i}
                                                    {...getLineProps({line})}
                                                >
                                                    {line.map((token, key) => (
                                                        <span
                                                            key={key}
                                                            {...getTokenProps({token})}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })
                                })()}
                            </pre>
                        )}
                    </Prism.Highlight>
                </div>
            </div>
        </div>
    )
}

// ===============
// === Details ===
// ===============

export function Details({summary, children}: {summary: string; children: React.ReactNode}) {
    return (
        <details className='mt-[1px] mb-6 bg-zinc-100 rounded-b-2xl cursor-pointer'>
            <summary className='w-full p-4 text-blue-600'>&nbsp;{summary}</summary>
            {children}
        </details>
    )
}
