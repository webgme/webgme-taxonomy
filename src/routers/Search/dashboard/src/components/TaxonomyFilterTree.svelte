<script lang="ts">
  import Checkbox from "@smui/checkbox";
  import Textfield from "@smui/textfield";
  import FormField from "@smui/form-field";
  import Select, { Option } from "@smui/select";
  import Autocomplete from "@smui-extra/autocomplete";
  import Multiselect from "./Multiselect.svelte";
  import TagMatcher from "../TagMatcher";

  export let tree;
  const { name, children } = tree;

  export let tags = [];

  let search: ((input: string) => Promise<any[] | false>) | undefined;
  $: if (tree.type === "TextField") {
    search = TagMatcher(tree.id, tags);
  }

  const toggleExpansion = () => {
    tree.expanded = !tree.expanded;
  };
  $: arrowDown = tree.expanded;
  $: showChildren = children.length && !["EnumField", "SetField"].includes(tree.type);

  let checked = tree.selected === undefined ? false : tree.selected;
  let value = tree.value || null;

  // TODO: select checkbox -> select all children; partial select all parents (if false)
  // TODO: unselect checkbox -> unselect all children

  // TODO: get the state of the tag and all the children
  // mutate the existing data
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  $: {
    //if (checked !== tree.selected) {

    console.log("checked:", checked);
    tree.selected = checked;
    tree.value = value;
    //tree.children.forEach(child => child.selected = checked);
    onChange();
    //}
    // TODO: for any parents, set to indeterminate if single child is selected
  }

  function onChange() {
    dispatch("change", { tree });
  }
</script>

<ul>
  <li>
    {#if tree.type === "TextField"}
      <FormField>
        <Checkbox bind:checked indeterminate={checked === null} />
        <Autocomplete combobox label={name} bind:value {search} />
      </FormField>
    {:else if tree.type === "IntegerField"}
      <FormField>
        <Checkbox bind:checked indeterminate={checked === null} />
        <Textfield label={name} bind:value type="number" />
      </FormField>
    {:else if tree.type === "EnumField"}
      <FormField>
        <Checkbox bind:checked indeterminate={checked === null} />
        <Select bind:value label={name}>
          {#each children as child}
            <Option value={child.id}>{child.name}</Option>
          {/each}
        </Select>
      </FormField>
    {:else if tree.type === "SetField"}
      <FormField>
        <Checkbox bind:checked indeterminate={checked === null} />
        <Multiselect label={name} items={children.map(({ name }) => name)} bind:value />
      </FormField>
    {:else}
      <FormField>
        <Checkbox bind:checked indeterminate={checked === null} />
        <span slot="label">
          {name}
        </span>
      </FormField>
    {/if}

    {#if showChildren}
      <div class="arrow" class:arrowDown on:click={toggleExpansion}>
        &#x25b6
      </div>
      {#if tree.expanded}
        {#each children as child}
          <svelte:self on:change tree={child} {tags} />
        {/each}
      {/if}
    {/if}
  </li>
</ul>

<style>
  ul {
    margin: 0;
    list-style: none;
    padding-left: 1.2rem;
    user-select: none;
  }
  .arrow {
    cursor: pointer;
    display: inline-block;
    padding-left: 20px;
    /* transition: transform 200ms; */
  }
  .arrowDown {
    transform: rotate(90deg);
  }
</style>