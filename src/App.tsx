'use client'

import * as ReactRouter from 'react-router-dom'
import * as Pages from '@/pages'

// ===========
// === App ===
// ===========

export function App() {
    return (
        <ReactRouter.Routes>
            <ReactRouter.Route path="/" element={<Pages.Home/>} />
            <ReactRouter.Route path="/blog/crate-borrow" element={<Pages.Blog/>} />
        </ReactRouter.Routes>
    )
}
