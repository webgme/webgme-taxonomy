<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";

  export let title: string | null = null;

  const dispatch = createEventDispatcher();

  function createArtifact() {
    dispatch('createArtifact');
  }

  function openEditor() {
    dispatch('openEditor');
  }
</script>

<TopAppBar variant="static">
  <Row>
    <Section>
      {#if title}
        <Title>{title}</Title>
      {/if}
    </Section>

    <Section align="end" toolbar>
      <IconButton
        class="material-icons"
        aria-label="Upload dataset"
        ripple={false}
        on:click={createArtifact}>file_upload
      </IconButton>
      <IconButton
        class="material-icons"
        aria-label="Edit taxonomy"
        ripple={false}
        on:click={openEditor}>open_in_new
      </IconButton>
    </Section>
  </Row>
</TopAppBar>
