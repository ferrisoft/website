'use client'

import * as React from "react"
import * as Html from '@/html'
import { PerformanceSection, ReliableSoftwareSection } from "./features/performance"
import { Contact } from "./features/contact"
import { RecentBlogPosts } from "./features/blog"


import { Section, SectionBox } from "./layout"
import { Footer } from "./features/footer"

import { Blog } from './pages/blog'

import FerrisoftLogo from '@/assets/logo/ferrisoft.svg?react'
import ChevroletLogo from '@/assets/logo/client/chevrolet.svg?react'
import DreamWorksLogo from '@/assets/logo/client/dream_works.svg?react'
import GeneralMotors from '@/assets/logo/client/general_motors.svg?react'
import IntelLogo from '@/assets/logo/client/intel.svg?react'
import IntimissimiLogo from '@/assets/logo/client/intimissimi.svg?react'
import MtvLogo from '@/assets/logo/client/mtv.svg?react'
import NissanLogo from '@/assets/logo/client/nissan.svg?react'
import PixarLogo from '@/assets/logo/client/pixar.svg?react'
import SalomonLogo from '@/assets/logo/client/salomon.svg?react'
import SamsungLogo from '@/assets/logo/client/samsung.svg?react'
import SisleyLogo from '@/assets/logo/client/sisley.svg?react'
import SonyLogo from '@/assets/logo/client/sony.svg?react'
import ToyotaLogo from '@/assets/logo/client/toyota.svg?react'
import VeetLogo from '@/assets/logo/client/veet.svg?react'



function ClientsLogos() {
    const rowRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const rowRefCurrent = rowRef.current
        if (rowRefCurrent == null) return


        let width = 0
        const resizeObserver = new ResizeObserver((entries) => {
            width = rowRefCurrent.getBoundingClientRect().width
            console.log("Size changed", {entries});
        });

        resizeObserver.observe(rowRefCurrent);

        let start_time: null | number = null
        let offset = 0

        function onFrame(time: number) {
            if (!rowRef.current) return
            if (start_time != null) {
                offset += (time - start_time) / 10
                if (offset > width / 2) {
                    offset -= width / 2
                }
                rowRef.current.style.transform = `translate(${-offset}px, 0)`
            }
            start_time = time
            window.requestAnimationFrame(onFrame)
        }
        window.requestAnimationFrame(onFrame)
    }, [])

    const logos = [
        <MtvLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "155", "--shift": "0px" } as Html.CSSProperties } />,
        <PixarLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "90", "--shift": "0px" }  as Html.CSSProperties } />,
        <DreamWorksLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "148", "--shift": "0px" }  as Html.CSSProperties } />,
        <IntelLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "118", "--shift": "-7px" }  as Html.CSSProperties } />,
        <SamsungLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "91", "--shift": "0px" }  as Html.CSSProperties } />,
        <SonyLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "90", "--shift": "0px" }  as Html.CSSProperties } />,
        <GeneralMotors className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "190", "--shift": "0px" }  as Html.CSSProperties } />,
        <ToyotaLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "117", "--shift": "0px" }  as Html.CSSProperties } />,
        <ChevroletLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "167", "--shift": "0px" }  as Html.CSSProperties } />,
        <NissanLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "86", "--shift": "0px" }  as Html.CSSProperties } />,
        <VeetLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "153", "--shift": "-15px" }  as Html.CSSProperties } />,
        <SisleyLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "165", "--shift": "6px" }  as Html.CSSProperties } />,
        <IntimissimiLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "102", "--shift": "-4px" }  as Html.CSSProperties } />,
        <SalomonLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "85", "--shift": "0px" }  as Html.CSSProperties } />,
    ]

    return (
        <div ref={rowRef} className="flex gap-16 p-8 items-center">
            {logos}
            {logos}
        </div>
    )
}







export function Home() {

    const bgRef = React.useRef<HTMLDivElement>(null)
    const contactRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (bgRef.current != null) {
            // @ts-expect-error -- provided by unicornstudio.umd.js
            UnicornStudio.init()
        }
    }, [])


    const fontSizeMin = '28px'
    const fontSizeMax = '60px'
    const fontSize = `calc(${fontSizeMin} + (${fontSizeMax} - ${fontSizeMin}) * var(--content-size-norm)`

    return (
        <div className="relative" style={{
            minWidth: "var(--global-min-width)"
        }}>
            {/*<HiddenFerris/>*/}
            {/*<ContactUsButton/>*/}


            <div className="_top-panel relative w-screen h-screen" style={{
                width: 'calc(max(var(--global-min-width), 100vw))'
            }}>

                <Section
                    className="w-full h-full overflow-hidden !max-w-screen-3xl"
                    background={
                        <>
                            <div ref={bgRef} data-us-project-src="gradient_config.json" className='absolute top-0 left0 w-full h-full'/>
                            <div className="absolute top-0 left-0 w-full h-full flex items-end text-white">
                                <ClientsLogos/>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full flex">
                                <SectionBox>
                                    <FerrisoftLogo className="h-10 w-auto" style={{
                                        "--badge-background": "rgba(0, 0, 0, 0.8)",
                                        "--badge-letter": "white",
                                        "--name-letter": "white",
                                    } as Html.CSSProperties } />
                                </SectionBox>
                            </div>
                        </>
                    }
                >
                    <div className="w-full h-full flex justify-center items-center">
                        <h1 className="font-bold text-white z-30"
                            style={{
                                marginBottom: "6%",
                                fontSize,
                                lineHeight: '1.3em',
                            }}
                        >
                            We deliver reliable, <br/> high-performance <br className='sm:hidden'/> software.
                        </h1>
                    </div>
                </Section>




            </div>

            <div>

                <div className='pt-64'/>

                <PerformanceSection/>

                <div className='pt-64'/>

                <ReliableSoftwareSection/>

                <div className='pt-64'/>


                <RecentBlogPosts/>

                <div className="pt-64"/>

                <div className='w-full flex justify-center sticky bottom-8'>
                        <div className="select-none cursor-pointer h-10 px-4 rounded-full text-white text-sm flex items-center justify-center outline-4 border-white" style={{
                            background: "rgba(0, 0, 0, 0.8)",
                            backdropFilter: "blur(16px)",
                        }}
                             onMouseDown = {() => {
                                 const ref = contactRef.current;
                                 if (ref != null) {
                                     ref.scrollIntoView({ behavior: "smooth" })
                                 }
                             }}
                        >
                            Contact Us
                        </div>
                </div>

                <Contact ref={contactRef}/>

                <Footer/>

            </div>
        </div>
    )
}
// data-us-project="GKH7RQ3GQWDxO9MdRIPv"

import { Routes, Route } from "react-router-dom"


export default function App() {
    return (
        <>
            {/*<nav>*/}
            {/*    <Link to="/">Home</Link>*/}
            {/*    <Link to="/blog">Blog</Link>*/}
            {/*</nav>*/}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog/crate-borrow" element={<Blog />} />
            </Routes>
        </>
    )
}
