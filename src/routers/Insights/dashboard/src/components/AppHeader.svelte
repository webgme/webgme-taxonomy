<script lang="ts">
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  export let title: string | null = null;

</script>

<TopAppBar variant="static">
  <Row>
    <Section>
      {#if title}
        <Title>{title}</Title>
      {/if}
    </Section>
  </Row>
</TopAppBar>
