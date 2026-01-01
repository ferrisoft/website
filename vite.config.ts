import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import Path from 'path'
import {viteStaticCopy} from 'vite-plugin-static-copy'

export default defineConfig({
    plugins: [
        tailwindcss(),
        svgr(),
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'dist/index.html',
                    dest: '',
                    rename: '404.html',
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': Path.resolve(__dirname, 'src'),
        },
    },
})
