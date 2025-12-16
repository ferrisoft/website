import * as React from 'react'
import * as ReactDom from 'react-dom/client'
import * as ReactRouter from "react-router-dom";
import * as App from '@/App.tsx'
import * as Router from '@/router'
import '@/index.css'

// ============
// === Main ===
// ============

const root = document.createElement("div")
document.body.appendChild(root)

ReactDom.createRoot(root).render(
    <React.StrictMode>
        <ReactRouter.BrowserRouter basename={Router.basename}>
            <App.App/>
        </ReactRouter.BrowserRouter>
    </React.StrictMode>,
)
