Currently this dashboard just displays the available content types for the specified project branch/tag/commit. When a content type is selected, it then navigates to the seperate "Search" dashboard for that content type.

Ideally, I think both dashboards should be a single Svelte app, but there were some routing issues doing some in the existing "Search" router.

This dashboard could also be used to show other general project information, so I attempted to not make it specific to just "content types".
