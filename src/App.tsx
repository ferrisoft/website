'use client'

import * as ReactRouter from 'react-router-dom'
import * as Pages from '@/pages'
import * as Blog from '@/pages/blog'

// ===========
// === App ===
// ===========

export function App() {
    return (
        <ReactRouter.Routes>
            <ReactRouter.Route
                path='/'
                element={<Pages.Home />}
            />
            <ReactRouter.Route
                path='/blog/crate_fixed_num'
                element={<Blog.FixedNum.Component />}
            />
            <ReactRouter.Route
                path='/blog/crate_borrow'
                element={<Blog.Borrow.Component />}
            />
            <ReactRouter.Route
                path='/blog/crate_crabtime'
                element={<Blog.Crabtime.Component />}
            />
        </ReactRouter.Routes>
    )
}
