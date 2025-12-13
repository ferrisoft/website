'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import * as React from "react"

import FerrisoftLogo from './assets/logo/ferrisoft.svg?react'


import ChevroletLogo from './assets/logo/client/chevrolet.svg?react'
import DreamWorksLogo from './assets/logo/client/dream_works.svg?react'
import GeneralMotors from './assets/logo/client/general_motors.svg?react'
import IntelLogo from './assets/logo/client/intel.svg?react'
import IntimissimiLogo from './assets/logo/client/intimissimi.svg?react'
import MtvLogo from './assets/logo/client/mtv.svg?react'
import NissanLogo from './assets/logo/client/nissan.svg?react'
import PixarLogo from './assets/logo/client/pixar.svg?react'
import SalomonLogo from './assets/logo/client/salomon.svg?react'
import SamsungLogo from './assets/logo/client/samsung.svg?react'
import SisleyLogo from './assets/logo/client/sisley.svg?react'
import SonyLogo from './assets/logo/client/sony.svg?react'
import ToyotaLogo from './assets/logo/client/toyota.svg?react'
import VeetLogo from './assets/logo/client/veet.svg?react'



async function svgElToCanvas(svgEl: SVGSVGElement): Promise<HTMLCanvasElement> {
    // Serialize SVG element to XML string
    const svgString = new XMLSerializer().serializeToString(svgEl)

    // Encode as data URL
    const encoded = "data:image/svg+xmlbase64," + btoa(svgString)

    // Load into an Image()
    const img = await new Promise<HTMLImageElement>((resolve) => {
        const image = new Image()
        image.src = encoded
        image.onload = () => resolve(image)
    })

    // Draw on canvas
    const canvas = document.createElement("canvas")
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext("2d")!
    ctx.drawImage(img, 0, 0)

    return canvas
}

function analyzeBlackPixels(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d")!
    const { width, height } = canvas
    const imgData = ctx.getImageData(0, 0, width, height).data

    let black = 0
    let transparent = 0
    let total = width * height

    for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i]
        const g = imgData[i + 1]
        const b = imgData[i + 2]
        const a = imgData[i + 3]

        if (a === 0) {
            transparent++
            continue
        }

        // treat "almost black" as black (due to antialiasing)
        if (r < 30 && g < 30 && b < 30) {
            black++
        }
    }

    return {
        blackPixels: black,
        transparentPixels: transparent,
        totalPixels: total,
        blackPercentage: (black / total) * 100,
        alphaCoverage: ((total - transparent) / total) * 100
    }
}

async function analyzeSvgElement(svgEl: SVGSVGElement) {
    const canvas = await svgElToCanvas(svgEl)
    return analyzeBlackPixels(canvas)
}

function ClientsLogos() {
    const rowRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (!rowRef.current) return

        const bbox = rowRef.current.getBoundingClientRect()
        let start_time: null | number = null
        let offset = 0

        function onFrame(time: number) {
            if (!rowRef.current) return
            if (start_time != null) {
                offset += (time - start_time) / 10
                if (offset > bbox.width / 2) {
                    offset -= bbox.width / 2
                }
                rowRef.current.style.transform = `translate(${-offset}px, 0)`
            }
            start_time = time
            window.requestAnimationFrame(onFrame)
        }
        window.requestAnimationFrame(onFrame)
    }, [])

    const logos = [
        <MtvLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "155", "--shift": "0px" }} />,
        <PixarLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "90", "--shift": "0px" }} />,
        <DreamWorksLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "148", "--shift": "0px" }} />,
        <IntelLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "118", "--shift": "-7px" }} />,
        <SamsungLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "91", "--shift": "0px" }} />,
        <SonyLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "90", "--shift": "0px" }} />,
        <GeneralMotors className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "190", "--shift": "0px" }} />,
        <ToyotaLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "117", "--shift": "0px" }} />,
        <ChevroletLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "167", "--shift": "0px" }} />,
        <NissanLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "86", "--shift": "0px" }} />,
        <VeetLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "153", "--shift": "-15px" }} />,
        <SisleyLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "165", "--shift": "6px" }} />,
        <IntimissimiLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "102", "--shift": "-4px" }} />,
        <SalomonLogo className="h-8 w-auto shrink-0 grow-0" style={{ height: "calc(24px * var(--scale) / 100)", marginTop:"var(--shift)", "--scale": "85", "--shift": "0px" }} />,
    ]

    return (
        <div ref={rowRef} className="flex gap-16 p-8 items-center">
            {logos}
            {logos}
        </div>
    )
}



function HiddenFerris() {
    const ref = React.useRef<HTMLDivElement>(null)

    let offset = 0

    function onFrame() {
        if (ref.current != null) {
            let changed = false
            if (offset >= 0) {
                offset -= 1
                changed = true
            } else if (offset < 0) {
                offset = 0
                changed = true
            }
            if (changed) {
                const clipped_offset = Math.min(offset, 32)
                ref.current.style.transform = `translate(0, ${clipped_offset}px)`
            }
        }
        window.requestAnimationFrame(onFrame)
    }

    React.useEffect(() => {
        window.requestAnimationFrame(onFrame)
        window.addEventListener("wheel", (v) => {
            if (window.scrollY == 0 && v.deltaY < 0) {
                offset -= v.deltaY / 10
            }
        })
    }, [])

    return <div ref={ref} className="absolute w-full flex justify-center" style={{
            top: "-32px",
        }}>
            <img src="animated_ferris.gif" style={{height: "32px"}}/>
        </div>
}



import * as P from "./features/performance"
import { PerformanceSection, ReliableSoftwareSection } from "./features/performance"
import { Contact } from "./features/contact"
import { RecentBlogPosts } from "./features/blog"


import { Section, SectionBox, Container } from "./layout"
import { Footer } from "./features/footer"

import { Blog } from './pages/blog'
import { ContactUsButton } from "./components/contact_us_button"

export function Home() {

    const bgRef = React.useRef<HTMLDivElement>(null)
    const contactRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (bgRef.current != null) {
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
                                    }}/>
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
