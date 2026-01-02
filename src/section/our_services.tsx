import * as Layout from '@/layout'
import {SectionTemplate2} from '@/section/performance'
import * as Class from '@/class'
import * as React from 'react'
import {ContentPaddingY} from '@/layout'

function Benchmarks() {
    return (
        <div className='flex flex-col gap-4 text-[13px]'>
            <Benchmark
                label1='8 ms / frame'
                speedup={9.6}
                label2='faster'
                color='var(--color-accent2)'
            />
            <Benchmark
                label1='27 MB RAM'
                speedup={7.4}
                label2='less memory'
                color='var(--color-accent)'
            />
            <div className='mt-4 opacity-70'>Results of trading platform optimization in Rust.</div>
        </div>
    )
}

function Benchmark({speedup, label1, label2, color}: {speedup: number; label1: string; label2: string; color: string}) {
    const width = Math.round(100 / speedup)
    const backgroundColor = color
    return (
        <div className='w-full flex gap-4'>
            <div className='grow relative flex flex-col gap-[3px]'>
                <div
                    className='font-bold'
                    style={{color}}
                >
                    {label1}
                </div>
                <div
                    className='h-[8px] rounded-full'
                    style={{backgroundColor, width: `${width}%`}}
                />
                <div
                    className='w-full h-[8px] rounded-full opacity-30'
                    style={{backgroundColor}}
                />
            </div>
            <div className='mt-4'>
                <div
                    className='px-2 py-1 rounded-full text-black/90 font-bold'
                    style={{backgroundColor}}
                >
                    {speedup}x {label2}
                </div>
            </div>
        </div>
    )
}

// export function Section(props: DivProps) {
//     return (
//         <Container {...props}>
//             <RootPaddingX>
//                 <ContentPaddingX>{props.children}</ContentPaddingX>
//             </RootPaddingX>
//         </Container>
//     )
// }

function Card({
    title,
    description,
    children,
    contentPaddingYProps,
}: {
    title: React.ReactNode
    description: React.ReactNode
    children?: React.ReactNode
    contentPaddingYProps?: Layout.DivProps
}) {
    return (
        <Layout.ContentPaddingY {...contentPaddingYProps}>
            <Layout.ContentPaddingX>
                <div className='relative flex h-full flex-col overflow-hidden'>
                    <div>
                        <h4>{title}</h4>
                        <p>{description}</p>
                    </div>
                    {children}
                </div>
            </Layout.ContentPaddingX>
        </Layout.ContentPaddingY>
    )
}

