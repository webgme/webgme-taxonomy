<script lang="ts">
  import { createEventDispatcher, setContext } from 'svelte';
  import Chip, { Set, Text as ChipText, TrailingAction } from "@smui/chips";
  import IconButton from '@smui/icon-button'
  import Menu, { SelectionGroup, SelectionGroupIcon } from '@smui/menu';
  import List, { Item, Text as ListText } from '@smui/list';

  // forces the smui List component to use "ul" element (instead of "nav")
  setContext<boolean | undefined>('SMUI:list:nav', false);
  // forces the smui List's Item component to use "li" element (instead of "span")
  setContext<boolean | undefined>('SMUI:list:item:nav', false)

  export let label: string | null = null
  export let items: string[] = [];
  export let value: string[] | null = [];

  const dispatch = createEventDispatcher();
  let menu: InstanceType<typeof Menu>;

  $: isSelected = items.reduce((selection, item) => {
    const selected = value?.includes(item) ?? false;
    selection[item] = selected;
    return selection
  }, {} as { [item: string]: boolean });

  function toggleSelection(item: string) {
    const selected = isSelected[item] = !isSelected[item];
    value = Object.keys(isSelected).filter(item => isSelected[item]);
    dispatch("selectionChange", { item, selected });
  }

</script>


<div class="multiselect">
  <Set chips={value ?? []} let:chip input>
    <Chip {chip}>
      <ChipText>{chip}</ChipText>
      <TrailingAction icon$class="material-icons" on:SMUIChipTrailingAction:interaction={() => toggleSelection(chip)}>cancel</TrailingAction>
    </Chip>
  </Set>

  <IconButton class="edit-button material-icons" aria-label="Edit {label ?? 'Items'}" on:click={() => menu.setOpen(true)}>add</IconButton>

  <Menu bind:this={menu}>
    <List tag="ul">
      <SelectionGroup>
        {#each items as item}
          <Item tag="li" selected={isSelected[item]} on:SMUI:action={() => toggleSelection(item)}>
            <SelectionGroupIcon>
              <i class="material-icons">check</i>
            </SelectionGroupIcon>
            <ListText>{item}</ListText>
          </Item>
        {/each}
      </SelectionGroup>
    </List>
  </Menu>

</div>


<style>

  .multiselect {
    display: flex;
    align-items: center;
  }

  .multiselect :global(button) {
    margin-bottom: 0;
  }

  .multiselect :global(.mdc-menu__selection-group .mdc-menu__selection-group-icon) {
    left: unset;
    right: unset;
    position: unset;
    top: unset;
    transform: unset;
    display: unset;
    visibility: hidden;
    margin-right: 10px;
  }

  .multiselect :global(.mdc-menu-item--selected .mdc-menu__selection-group-icon) {
    visibility: visible;
  }

</style>

