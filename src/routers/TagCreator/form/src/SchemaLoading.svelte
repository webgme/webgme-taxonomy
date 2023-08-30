<script lang="ts">
  import CircularProgress from '@smui/circular-progress';
</script>

<div class="schema-loading">
  <CircularProgress indeterminate />
  <span class="schema-loading-text">
    <slot>
      Loading schema
    </slot>
  </span>
</div>

<style lang="scss">
  $circular-progress-size: 48px;

  @keyframes ellipsis {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .schema-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 16px;
    font-size: 1.2em;
    margin-top: 32px;

    :global(.mdc-circular-progress) {
      height: $circular-progress-size;
      width: $circular-progress-size;
    }

    .schema-loading-text:after {
      content: "\2026";
      animation-duration: 1.2s;
      animation-name: ellipsis;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-timing-function: ease-in-out;
    }
  }
</style>