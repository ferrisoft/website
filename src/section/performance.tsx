import * as Icons from '@heroicons/react/24/solid'
import * as Layout from '@/layout'
import * as React from 'react'
import * as Dom from '@/dom'

import HighPerfViz from '@/assets/high_perf_viz.svg?react'
import HeartBeatIcon from '@/assets/icon/heart_beat.svg?react'
import GitHubActionsLogo from '@/assets/icon/github_actions.svg?react'
import LabIcon from '@/assets/icon/lab.svg?react'
import PasskeyIcon from '@/assets/icon/passkey.svg?react'
import BugIcon from '@/assets/icon/bug.svg?react'
import StopwatchIcon from '@/assets/icon/stopwatch.svg?react'
import CoinIcon from '@/assets/icon/coin.svg?react'
import FingerprintIcon from '@/assets/icon/fingerprint.svg?react'
import LocationIcon from '@/assets/icon/location.svg?react'
import RocketIcon from '@/assets/icon/rocket.svg?react'
import SocialIcon from '@/assets/icon/social.svg?react'
import LockIcon from '@/assets/icon/lock.svg?react'
import KeyIcon from '@/assets/icon/key.svg?react'
import IncognitoIcon from '@/assets/icon/incognito.svg?react'
import CloudCheckIcon from '@/assets/icon/cloud_check.svg?react'
import GhostIcon from '@/assets/icon/ghost.svg?react'
import DatabseIcon from '@/assets/icon/database.svg?react'
import ServerIcon from '@/assets/icon/server.svg?react'
import LogSearchIcon from '@/assets/icon/log_search.svg?react'
import ChecklistIcon from '@/assets/icon/checklist.svg?react'

const icons = [
    HeartBeatIcon,
    GitHubActionsLogo,
    LabIcon,
    PasskeyIcon,
    BugIcon,
    StopwatchIcon,
    CoinIcon,
    FingerprintIcon,
    LocationIcon,
    RocketIcon,
    SocialIcon,
    LockIcon,
    KeyIcon,
    IncognitoIcon,
    CloudCheckIcon,
    GhostIcon,
    DatabseIcon,
    ServerIcon,
    LogSearchIcon,
    ChecklistIcon,
]

interface Feature {
    name: React.JSX.Element
    description: React.JSX.Element
}

const features: Feature[] = [
    {
        name: <>100× faster backend with Rust and Node.js.</>,
        description: (
            <>
                You get fast, scalable systems built for real-world load. For over two decades we’ve built and optimized
                high-load backends, from servers and APIs to real-time data pipelines and serverless functions. We use
                Rust for performance-critical code, achieving up to 100× speed gains and 10× lower memory use in client
                production systems.
            </>
        ),
    },

    {
        name: <>Smooth interface with Rust and TypeScript.</>,
        description: (
            <>
                Your users get interfaces that feel instant and intuitive. We build interfaces that stay fast under
                load, using design systems, predictable rendering, optimized state management and carefully tuned
                interaction patterns. For demanding interfaces we compile Rust to WebAssembly and deliver Canvas and
                custom WebGL/GPU-based solutions.
            </>
        ),
    },

    {
        name: <>Profiling and optimizing existing projects.</>,
        description: (
            <>
                You get measurable improvements without the cost of a rewrite. We profile your system to uncover slow
                routes, blocking operations, inefficient queries, memory issues and rendering delays, then fine-tune
                them for faster responses, smoother interactions, higher reliability and lower infrastructure costs.
            </>
        ),
    },
]

type CircleProps = {
    radius: number
    key: number
    x: number
    y: number
    angle: number
    rotation: number
    icon: null | number
}

