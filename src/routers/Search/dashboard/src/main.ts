import "./app.css";
import "svelte-jsonschema-form/theme/custom";
import App from "./App.svelte";

const app = new App({
  target: document.body,
});

export default app;
