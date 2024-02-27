<script lang="ts">
  import { ValidationError } from 'svelte-jsonschema-form';
  import Snackbar, { Label, Actions } from '@smui/snackbar';
  import IconButton from '@smui/icon-button';

  export let error: string | Error | ValidationError | null = null;

  let errorSnackbar: Snackbar;

  $: if (error != null) errorSnackbar.open();
</script>

<Snackbar class="schema-error" bind:this={errorSnackbar}>
  <Label>
      {#if typeof error === 'string'}
        {error}
      {:else if error instanceof Error}
        {error.message}
      {:else}
        Unknown error
      {/if}
      {#if error instanceof ValidationError}
        <ul>
          {#each error.errors as suberror}
            <li>{suberror.message}</li>
          {/each}
        </ul>
      {/if}
  </Label>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>
