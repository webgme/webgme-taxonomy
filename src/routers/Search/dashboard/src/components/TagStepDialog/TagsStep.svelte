<!--
  @component
  The "tags" step of the append artifact dialog.
-->
<script lang="ts">
  import Paper, { Subtitle, Content } from "@smui/paper";
  import FileButton from "../FileButton.svelte";
  import SchemaForm from "../SchemaForm.svelte";

  export let data: any;
  export let disabled = false

  let tagsFile: FileList | null = null;

  $: mergeTagsFile(tagsFile?.[0]);

  async function mergeTagsFile(file: File | undefined) {
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
        data = JSON.parse(reader.result as string);
      };
      reader.readAsText(file);
    }
  }
</script>

<Paper variant="unelevated" class="tags-step">
  <Subtitle>
    <span>Select Tags</span>
    <FileButton accept="application/json" tooltip="Populate from tags file" {disabled} />
  </Subtitle>

  <Content>
    <SchemaForm bind:data={data} />
  </Content>
</Paper>


<style lang="scss">
  :global(.jsonschema-form > .smui-paper--raised) {
    box-shadow: none !important;
    padding: 0 !important;

    > :global(.smui-paper__title) {
      display: none;
    }
  }

  :global(.tags-step .smui-paper__subtitle) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :global(.tags-step.smui-paper) {
    padding: 0;
  }
</style>