function circle(props: CircleProps) {
    const scale = 0.6
    return (
        <div
            key={props.key}
            data-angle={props.angle}
            data-x={props.x}
            data-y={props.y}
            data-scale={props.radius}
            style={
                {
                    'position': 'absolute',
                    'top': `-1px`,
                    'left': `-1px`,
                    'width': `2px`,
                    'height': `2px`,
                    'borderRadius': '100%',
                    'backgroundColor': 'red',
                    'transform': `translate(${props.x}px, ${props.y}px) scale(${props.radius})`,
                    '--icon-opacity': 0,
                    '--icon-index': 0,
                } as Record<string, unknown>
            }
        >
            {props.icon != null && (
                <div className='absolute w-full h-full top-0 left-0 text-white'>
                    <div
                        className='w-full h-full'
                        style={{
                            transform: `rotate(${-props.rotation}rad) scale(${scale})`,
                            opacity: 'var(--icon-opacity)',
                        }}
                    >
                        {icons.map((Icon, ix) => (
                            <Icon
                                key={ix}
                                className='absolute left-0 top-0 w-full h-full'
                                style={{
                                    opacity: `calc(   1 - min(1, abs(var(--icon-index) - ${ix}))    )`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

function elasticEasing(x: number, w: number): number {
    // Clamp input for safety
    const t = Math.min(1, Math.max(0, x))

    const inv = 1 - t
    const sin = Math.sin(w * t)
    const cos = Math.cos(w * t)

    return Math.pow(1 - inv * inv * ((2 * sin) / w + cos), 0.5)
}

function CircleAnimationPart({
    ix,
    rotation,
    isVisible,
}: {
    ix: number
    rotation: number
    isVisible: React.RefObject<boolean>
}) {
    const refLayer1 = React.useRef<HTMLDivElement>(null)
    const refLayer2 = React.useRef<HTMLDivElement>(null)
    const refLayer3 = React.useRef<HTMLDivElement>(null)
    const refLayer4 = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const animations: ((s: number) => void)[] = []
        const animationsOnFrame: ((t: number) => void)[] = []

        function animate(target: Element, end: {x?: number; y?: number; scale?: number; iconOpacity?: number}) {
            if (!(target instanceof HTMLElement)) {
                console.warn('Attaching animation to non html-element.')
                return
            }
            animations.push(t => {
                const start = {
                    x: Number(target.dataset.x),
                    y: Number(target.dataset.y),
                    scale: Number(target.dataset.scale),
                }
                const end2 = {
                    x: end.x ?? start.x,
                    y: end.y ?? start.y,
                    scale: end.scale ?? start.scale,
                    iconOpacity: end.iconOpacity,
                }
                const x = (1 - t) * start.x + t * end2.x
                const y = (1 - t) * start.y + t * end2.y
                const scale = (1 - t) * start.scale + t * end2.scale
                target.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
                if (end2.iconOpacity != null) {
                    const iconOpacity = t * end2.iconOpacity
                    target.style.setProperty('--icon-opacity', `${iconOpacity}`)
                }
            })
        }

        const layer4 = refLayer4.current
        if (refLayer1.current != null && refLayer2.current != null && refLayer3.current != null && layer4 != null) {
            const target = layer4.children[0]
            const count = layer4.children.length
            animate(target, {iconOpacity: 1, scale: 150 / 2})
            const child = target.children[0]
            if (child instanceof HTMLElement) {
                animationsOnFrame.push(t => {
                    const rotation = (2 * Math.PI * t) / (1000 * 15)
                    child.style.transform = `rotate(${-rotation}rad)`
                })
            }

            {
                const angle = (2 * Math.PI) / 24
                const x = Math.cos(angle) * 300
                const y = Math.sin(angle) * 300
                const t4_t = layer4.children[1]
                const t4_b = layer4.children[count - 1]
                animate(t4_t, {x, y, scale: 20 / 2})
                animate(t4_b, {x, y: -y, scale: 20 / 2})
            }

            {
                {
                    const x = 254
                    const y = 90
                    const t3_t = refLayer3.current.children[0]
                    const t3_b = refLayer3.current.children[count - 1]

                    animate(t3_t, {x, y, scale: 20 / 2})
                    animate(t3_b, {x, y: -y, scale: 20 / 2})
                }

                {
                    const x = 220
                    const y = 88
                    const t3_tt = refLayer3.current.children[1]
                    const t3_bb = refLayer3.current.children[count - 2]
                    animate(t3_tt, {x, y, scale: 14 / 2})
                    animate(t3_bb, {x, y: -y, scale: 14 / 2})
                }
            }

            {
                const t2_c = refLayer2.current.children[0]
                const t2_t = refLayer2.current.children[1]
                const t2_b = refLayer2.current.children[count - 1]
                animate(t2_c, {x: 146, y: 0, scale: 14 / 2})
                const x = 190
                const y = 76
                animate(t2_t, {x, y, scale: 14 / 2})
                animate(t2_b, {x, y: -y, scale: 14 / 2})
            }

            {
                const t1_t = refLayer1.current.children[0]
                const t1_b = refLayer1.current.children[count - 1]
                const x = 152
                const y = 34
                animate(t1_t, {x, y, scale: 14 / 2})
                animate(t1_b, {x, y: -y, scale: 14 / 2})
            }
        }

        let rafId: number | null = null
        let lastS = -1

        function onFrame(t: number) {
            if (isVisible.current) {
                const showDuration = 1000
                const holdTime = 1000
                const hideDuration = 1000
                const activeTime = showDuration + holdTime + hideDuration - 1000
                const cycle = 6 * activeTime
                const delay = ix * activeTime

                const tNotChangeVisibleIcons = t - ix * hideDuration
                const iconIndex = (ix + 6 * Math.floor(tNotChangeVisibleIcons / cycle)) % icons.length
                const layer4 = refLayer4.current
                if (layer4) {
                    const target = layer4.children[0]
                    if (target instanceof HTMLElement) {
                        if (Dom.elementCache(target, {iconIndex})) {
                            target.style.setProperty('--icon-index', iconIndex.toString())
                        }
                    }
                }

                const tCycle = (t - delay) % cycle
                let s = 0
                if (tCycle < showDuration) {
                    s = elasticEasing(tCycle / showDuration, 7)
                } else if (tCycle < showDuration + holdTime) {
                    s = 1
                } else if (tCycle < showDuration + holdTime + hideDuration) {
                    s = 1 - elasticEasing((tCycle - showDuration - holdTime) / hideDuration, 5)
                }

                if (lastS != s) {
                    lastS = s
                    for (const animation of animations) {
                        animation(s)
                    }
                }
                for (const animation of animationsOnFrame) {
                    animation(t)
                }

                if (
                    refLayer1.current != null &&
                    refLayer2.current != null &&
                    refLayer3.current != null &&
                    refLayer4.current != null
                ) {
                    for (const refLayer of [refLayer1, refLayer2, refLayer3, refLayer4]) {
                        const layer = refLayer.current
                        if (layer != null) {
                            for (const child of layer.children) {
                                if (child instanceof HTMLElement) {
                                    const angleStr = child.dataset.angle
                                    const angleParsed = angleStr != null ? Number(angleStr) : NaN
                                    const angleInit = Number.isFinite(angleParsed) ? angleParsed : 0
                                    const angle = ((180 * angleInit) / Math.PI + t / 20) % 360
                                    child.style.backgroundColor = `oklch(var(--l) var(--c) ${angle})`
                                }
                            }
                        }
                    }
                }
            }
            rafId = window.requestAnimationFrame(onFrame)
        }
        rafId = window.requestAnimationFrame(onFrame)

        return () => {
            if (rafId !== null) window.cancelAnimationFrame(rafId)
        }
    }, [ix])

    const layerShift = 1 / 48

    const rr = [0, 1, 22, 23]

    const layer1 = rr.map(key => {
        const radius = 172
        const angle = 2 * Math.PI * (key / 24 + layerShift)
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return circle({key, radius: 8, x, y, angle: angle + rotation, rotation, icon: null})
    })

    const layer2 = rr.map(key => {
        const radius = 192
        const angle = (2 * Math.PI * key) / 24
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return circle({key, radius: 10, x, y, angle: angle + rotation, rotation, icon: null})
    })

    const layer3 = rr.map(key => {
        const radius = 212
        const angle = 2 * Math.PI * (key / 24 + layerShift)
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return circle({key, radius: 10, x, y, angle: angle + rotation, rotation, icon: null})
    })

    const layer4 = rr.map(key => {
        const radius = 238
        const angle = (2 * Math.PI * key) / 24
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return circle({key, radius: 14, x, y, angle: angle + rotation, rotation, icon: key == 0 ? 1 : null})
    })

    return (
        <div
            className='relative w-0 h-0'
            style={{
                transform: `rotate(${rotation}rad)`,
            }}
        >
            <div ref={refLayer1}>{layer1}</div>
            <div ref={refLayer2}>{layer2}</div>
            <div ref={refLayer3}>{layer3}</div>
            <div ref={refLayer4}>{layer4}</div>
        </div>
    )
}

function CircleAnimation() {
    const ref = React.useRef<HTMLDivElement>(null)
    const isVisible = React.useRef(false)

    React.useEffect(() => {
        if (!ref.current) return
        let rafId: number | null = null

        function onFrame(t: number) {
            if (isVisible.current && ref.current) {
                const rotation = (2 * Math.PI * t) / (1000 * 15)
                ref.current.style.transform = `rotate(${rotation}rad)`
            }
            rafId = window.requestAnimationFrame(onFrame)
        }
        rafId = window.requestAnimationFrame(onFrame)

        const observer = new IntersectionObserver(e => {
            console.log(e[0].isIntersecting)
            isVisible.current = e[0].isIntersecting
        }, {})

        observer.observe(ref.current)

        return () => {
            if (rafId !== null) window.cancelAnimationFrame(rafId)
            observer.disconnect()
        }
    }, [])

    const centerIconSize = 180
    const padding = 24
    const iconSpread = 80
    const centerIconWithPadding = centerIconSize + 2 * padding
    const totalSize = centerIconWithPadding + 2 * iconSpread
    return (
        <div
            className='relative flex flex-wrap justify-center content-center'
            style={{
                width: `${totalSize}px`,
                height: `${totalSize}px`,
            }}
        >
            <div className='relative'>
                <div
                    className='absolute top-0 left-0'
                    style={{
                        transform: 'scale(0.6)',
                    }}
                >
                    <div
                        className='absolute'
                        style={{
                            top: `-${centerIconWithPadding / 2}px`,
                            left: `-${centerIconWithPadding / 2}px`,
                        }}
                    >
                        <div
                            className='relative bg-zinc-800 z-10'
                            style={{
                                padding: `${padding}px`,
                                borderRadius: '100%',
                            }}
                        >
                            <Icons.ShieldCheckIcon
                                style={{
                                    color: 'white',
                                    width: `${centerIconSize}px`,
                                    height: `${centerIconSize}px`,
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <div ref={ref}>
                            <CircleAnimationPart
                                ix={0}
                                rotation={0}
                                isVisible={isVisible}
                            />
                            <CircleAnimationPart
                                ix={1}
                                rotation={(Math.PI * 1) / 3}
                                isVisible={isVisible}
                            />
                            <CircleAnimationPart
                                ix={2}
                                rotation={(Math.PI * 2) / 3}
                                isVisible={isVisible}
                            />
                            <CircleAnimationPart
                                ix={3}
                                rotation={(Math.PI * 3) / 3}
                                isVisible={isVisible}
                            />
                            <CircleAnimationPart
                                ix={4}
                                rotation={(Math.PI * 4) / 3}
                                isVisible={isVisible}
                            />
                            <CircleAnimationPart
                                ix={5}
                                rotation={(Math.PI * 5) / 3}
                                isVisible={isVisible}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function PerformanceSection() {
    return (
        <FeaturesSection
            title={
                <>
                    High-performance. <br /> Frontend and <br className='xs:hidden' /> backend.
                </>
            }
            subtitle={<>Faster load times, smoother interfaces and lower infrastructure costs.</>}
            features={features}
            header={
                <div>
                    <div className='w-full flex justify-center overflow-hidden pb-12'>
                        <HighPerfViz
                            style={{
                                transform: 'scale(calc(max(1, 600px/max(100vw, var(--global-min-width)))))',
                            }}
                        />
                    </div>
                </div>
            }
        />
    )
}

export function FeaturesSection(props: {
    title: React.JSX.Element
    subtitle: React.JSX.Element
    header: React.JSX.Element
    features: Feature[]
}) {
    return (
        <FeaturesTemplate
            title={props.title}
            subtitle={props.subtitle}
            header={props.header}
        >
            {props.features.map((feature, ix) => (
                <div
                    key={ix}
                    className='flex flex-col'
                >
                    <h4> {feature.name} </h4>
                    <dd className='flex flex-auto font-normal text-sm flex-col text-base/7 opacity-80'>
                        <p className='flex-auto'>{feature.description}</p>
                    </dd>
                </div>
            ))}
        </FeaturesTemplate>
    )
}

export function FeaturesTemplate(props: {
    title: React.JSX.Element
    subtitle: React.JSX.Element
    header: React.JSX.Element
    children: React.ReactNode
}) {
    return (
        <div>
            {props.header}
            <Layout.Section>
                <div className='w-full flex flex-col md:items-center md:text-center md:mx-auto'>
                    <h1> {props.title} </h1>
                    <h3> {props.subtitle} </h3>
                </div>
                <div className='mt-16 flex md:justify-center'>
                    <div className='grid max-w-xl gap-x-8 gap-y-12 lg:max-w-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {props.children}
                    </div>
                </div>
            </Layout.Section>
        </div>
    )
}

export function SectionTemplate(props: {
    title: React.JSX.Element
    subtitle: React.JSX.Element
    children: React.ReactNode
}) {
    return (
        <Layout.Section>
            <div className='w-full flex flex-col md:items-center md:text-center md:mx-auto'>
                <h1> {props.title} </h1>
                <h3> {props.subtitle} </h3>
            </div>
            {props.children}
        </Layout.Section>
    )
}

export function SectionTemplate2(props: {
    title: React.JSX.Element
    subtitle: React.JSX.Element
    children: React.ReactNode
}) {
    return (
        <>
            <div className='w-full flex flex-col md:items-center md:text-center md:mx-auto'>
                <h1> {props.title} </h1>
                <h3> {props.subtitle} </h3>
            </div>
            {props.children}
        </>
    )
}

const features2 = [
    {
        name: <>Predictable architecture and code quality.</>,
        description: (
            <>
                You get software that behaves consistently and avoids hidden failures. We design clear, maintainable
                architectures with strong contracts, type-safe code and defensive patterns that prevent entire classes
                of bugs from ever reaching production.
            </>
        ),
    },
    {
        name: <>Automated testing and deep observability.</>,
        description: (
            <>
                Your product runs with confidence because issues surface before users ever see them. We build
                comprehensive test suites and instrument your system with metrics, traces and structured logs, giving
                you full insight into production behavior.
            </>
        ),
    },
    {
        name: <>Safe deployments and resilient operations.</>,
        description: (
            <>
                Your system remains reliable through updates, traffic spikes and scaling. We use zero-downtime
                deployments, automated rollbacks, health checks and scalable runtime environments to ensure changes are
                predictable and your application remains responsive under all conditions.
            </>
        ),
    },
]

export function ReliableSoftwareSection() {
    return (
        <FeaturesSection
            title={
                <>
                    Reliable software <br /> you can trust in <br className='md:hidden' /> production.
                </>
            }
            subtitle={<>Robust architecture, safe deployments and peace of mind in production.</>}
            features={features2}
            header={
                <div className='w-full relative flex justify-center overflow-hidden -mt-16 xs:mt-0 pb-12'>
                    <div className='scale-85 translate-y-6 xs:scale-100 xs:translate-0 flex justify-center'>
                        <CircleAnimation />
                    </div>
                </div>
            }
        />
    )
}
