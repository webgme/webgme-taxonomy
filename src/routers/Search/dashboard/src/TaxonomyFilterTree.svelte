<script context="module">
  // retain module scoped expansion state for each tree node
  const _expansionState = {
    /* treeNodeId: expanded <boolean> */
  };
</script>

<script lang="ts">
  import Checkbox from "@smui/checkbox";
  import Textfield from "@smui/textfield";
  import FormField from "@smui/form-field";
  import Select, { Option } from "@smui/select";
  export let tree;
  const { name, children } = tree;

  let expanded = _expansionState[name] || false;
  const toggleExpansion = () => {
    expanded = _expansionState[name] = !expanded;
  };
  $: arrowDown = expanded;

  let checked = tree.selected === undefined ? false : tree.selected;

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
    //tree.children.forEach(child => child.selected = checked);
    dispatch("change", { tree });
    //}
    // TODO: for any parents, set to indeterminate if single child is selected
  }

  // TODO: when any children are selected
  let value = null;
  $: tree.value = value;
</script>

<ul>
  <li>
    {#if tree.type === "TextField"}
      <FormField>
        <Checkbox bind:checked indeterminate={checked === null} />
        <Textfield label={name} bind:value />
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
            <Option value={child.name}>{child.name}</Option>
          {/each}
        </Select>
      </FormField>
    {:else}
      <FormField>
        <Checkbox bind:checked indeterminate={checked === null} />
        <span slot="label">
          {name}
        </span>
      </FormField>
    {/if}

    {#if children.length > 0 && tree.type !== "EnumField"}
      <div class="arrow" class:arrowDown on:click={toggleExpansion}>
        &#x25b6
      </div>
      {#if expanded}
        {#each children as child}
          <svelte:self on:change tree={child} />
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
  .no-arrow {
    padding-left: 1rem;
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
