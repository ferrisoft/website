import * as React from 'react'
import * as Html from '@/html'

import ChevroletLogo from '@/assets/logo/client/chevrolet.svg?react'
import DreamWorksLogo from '@/assets/logo/client/dream_works.svg?react'
import GeneralMotorsLogo from '@/assets/logo/client/general_motors.svg?react'
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

// ==============
// === Consts ===
// ==============

const GAP = 16
const HEIGHT = 24

// ====================
// === ClientsLogos ===
// ====================

const clientLogos = [
    {component: MtvLogo, scale: 155, shift: 0},
    {component: PixarLogo, scale: 90, shift: 0},
    {component: DreamWorksLogo, scale: 148, shift: 0},
    {component: IntelLogo, scale: 118, shift: -7},
    {component: SamsungLogo, scale: 91, shift: 0},
    {component: SonyLogo, scale: 90, shift: 0},
    {component: GeneralMotorsLogo, scale: 190, shift: 0},
    {component: ToyotaLogo, scale: 117, shift: 0},
    {component: ChevroletLogo, scale: 167, shift: 0},
    {component: NissanLogo, scale: 86, shift: 0},
    {component: VeetLogo, scale: 153, shift: -15},
    {component: SisleyLogo, scale: 165, shift: 6},
    {component: IntimissimiLogo, scale: 102, shift: -4},
    {component: SalomonLogo, scale: 85, shift: 0},
]

export type Props = React.ComponentPropsWithoutRef<'div'>

export function Component(props: Props) {
    const logos = clientLogos.map((logo, ix) => (
        <logo.component
            key={ix}
            className='h-8 w-auto shrink-0 grow-0'
            style={
                {
                    'height': `calc(${HEIGHT}px * var(--scale) / 100)`,
                    'marginTop': 'calc(var(--shift) * 1px)',
                    '--scale': logo.scale,
                    '--shift': logo.shift,
                } as Html.CSSProperties
            }
        />
    ))

    return (
        <div
            className={props.className}
            style={props.style}
        >
            <div className={`carousel flex gap-${GAP} px-${GAP / 2} items-center`}>
                {logos}
                {logos}
            </div>
        </div>
    )
}
