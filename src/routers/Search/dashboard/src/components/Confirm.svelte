
<!--
  @component
  A dialog for confirming some action
-->
<script lang="ts">
  import { createEventDispatcher} from "svelte";
  import Dialog, { Content, Title } from "@smui/dialog";
  import Button, { Label } from "@smui/button";

  const dispatch = createEventDispatcher();

  export let open = true;
  export let title = 'Are you sure?';
  export let prompt = 'Are you sure?';

  // FIXME: check that it shows correct tags when item is changed
  function close() {
    open = false;
  }

  function onConfirm() {
    open = false;
    dispatch('confirm');
  }
</script>

<Dialog
  bind:open
  aria-labelledby="title"
  aria-describedby="content"
>
  <Title>{title}</Title>
  <Content>
    {prompt}
  </Content>
  <div class="confirm-dialog-actions">
    <Button on:click={close}>
      <Label>No</Label>
    </Button>
    <Button on:click={() => onConfirm()}>
      <Label>Yes</Label>
    </Button>
  </div>
</Dialog>

<style>
  .confirm-dialog-actions {
    display: flex;
    justify-content: flex-end;
    padding: 0.5em;
  }
</style>
