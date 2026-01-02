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
import * as OurServices from '@/section/our_services'

// ==============
// === Header ===
// ==============

export function Header({contactRef}: {contactRef: React.RefObject<HTMLDivElement | null>}) {
    const bgRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (bgRef.current != null) {
            // @ts-expect-error -- provided by unicornstudio.umd.js
            UnicornStudio.init()
        }
    }, [])

    const fontSizeMin = '34px'
    const fontSizeMax = '60px'
    const fontSizeDiff = `(${fontSizeMax} - ${fontSizeMin})`
    const fontSize = `calc(${fontSizeMin} + ${fontSizeDiff} * var(--content-size-norm)`

    const background = (
        <>
            <div
                // We set height to screen here as its parent uses h-dvh to show the required part and we don't want
                // to rescale the WebGL component.
                className='absolute top-0 left-0 w-full h-screen'
                ref={bgRef}
                data-us-project-src='gradient_config.json'
            />
            <div className='absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-accent2 to-transparent' />
            <div className='absolute text-white left-0 bottom-12'>
                <ClientsLogos.Component />
            </div>
            <div className='absolute inset-0 z-10'>
                <Layout.ContentPaddingX>
                    <Layout.ContentPaddingY>
                        <div className='xs:p-4'>
                            <div className='flex justify-between items-center text-white text-[16px] '>
                                <CompanyLogo.Component
                                    className='h-10 w-auto'
                                    style={{
                                        '--badge-background': 'rgba(0, 0, 0, 0.8)',
                                        '--badge-letter': 'white',
                                        '--name-letter': 'white',
                                    }}
                                />
                                <div className='hidden lg:flex'>
                                    <a
                                        href='/#services'
                                        className='cursor-pointer px-8'
                                    >
                                        Services
                                    </a>
                                    <a
                                        href='/#performance'
                                        className='cursor-pointer px-8'
                                    >
                                        Expertise
                                    </a>
                                    <a
                                        href='/#blog-posts'
                                        className='cursor-pointer px-8'
                                    >
                                        Insights
                                    </a>
                                </div>
                                <a
                                    href='/#contact'
                                    className='px-3 py-2 rounded-md border border-white cursor-pointer'
                                >
                                    <p className='hidden xs:block'>Book a consultation</p>
                                    <p className='xs:hidden'>Contact</p>
                                </a>
                            </div>
                        </div>
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
                    <div className='w-full h-full flex items-center justify-center'>
                        <h1
                            className='font-semibold text-white z-30'
                            style={{
                                marginBottom: '40px',
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
    return (
        <div
            className='relative'
            style={{minWidth: 'var(--global-min-width)'}}
        >
            <Header contactRef={contactRef} />
            <div>
                {/* Making cta button travel up. */}
                <div className='w-full h-[1px]' />
                <OurServices.Component />
                <PerformanceSection />
                <ReliableSoftwareSection />
                <RecentBlogPosts.Component />
                <CtaButton.Component />
                <Contact.Component ref={contactRef} />
                <Footer.Component />
            </div>
        </div>
    )
}
