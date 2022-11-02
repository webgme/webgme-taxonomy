<script lang="ts">
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar"

  export let project: string | null = null
</script>

<TopAppBar variant="static">
  <Row>
    <Section>
      <Title>{ project ?? "Data" } Dashboard</Title>
    </Section>
  </Row>
</TopAppBar>
