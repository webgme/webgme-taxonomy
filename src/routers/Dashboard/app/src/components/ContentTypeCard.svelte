<script lang="ts">
  import Card, { Content, Actions } from "@smui/card"
  import Button, { Label } from "@smui/button"

  export let name: string | null = null
  export let url: string | null = null

  $: classes = (name == null) ? 'unknown' : ''
  $: disabled = !url
  $: href = disabled ? null : url
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
