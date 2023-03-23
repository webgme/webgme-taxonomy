import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'

const require = createRequire(import.meta.url)
const smuiThemeDir = path.dirname(require.resolve("smui-theme/package.json"))

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [svelte()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.join(smuiThemeDir, "fallback")]
      }
    }
  }
})
