import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [svelte()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.join(__dirname, "node_modules/smui-theme/fallback")]
      }
    }
  }
})
