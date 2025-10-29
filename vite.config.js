import {defineConfig} from 'vite';
import path from 'path';


export default defineConfig({
    root: 'src',
    publicDir: '../public',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'src/index.html',
                // если есть другие HTML страницы, добавляем их здесь
                // about: 'src/about.html'
            }
        }
    },
    server: {
        port: 3000
    }
})