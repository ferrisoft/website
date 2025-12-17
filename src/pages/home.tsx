'use client'

import * as React from 'react'

import {PerformanceSection, ReliableSoftwareSection} from '@/section/performance'
import * as Contact from '@/section/contact'
import * as RecentBlogPosts from '@/section/recent_blog_posts.tsx'
import * as Layout from '@/layout'
import * as Footer from '@/section/footer'
import * as ClientsLogos from '@/components/client_logos'
import * as CompanyLogo from '@/components/company_logo'
import * as CtaButton from '@/components/cta_button'

// ==============
// === Header ===
// ==============

function Header() {
    const bgRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (bgRef.current != null) {
            // @ts-expect-error -- provided by unicornstudio.umd.js
            UnicornStudio.init()
        }
    }, [])

    const fontSizeMin = '28px'
    const fontSizeMax = '60px'
    const fontSizeDiff = `(${fontSizeMax} - ${fontSizeMin})`
    const fontSize = `calc(${fontSizeMin} + ${fontSizeDiff} * var(--content-size-norm)`

    const background = (
        <>
            <div
                className='absolute top-0 left-0 w-full h-screen'
                ref={bgRef}
                data-us-project-src='gradient_config.json'
            />
            <div className='absolute text-white left-0 bottom-8'>
                <ClientsLogos.Component />
            </div>
            <div className='absolute inset-0'>
                <Layout.ContentPaddingX>
                    <Layout.ContentPaddingY>
                        <CompanyLogo.Component
                            className='h-10 w-auto'
                            style={{
                                '--badge-background': 'rgba(0, 0, 0, 0.8)',
                                '--badge-letter': 'white',
                                '--name-letter': 'white',
                            }}
                        />
                    </Layout.ContentPaddingY>
                </Layout.ContentPaddingX>
            </div>
        </>
    )

    return (
        <div
            className='_top-panel relative w-screen h-dvh'
            style={{
                width: 'calc(max(var(--global-min-width), 100vw))',
            }}
        >
            <Layout.RootPaddingY>
                <Layout.SectionCard
                    className='w-full h-full !max-w-screen-3xl'
                    background={background}
                >
                    <div className='w-full h-full flex justify-center items-center'>
                        <h1
                            className='font-bold text-white z-30'
                            style={{
                                marginBottom: '6%',
                                fontSize,
                                lineHeight: '1.3em',
                            }}
                        >
                            We deliver reliable, <br /> high-performance <br className='sm:hidden' />
                            software.
                        </h1>
                    </div>
                </Layout.SectionCard>
            </Layout.RootPaddingY>
        </div>
    )
}

// ============
// === Home ===
// ============

export function Home() {
    const contactRef = React.useRef<HTMLDivElement>(null)
    const paddingTop = `calc(64px + 192px * var(--content-size-norm)`
    const spacer = <div style={{paddingTop}} />
    return (
        <div
            className='relative'
            style={{minWidth: 'var(--global-min-width)'}}
        >
            <Header />
            <div>
                {spacer}
                <PerformanceSection />
                {spacer}
                <ReliableSoftwareSection />
                {spacer}
                <RecentBlogPosts.Component />
                {spacer}
                <CtaButton.Component
                    onMouseDown={() => {
                        if (contactRef.current) {
                            contactRef.current.scrollIntoView({behavior: 'smooth'})
                        }
                    }}
                />
                <Contact.Component ref={contactRef} />
                <Footer.Component />
            </div>
        </div>
    )
}
