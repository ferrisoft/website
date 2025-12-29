import * as Layout from '@/layout'
import {SectionTemplate} from '@/section/performance'
import * as Class from '@/class'

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
        <div className='w-full flex gap-2'>
            <div className='grow relative flex flex-col gap-[2px]'>
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

export function Component() {
    const dotRowCount = 39
    const dotColCount = 17
    const gap = 18
    const dotSize = 2
    const width = `${dotSize + (dotRowCount - 1) * (gap + dotSize)}px`
    const height = `${dotSize + (dotColCount - 1) * (gap + dotSize)}px`
    return (
        <SectionTemplate
            title={<>Our services.</>}
            subtitle={
                <>
                    We build and optimize Rust and web systems for real-world load, stability, and long-term
                    maintainability.
                </>
            }
        >
            <div className='mt-10 grid gap-4 sm:mt-16 lg:grid-cols-6 overflow-hidden'>
                <div className='relative col-span-3 rounded-3xl bg-black/3'>
                    <div className='relative flex h-full flex-col overflow-hidden p-8'>
                        <div className='pb-8'>
                            <h4>High-performance web apps.</h4>
                            <p className='mt-4 text-sm/6 text-gray-600 max-lg:text-center'>
                                We build scalable web apps in TypeScript and Rust that stay smooth under real-world
                                load. We use optimized state management and predictable rendering for instant UX.
                                Projects include trading platforms, data-heavy dashboards, customer portals, and
                                internal tools.
                            </p>
                        </div>

                        <div className='grow relative flex flex-wrap justify-center content-center'>
                            <img
                                alt=''
                                src='/website/high_perf_web_apps.png'
                                className='object-cover object-top h-[196px]'
                            />
                        </div>
                    </div>
                </div>
                <div className='relative col-span-3'>
                    <div className='absolute inset-0 rounded-3xl bg-black/3' />
                    <div className='relative flex h-full flex-col overflow-hidden'>
                        <div className='px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0'>
                            <h4>High-throughput backends and APIs.</h4>
                            <p className='mt-4 text-sm/6 text-gray-600 max-lg:text-center'>
                                We build low-latency backends and high-load APIs with clear contracts, type safety, and
                                predictable architecture. We deliver real-time services, event-driven workflows, data
                                pipelines, caching, queues, and scalable runtime environments.
                            </p>
                        </div>
                        <div className='grow relative flex flex-wrap justify-center content-center'>
                            <img
                                alt=''
                                src='/website/high_perf_backends.png'
                                className='object-cover object-top h-[196px]'
                            />
                        </div>
                    </div>
                </div>
                <div className='relative lg:row-span-1 col-span-4 dark-theme'>
                    <div className='absolute inset-0 rounded-3xl bg-black/89' />
                    <div className='relative flex h-full flex-col overflow-hidden'>
                        <div className='px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0'>
                            <h4>Audit and performance fine tuning for existing apps.</h4>
                            <p className='mt-4 text-sm/6 max-lg:text-center'>
                                We optimize apps without the cost of a rewrite. We audit your system to uncover memory
                                issues, slow routes, blocking operations, inefficient queries, and rendering delays,
                                then fine-tune it for faster responses, smoother interactions, higher reliability and
                                lower infrastructure costs. <br />
                                <br />
                                We use Rust for performance-critical code, achieving up to 100× speed gains and 10×
                                lower memory use in client production systems.
                            </p>
                            <div className='grow relative mt-8 text-white/70'>
                                <Benchmarks />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative row-span-1 col-span-2'>
                    <div className='absolute inset-0 rounded-3xl bg-black/3 max-lg:rounded-t-4xl' />
                    <div className='relative flex h-full flex-col overflow-hidden max-lg:rounded-t-[calc(2rem+1px)]'>
                        <div className='px-8 pt-8 sm:px-10 sm:pt-10'>
                            <h4>Websites that convert.</h4>
                            <p className='mt-4 text-sm/6 text-gray-600 max-lg:text-center'>
                                We build premium marketing websites and landing pages designed for conversion and fast
                                iteration. Work includes strong visuals, clear messaging, SEO foundations, analytics
                                instrumentation, and lightweight content workflows.
                            </p>
                        </div>
                        <div className='grow relative flex flex-wrap justify-center mt-8'>
                            <img
                                alt=''
                                src='/website/website_conversion.svg'
                                className='object-cover object-top h-[175px]'
                            />
                        </div>
                    </div>
                </div>
                <div className='relative max-lg:row-start-4 lg:row-start-3 col-span-2'>
                    <div className='absolute inset-0 rounded-3xl bg-black/3' />
                    <div className='relative flex h-full flex-col overflow-hidden'>
                        <div className='px-8 pt-8 sm:px-10 sm:pt-10'>
                            <h4>CI/CD and observability.</h4>
                            <p className='mt-4 text-sm/6 text-gray-600 max-lg:text-center'>
                                We build reliable delivery pipelines and production visibility. CI/CD, health checks,
                                zero-downtime deploys, metrics, traces, rollbacks, and structured logs.
                            </p>
                        </div>
                        <div className='relative grow overflow-hidden'>
                            <div className='absolute w-full h-12 bg-gradient-to-b from-[#F7F7F7] to-transparent' />
                            <div className='h-full flex flex-wrap justify-center content-center'>
                                <img
                                    alt=''
                                    src='/website/ci_cd.svg'
                                    className='w-[346px] h-[346px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative lg:row-span-1 col-span-4 rounded-3xl overflow-hidden dark-theme'>
                    <div className='absolute inset-0 bg-accent2' />
                    <div className='relative flex h-full flex-col overflow-hidden'>
                        <div className='px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0'>
                            <h4>Product design and UX engineering.</h4>
                            <p className='mt-4 text-sm/6 max-lg:text-center'>
                                We design and build interfaces that feel instant and intuitive, from UX flows to
                                polished UI. Work includes design systems, component libraries, accessibility
                                foundations, and interaction patterns that keep complex products consistent and easy to
                                evolve.
                            </p>
                        </div>
                        <div className='relative grow w-full'>
                            <div className='absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-accent2 to-transparent z-10' />
                            <div className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-accent2 z-10' />
                            <div className='absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-accent2 to-transparent z-10' />
                            <div className='absolute top-0 right-0 h-full w-24 bg-gradient-to-r from-transparent to-accent2 z-10' />
                            <div className='absolute inset-0 flex flex-wrap justify-center content-center'>
                                <img
                                    alt=''
                                    src='/website/design.png'
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
            </div>
        </SectionTemplate>
    )
}
