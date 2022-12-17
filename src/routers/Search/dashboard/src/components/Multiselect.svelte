<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Chip, { Text as ChipText } from "@smui/chips";
  import { Graphic, Text as ListText } from '@smui/list';
  import Textfield from '@smui/textfield';
  import Autocomplete from "@smui-extra/autocomplete";

  type Option = { label: string, value: string };

  export let label: string | null = null
  export let options: Option[] = [];
  export let value: string[];
  export let singleSelect = false;
  
  const dispatch = createEventDispatcher();
  let autocomplete: InstanceType<typeof Autocomplete>;
  let text: string = "";
  let prevValue: Option | null = null;
  let selected: Option[] = [];

  $: selected = selected.filter(opt => options.includes(opt));
  $: hasValues = !!value?.length;

  function getOptionLabel(option: Option) {
    return option?.label ?? "";
  }

  function toggleSelection(option: Option) {
    const index = selected.indexOf(option);
    const select = index < 0;

    if (select) {
      selected.push(option);
    } else {
      selected.splice(index, 1);
    }
    
    selected = selected;
    value = selected.map(opt => opt.value);
    dispatch("selectionChange", { option, selected: select });
  }

  function handleSelection(event) {
    toggleSelection(event.detail);
    text = "";
    prevValue = null;
    autocomplete.focus();
    if (singleSelect) {
      autocomplete.blur();
    }
  }

</script>


<div class="multiselect">
  <Autocomplete 
    bind:this={autocomplete}
    {options}
    {label}
    {getOptionLabel}
    bind:value={prevValue}
    selectOnExactMatch={false}
    on:SMUIAutocomplete:selected={handleSelection}
  >
    <Textfield {label} bind:value={text} class={hasValues ? "has-values" : ""}>
      {#each selected as chip}
        <Chip {chip}>
          <ChipText>{chip.label}</ChipText>
          <!--
            This "button" copied from Chip's "TrailingAction" component. Couldn't use
            TrailingAction component because its root is a "button" element, and when
            placed inside a label (like w/ TextField), a click anywhere on the label
            clicks the button (so clicking anywhere on the textfield removes all the
            chips).
          -->
          <div
            class="mdc-deprecated-chip-trailing-action mdc-ripple-upgraded"
            on:click|stopPropagation={() => toggleSelection(chip)}
          >
            <span class="mdc-deprecated-chip-trailing-action__ripple"></span>
            <span class="material-icons mdc-deprecated-chip-trailing-action__icon">cancel</span>
          </div>
        </Chip>
      {/each}
    </Textfield>

    <span 
      slot="match"
      let:match
      class="multiselect-menu-item-wrapper"
      class:selected={selected.includes(match)}
    >
      <Graphic class="material-icons">check</Graphic>
      <ListText>{match.label}</ListText>
    </span>
  </Autocomplete>
</div>


<style>

  .multiselect {
    display: flex;
    align-items: center;
  }

  .multiselect :global(button) {
    margin-bottom: 0;
  }

  .multiselect :global(.mdc-text-field) {
    height: auto;
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .multiselect :global(.mdc-text-field.has-values .mdc-floating-label),
  .multiselect :global(.mdc-text-field .mdc-floating-label--float-above) {
    transform: scale(0.75);
    top: 0;
    transition-property: transform, top;
  }

  .multiselect :global(.mdc-text-field__input) {
    flex: 1 0 80px;
  }

  .multiselect :global(.multiselect-menu-item-wrapper) {
    height: 100%;
    width: 100%;
    display: inline-flex;
    align-items: center;
  }


  .multiselect :global(.multiselect-menu-item-wrapper .mdc-deprecated-list-item__graphic) {
    margin-right: 10px;
    visibility: hidden;
  }

  .multiselect :global(.multiselect-menu-item-wrapper.selected .mdc-deprecated-list-item__graphic) {
    visibility: visible;
  }

</style>