export function Component() {
    const dotRowCount = 39
    const dotColCount = 17
    const gap = 18
    const dotSize = 2
    const width = `${dotSize + (dotRowCount - 1) * (gap + dotSize)}px`
    const height = `${dotSize + (dotColCount - 1) * (gap + dotSize)}px`
    return (
        <SectionTemplate2
            title={<>Our services.</>}
            subtitle={
                <>
                    We build and optimize Rust and web systems for real-world load, stability, and long-term
                    maintainability.
                </>
            }
        >
            <Layout.Container>
                <Layout.RootPaddingX>
                    <div className='mt-10 grid gap-4 sm:mt-16 lg:grid-cols-6 overflow-hidden text-black/65'>
                        <div className='relative col-span-3 rounded-3xl bg-black/3'>
                            <Card
                                title={<>High-performance web apps.</>}
                                // description={
                                //     <>
                                //         We build scalable web apps in TypeScript and Rust that stay smooth under
                                //         real-world load. We use optimized state management and predictable rendering for
                                //         instant UX. Projects include trading platforms, data-heavy dashboards, customer
                                //         portals, and internal tools.
                                //     </>
                                // }
                                description={
                                    <>
                                        We build scalable apps that stay fast under load, using design systems,
                                        predictable rendering, optimized state management and carefully tuned
                                        interaction patterns. For demanding interfaces we deliver Rust (WASM) based
                                        WebGPU solutions. Projects include trading platforms, data-heavy dashboards,
                                        customer portals, and internal tools.
                                    </>
                                }
                            >
                                <div className='pt-12 grow relative flex flex-wrap justify-center content-center'>
                                    <img
                                        alt=''
                                        src='/img/high_perf_web_apps.svg'
                                        className='object-cover object-top h-[196px]'
                                    />
                                </div>
                            </Card>
                        </div>
                        <div className='relative col-span-3 rounded-3xl bg-black/3'>
                            <Card
                                title={<>High-throughput backends and APIs.</>}
                                description={
                                    <>
                                        We build low-latency backends and high-load APIs with clear contracts, type
                                        safety, and predictable architecture. We deliver real-time services,
                                        event-driven workflows, data pipelines, caching, queues, and scalable runtime
                                        environments.
                                    </>
                                }
                            >
                                <div className='pt-12 grow relative flex flex-wrap justify-center content-center'>
                                    <img
                                        alt=''
                                        src='/img/high_perf_backends.svg'
                                        className='object-cover object-top h-[196px]'
                                    />
                                </div>
                            </Card>
                        </div>
                        <div className='relative lg:row-span-1 col-span-4 dark-theme rounded-3xl bg-black/89'>
                            <Card
                                title={<>Audit and performance fine tuning for existing apps.</>}
                                description={
                                    <>
                                        We optimize apps without the cost of a rewrite. We audit your system to uncover
                                        memory issues, slow routes, blocking operations, inefficient queries, and
                                        rendering delays, then fine-tune it for faster responses, smoother interactions,
                                        higher reliability and lower infrastructure costs. <br />
                                        <br />
                                        We use Rust for performance-critical code, achieving up to 100× speed gains and
                                        10× lower memory use in client production systems.
                                    </>
                                }
                            >
                                <div className='pt-12 grow relative text-white/70'>
                                    <Benchmarks />
                                </div>
                            </Card>
                        </div>
                        <div className='relative row-span-1 col-span-2 rounded-3xl bg-black/3'>
                            <Card
                                title={<>Websites that convert.</>}
                                description={
                                    <>
                                        We build premium marketing websites and landing pages designed for conversion
                                        and fast iteration. Work includes strong visuals, clear messaging, SEO
                                        foundations, analytics instrumentation, and lightweight content workflows.
                                    </>
                                }
                            >
                                <div className='pt-12 grow relative flex flex-wrap justify-center'>
                                    <img
                                        alt=''
                                        src='/website_conversion.svg'
                                        className='object-cover object-top h-[175px]'
                                    />
                                </div>
                            </Card>
                        </div>
                        <div className='relative max-lg:row-start-4 lg:row-start-3 col-span-2 rounded-3xl bg-black/3 flex flex-col'>
                            <div className='relative'>
                                <Card
                                    contentPaddingYProps={{className: '!pb-0'}}
                                    title={<>CI/CD and observability.</>}
                                    description={
                                        <>
                                            We build reliable delivery pipelines and production visibility. CI/CD,
                                            health checks, zero-downtime deploys, metrics, traces, rollbacks, and
                                            structured logs.
                                        </>
                                    }
                                ></Card>
                            </div>
                            <div className='relative grow overflow-hidden flex flex-col'>
                                <div className='absolute w-full h-24 bg-gradient-to-b from-[#F7F7F7] to-transparent' />
                                <div className='h-0 mt-8 grow flex flex-wrap justify-center content-center'>
                                    <img
                                        alt=''
                                        src='/ci_cd.svg'
                                        className='w-[346px] h-[346px]'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='relative lg:row-span-1 col-span-4 rounded-3xl bg-accent2 overflow-hidden dark-theme'>
                            <div className='relative'>
                                <Card
                                    contentPaddingYProps={{className: '!pb-0'}}
                                    title={<>Product design and UX engineering.</>}
                                    description={
                                        <>
                                            We design and build interfaces that feel instant and intuitive, from UX
                                            flows to polished UI. Work includes design systems, component libraries,
                                            accessibility foundations, and interaction patterns that keep complex
                                            products consistent and easy to evolve.
                                        </>
                                    }
                                ></Card>
                            </div>
                            <div className='relative grow w-full'>
                                <div className='absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-accent2 to-transparent z-10' />
                                <div className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-accent2 z-10' />
                                <div className='absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-accent2 to-transparent z-10' />
                                <div className='absolute top-0 right-0 h-full w-24 bg-gradient-to-r from-transparent to-accent2 z-10' />
                                <div className='absolute inset-0 flex flex-wrap justify-center content-center'>
                                    <img
                                        alt=''
                                        src='/img/blueprint_design.svg'
                                        className='w-[162px] h-[162px] z-20'
                                    />
                                </div>
                                <div className='w-full h-full overflow-hidden flex flex-wrap justify-center content-center'>
                                    <svg
                                        className='relative text-white/30 shrink-0'
                                        style={{width, height}}
                                    >
                                        <defs>
                                            <pattern
                                                id='dots'
                                                width={gap + dotSize}
                                                height={gap + dotSize}
                                                patternUnits='userSpaceOnUse'
                                            >
                                                <rect
                                                    width={dotSize}
                                                    height={dotSize}
                                                    fill='currentColor'
                                                />
                                            </pattern>
                                        </defs>
                                        <rect
                                            width='100%'
                                            height='100%'
                                            fill='url(#dots)'
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout.RootPaddingX>
            </Layout.Container>
        </SectionTemplate2>
    )
}
