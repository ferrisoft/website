import * as React from 'react'
import * as Layout from '@/layout.tsx'
import * as CompanyLogo from '@/components/company_logo.tsx'

// =================
// === Component ===
// =================

export function Component() {
    const bgRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (bgRef.current != null) {
            // @ts-expect-error -- provided by unicornstudio.umd.js
            UnicornStudio.init()
        }
    }, [])

    const background = (
        <>
            <div
                // We set height to screen here as its parent uses h-dvh to show the required part and we don't want
                // to rescale the WebGL component.
                className='absolute top-0 left-0 w-full h-screen'
                ref={bgRef}
                data-us-project-src='../gradient_config.json'
            />
        </>
    )

    return (
        <div
            className='_top-panel relative w-screen'
            style={{
                width: 'calc(max(var(--global-min-width), 100vw))',
            }}
        >
            <Layout.RootPaddingY>
                <Layout.SectionCard
                    className='w-full !max-w-screen-3xl'
                    background={background}
                >
                    <CompanyLogo.Component
                        className='h-10 w-auto'
                        style={{
                            '--badge-background': 'rgba(0, 0, 0, 0.8)',
                            '--badge-letter': 'white',
                            '--name-letter': 'white',
                        }}
                    />
                </Layout.SectionCard>
            </Layout.RootPaddingY>
        </div>
    )
}
