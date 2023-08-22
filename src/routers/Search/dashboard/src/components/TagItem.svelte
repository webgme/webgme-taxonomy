<!--
  @component
  A tag visualized as a hierarchical SMUI item
-->
<script lang="ts">
  import {isObject} from '../Utils';
  import List, {
    Item,
    Text,
  } from "@smui/list";

  export let tag;

  // Given a tag object, create a list of paths to nested values

  const fqnValues = getFullyQualifiedEntries(tag).sort();
  function getFullyQualifiedEntries(tag): string[] {
    return Object.entries(tag).flatMap(([key, value]: [string, any]) => {
        if (isObject(value)) {
          const entries = getFullyQualifiedEntries(value);
            if (entries.length === 0) {
              return key;  // enums have {} as values if no nested props
            } else {
              return entries
                .map(entry => `${key}.${entry}`);
            }
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            return `${key}: []`;
          } else {
            return value.flatMap(getFullyQualifiedEntries)
              .map(entry => `${key}.${entry}`);
          }
        } else {
          return `${key}: ${value}`;
        }
    });
  }

</script>

{#each fqnValues as key}
  <Item><Text>{key}</Text></Item>
{/each}
