import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: 'terser',
        terserOptions: {
            mangle: true,
            compress: true,
            toplevel: true,
            keep_classnames: false,
            keep_fnames: false,
        },
        rollupOptions: {
            input: {
                app: './index.html',
                'service-worker': './src/background.js',
            },
            output: {
                entryFileNames: assetInfo => assetInfo.name === 'service-worker' ? '[name].js' : '[name].js',
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        },
    },
})
