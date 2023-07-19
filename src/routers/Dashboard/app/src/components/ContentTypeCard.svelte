<script lang="ts">
  import Card, { Content, Actions } from "@smui/card"
  import Button, { Label } from "@smui/button"

  export let name: string | null = null;
  export let path: string | null = null;

  $: classes = (name == null) ? 'unknown' : ''
  $: disabled = !path
  $: href = disabled ? null : getDashboardUrl(path)

  function getDashboardUrl(path) {
    const suffix = '/static/index.html';
    return window.location.href
      .replace('routers/Dashboard/', 'routers/Search/')
      .replace(suffix, '/' + encodeURIComponent(path) + suffix);
  }
</script>

<Card class={classes}>
  <Content>{ name ?? "Unknown" }</Content>
  <Actions fullBleed>
    <Button {href} {disabled}>
      <Label>Open</Label>
      <i class="material-icons" aria-hidden="true">arrow_forward</i>
    </Button>
  </Actions>
</Card>
