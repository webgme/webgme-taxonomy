// Don't import light/dark theme yet, since Search dashboard doesn't have dark theme enabled and it should match that.
// import './theme/light.scss'
// import './theme/dark.scss'
import './theme/_smui-theme.scss'
import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
