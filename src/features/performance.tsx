import { InboxIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/outline'
import * as Icons from '@heroicons/react/24/solid'
import { Section } from "../layout"

import HighPerfViz from '../assets/high_perf_viz.svg?react';
import HeartBeatIcon from '../assets/icon/heart_beat.svg?react';
import GitHubActionsLogo from '../assets/icon/github_actions.svg?react';
import LabIcon from '../assets/icon/lab.svg?react';
import PasskeyIcon from '../assets/icon/passkey.svg?react';
import BugIcon from '../assets/icon/bug.svg?react';
import StopwatchIcon from '../assets/icon/stopwatch.svg?react';
import CoinIcon from '../assets/icon/coin.svg?react';
import FingerprintIcon from '../assets/icon/fingerprint.svg?react';
import LocationIcon from '../assets/icon/location.svg?react';
import RocketIcon from '../assets/icon/rocket.svg?react';
import SocialIcon from '../assets/icon/social.svg?react';
import LockIcon from '../assets/icon/lock.svg?react';
import KeyIcon from '../assets/icon/key.svg?react';
import IncognitoIcon from '../assets/icon/incognito.svg?react';
import CloudCheckIcon from '../assets/icon/cloud_check.svg?react';
import GhostIcon from '../assets/icon/ghost.svg?react';
import DatabseIcon from '../assets/icon/database.svg?react';
import ServerIcon from '../assets/icon/server.svg?react';
import LogSearchIcon from '../assets/icon/log_search.svg?react';
import ChecklistIcon from '../assets/icon/checklist.svg?react';

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
// const icons = [
//     HeartBeatIcon,
// ]

interface Feature {
    name: React.JSX.Element
    description: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const features: Feature[] = [
    {
        name: <>100× faster backend <br className='xs:hidden lg:block xl:hidden'/> with Rust and Node.js.</>,
        description:
            'You get fast, scalable systems built for real-world load. For over two decades we’ve built and optimized high-load backends, from servers and APIs to real-time data pipelines and serverless functions. We use Rust for performance-critical code, achieving up to 100× speed gains and 10× lower memory use in client production systems.',

        icon: InboxIcon,
    },
    {
        name: <>Smooth interface <br className='xs:hidden lg:block xl:hidden'/> with Rust and TypeScript.</>,
        description:
            'Your users get interfaces that feel instant and intuitive. We build interfaces that stay fast under load, using design systems, predictable rendering, optimized state management and carefully tuned interaction patterns. For demanding interfaces we compile Rust to WebAssembly and deliver Canvas and custom WebGL/GPU-based solutions.',

        icon: UsersIcon,
    },
    {
        name: <>Profiling and optimizing <br className='xs:hidden lg:block xl:hidden'/> existing projects.</>,
        description:
            'You get measurable improvements without the cost of a rewrite. We profile your system to uncover slow routes, blocking operations, inefficient queries, memory issues and rendering delays, then fine-tune them for faster responses, smoother interactions, higher reliability and lower infrastructure costs.',
        icon: TrashIcon,
    },
]

import { animate } from "motion"
import * as React from "react";


const DURATION = 1
const REPEAT_DELAY = 1

const CYCLE = 2 * DURATION + REPEAT_DELAY - 1

function CircleAnimationPart ({ix, rotation, delay}: {ix: number, rotation: number, at:number}) {
    const refLayer1 = React.useRef(null)
    const refLayer2 = React.useRef(null)
    const refLayer3 = React.useRef(null)
    const refLayer4 = React.useRef(null)

    React.useEffect(() => {
        let iconIndex = ix
        const animations = []
        function register(animation) {
            animation.cancel()
            animations.push(animation)
        }
        const cfg =  { duration: DURATION, repeat: 1, repeatType: 'reverse', type: 'tween', ease: 'backInOut', repeatDelay: REPEAT_DELAY } //type: spring, stiffness: 100, damping: 10}
        if (refLayer1.current != null && refLayer2.current != null && refLayer3.current != null && refLayer4.current != null) {
            // children
            const target = refLayer4.current.children[0]
            const count = refLayer4.current.children.length
            register(animate(target, {"--icon-opacity": 1, x: 238, scale: 150}, cfg))

            const child = target.children[0]
                    const cfg1 = {duration: 15, repeat: Infinity, ease: 'linear'}
                    animate(child, {rotate: -360}, cfg1)

            {
                const angle = 2 * Math.PI * 1 / 24
                const x = Math.cos(angle) * 300
                const y = Math.sin(angle) * 300
                const t4_t = refLayer4.current.children[1]
                const t4_b = refLayer4.current.children[count-1]
                register(animate(t4_t, {x, y, scale: 20}, cfg))
                register(animate(t4_b, {x, y: -y, scale: 20}, cfg))
            }

            {
                {
                    const x = 254
                    const y = 90
                    const t3_t = refLayer3.current.children[0]
                    const t3_b = refLayer3.current.children[count-1]

                    register(animate(t3_t, {x, y, scale: 20}, cfg))
                    register(animate(t3_b, {x, y: -y, scale: 20}, cfg))
                }

                {
                    const x = 220
                    const y = 88
                    const t3_tt = refLayer3.current.children[1]
                    const t3_bb = refLayer3.current.children[count-2]
                    register(animate(t3_tt, {x, y, scale: 14}, cfg))
                    register(animate(t3_bb, {x, y: -y, scale: 14}, cfg))
                }
            }

            {
                const t2_c = refLayer2.current.children[0]
                const t2_t = refLayer2.current.children[1]
                const t2_b = refLayer2.current.children[count-1]
                register(animate(t2_c, {x: 146, scale: 14}, cfg))
                const x = 190
                const y = 76
                register(animate(t2_t, {x, y, scale: 14}, cfg))
                register(animate(t2_b, {x, y: -y, scale: 14}, cfg))
            }

            {
                const t1_t = refLayer1.current.children[0]
                const t1_b = refLayer1.current.children[count-1]
                const x = 152
                const y = 34
                register(animate(t1_t, {x, y, scale: 14}, cfg))
                register(animate(t1_b, {x, y: -y, scale: 14}, cfg))
            }
        }

        window.setTimeout(() => {
            for (const a of animations) {
                const target = refLayer4.current.children[0]
                target.style.setProperty('--icon-index', iconIndex)
                a.play()
            }
            window.setInterval(() => {
                    iconIndex = (iconIndex + 6) % icons.length
                    const target = refLayer4.current.children[0]
                target.style.setProperty('--icon-index', iconIndex)
                    for (const a of animations) {
                        a.play()
                    }
            }, 6 * CYCLE * 1000)
        }, delay * 1000)

        function hueWithoutGreen(t) {
            return t

            const skipStart = 70;
            const skipEnd = 220;
            const skipSize = skipEnd - skipStart;
            const scale = 360 / (360 - skipSize);

            let h = t;// * scale;

            if (h >= skipStart && h <= skipEnd) {
                h += skipSize;
                h = h % 360;
            }

            if (h >= skipStart && h <= skipEnd) {
                h += skipSize;
                h = h % 360;
            }

            if (h >= skipStart && h <= skipEnd) {
                h += skipSize;
                h = h % 360;
            }

            if (h >= skipStart && h <= skipEnd) {
                h += skipSize;
                h = h % 360;
            }

            if (h >= skipStart && h <= skipEnd) {
                h += skipSize;
                h = h % 360;
            }

            // console.log("h", h)

            return h % 360;
        }

        function onFrame(t) {
            if (refLayer1.current != null && refLayer2.current != null && refLayer3.current != null && refLayer4.current != null) {
                for (const layer of [refLayer1, refLayer2, refLayer3, refLayer4]) {
                    for (const child of layer.current.children) {
                        const angle = (180 * child.dataset.angle / Math.PI + t / 20) % 360
                        child.style.backgroundColor = `oklch(var(--l) var(--c) ${angle})`
                    }
                }
            }//oklch(0.7 0.1 177)
            window.requestAnimationFrame(onFrame)
        }
        window.requestAnimationFrame(onFrame)
    }, [])

    function circle({radius, key, x, y, angle, icon}: {radius: number, key:number, x:number, y:number, angle:number, icon:null | number}) {
        const scale = 0.6
        const radius2 = radius * 2
        return <div key={key} data-angle={angle} style={{
            position: 'absolute',
            top: `-0.5px`,
            left: `-0.5px`,
            width: `1px`,
            height: `1px`,
            borderRadius: '100%',
            backgroundColor: 'red',
            transform: `translate(${x}px, ${y}px) scale(${radius2})`,
            "--icon-opacity": 0,
            "--icon-index": 0
        }}>
            { (icon != null) &&
                <div className='absolute w-full h-full top-0 left-0 text-white'>
                    <div className='w-full h-full' style={{transform: `rotate(${-rotation}rad) scale(${scale})`, opacity: 'var(--icon-opacity)'}}>
                        {
                            icons.map((Icon, ix) =>
                                <Icon key={ix} className='absolute left-0 top-0 w-full h-full' style={{
                                    opacity: `calc(   1 - min(1, abs(var(--icon-index) - ${ix}))    )`
                                }}/>
                            )
                        }
                    </div>
                </div>
            }

        </div>
    }

    const layerShift = 1/48

    const rr = [0, 1,22,23]

    const layer1 = rr.map(key => {
        const radius = 172
        const angle = 2 * Math.PI * (key/24 + layerShift)
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return circle({key, radius: 8, x, y, angle: angle+rotation, icon: null})
    })

    const layer2 = rr.map(key => {
        const radius = 192
        const angle = 2 * Math.PI * key/24
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return circle({key, radius: 10, x, y, angle: angle+rotation, icon: null})
    })

    const layer3 = rr.map(key => {
        const radius = 212
        const angle = 2 * Math.PI * (key/24 + layerShift)
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return circle({key, radius: 10, x, y, angle: angle+rotation, icon: null})
    })

    const layer4 = rr.map(key => {
        const radius = 238
        const angle = 2 * Math.PI * key/24
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return circle({key, radius: 14, x, y, angle: angle+rotation, icon: key == 0 ? 1 : null})
    })

    return (
        <div className='relative w-0 h-0' style={{
            transform: `rotate(${rotation}rad)`
        }}>
            <div ref={refLayer1}>{layer1}</div>
            <div ref={refLayer2}>{layer2}</div>
            <div ref={refLayer3}>{layer3}</div>
            <div ref={refLayer4}>{layer4}</div>
        </div>
    )
}

function CircleAnimation () {
    const ref = React.useRef(null)

    // React.useEffect(() => {
    //     if (ref.current != null) {
    //         const cfg = {duration: 15, repeat: Infinity, ease: 'linear'}
    //         animate(ref.current, {rotate: 360}, cfg)
    //     }
    // }, [])

    const centerIconSize = 180
    const padding = 24
    const iconSpread = 80
    const centerIconWithPadding = centerIconSize + 2 * padding
    const totalSize = centerIconWithPadding + 2 * iconSpread
    return (
        <div className='relative flex flex-wrap justify-center content-center' style={{
            width: `${totalSize}px`,
            height: `${totalSize}px`,
        }}>
            <div className='relative'>
        <div className='absolute top-0 left-0' style={{
            transform: 'scale(0.6)',
        }}>
            <div className='absolute' style={{
                top: `-${centerIconWithPadding / 2}px`,
                left: `-${centerIconWithPadding / 2}px`
            }}>
                {/*<div className="absolute inline-flex h-full w-full animate-[ping_3s_linear_infinite] rounded-full bg-zinc-800 opacity-5"></div>*/}

                <div className='relative bg-zinc-800 z-10' style={{
                    padding: `${padding}px`,
                    borderRadius: '100%',
                    // width:'0',
                    // height:'0',
                    // padding: '16px',
                }}>
                    <Icons.ShieldCheckIcon style={{
                        color: 'white',
                        width: `${centerIconSize}px`,
                        height: `${centerIconSize}px`
                    }}/>
                </div>
            </div>

            <div
                className='animate-[spin_15s_linear_infinite]'
            >
                <div ref={ref}>
                    <CircleAnimationPart ix={0} delay={0 * CYCLE} rotation={0}/>
                    <CircleAnimationPart ix={1} delay={1 * CYCLE} rotation={Math.PI * 1 / 3}/>
                    <CircleAnimationPart ix={2} delay={2 * CYCLE} rotation={Math.PI * 2 / 3}/>
                    <CircleAnimationPart ix={3} delay={3 * CYCLE} rotation={Math.PI * 3 / 3}/>
                    <CircleAnimationPart ix={4} delay={4 * CYCLE} rotation={Math.PI * 4 / 3}/>
                    <CircleAnimationPart ix={5} delay={5 * CYCLE} rotation={Math.PI * 5 / 3}/>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}


export function PerformanceSection() {
    return <FeaturesSection
        title={<>High-performance <br/> frontend and <br className='xs:hidden'/> backend.</>}
        subtitle={<>Faster load times, smoother interfaces and lower infrastructure costs.</>}
        features={features}
        header={
            <div>
                <div className="w-full flex justify-center overflow-hidden">
                    <HighPerfViz style={{
                        transform: 'scale(calc(max(1, 600px/max(100vw, var(--global-min-width)))))'
                    }}/>
                </div>
            </div>
        }
    />
}

export function FeaturesSection(props: {title: React.JSX.Element, subtitle: React.JSX.Element, header: React.JSX.Element, features: Feature[]}) {
    return <FeaturesTemplate title={props.title} subtitle={props.subtitle} header={props.header}>
        {props.features.map((feature, ix) => (
            <div key={ix} className="flex flex-col">
                <h4> {feature.name} </h4>
                <dd className="mt-1 flex flex-auto font-normal text-sm flex-col text-base/7 opacity-80">
                    <p className="flex-auto">{feature.description}</p>
                </dd>
            </div>
        ))}
    </FeaturesTemplate>

}


export function FeaturesTemplate(props: {title: React.JSX.Element, subtitle: React.JSX.Element, header: React.JSX.Element, children: React.ReactNode}) {
    return (
        <div>
            {props.header}
            <Section direction='x' className='pt-12 !max-w-md md:!max-w-none'>
                <div className="w-full flex flex-col md:items-center md:text-center md:mx-auto">
                    <h1> {props.title} </h1>
                    <h3> {props.subtitle} </h3>
                </div>
                <div className="mt-16 flex md:justify-center">
                    <div className="grid max-w-xl gap-x-8 gap-y-12 lg:max-w-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {props.children}
                    </div>
                </div>
            </Section>
        </div>
    )
}




const features2 = [
    {
        name: 'Predictable architecture and code quality.',
        description: 'You get software that behaves consistently and avoids hidden failures. We design clear, maintainable architectures with strong contracts, type-safe code and defensive patterns that prevent entire classes of bugs from ever reaching production.',
        icon: InboxIcon,
    },
    {
        name: 'Automated testing and deep observability.',
        description: 'Your product runs with confidence because issues surface before users ever see them. We build comprehensive test suites and instrument your system with metrics, traces and structured logs, giving you full insight into production behavior.',
        icon: UsersIcon,
    },
    {
        name: 'Safe deployments and resilient operations.',
        description: 'Your system remains reliable through updates, traffic spikes and scaling. We use zero-downtime deployments, automated rollbacks, health checks and scalable runtime environments to ensure changes are predictable and your application remains responsive under all conditions.',
        icon: TrashIcon,
    },
]

export function ReliableSoftwareSection() {
    return <FeaturesSection
        title={<>Reliable software <br/> you can trust in <br className='md:hidden'/> production.</>}
        subtitle={<>Robust architecture, safe deployments and peace of mind in production.</>}
        features={features2}
        header={
            <div className='w-full relative flex justify-center overflow-hidden'>
                <div className='scale-75 translate-y-12 xs:scale-100 xs:translate-0 flex justify-center'>
                    <CircleAnimation/>
                </div>
            </div>
        }/>
}
