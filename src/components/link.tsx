import * as React from 'react'

// =================
// === Component ===
// =================

export function Component({href, children}: {href: string; children: React.ReactNode}) {
    return (
        <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='underline text-blue-400 cursor-pointer'
        >
            {children}
        </a>
    )
}
