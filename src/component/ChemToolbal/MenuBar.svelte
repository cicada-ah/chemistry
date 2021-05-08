<script>
  import SegmentedButton, { Segment } from "@smui/segmented-button";
  import { Label } from "@smui/common";
  import { selected } from "@/store/MenuBar.ts";
  let choices = ["mixture", "solid", "liquid", "gas", "equipment"];
</script>

<style>
  .segmented-warp {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :global(.mdc-segmented-button__segment) {
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    border-color: #fff;
  }
  :global(.mdc-segmented-button__segment--selected) {
    background-color: #fff;
    color: #1e90ff;
    border-color: #fff;
  }
  :global(.mdc-segmented-button__segment:focus) {
    background-color: #fff;
    color: #1e90ff;
    border-color: #fff;
  }
</style>

<div class="segmented-warp">
  <SegmentedButton
    segments={choices}
    default={choices[0]}
    let:segment
    singleSelect
    bind:$selected>
    <Segment
      {segment}
      on:click={() => {
        selected.set(segment);
      }}>
      <Label>{segment}</Label>
    </Segment>
  </SegmentedButton>
</div>
