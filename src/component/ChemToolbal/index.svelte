<script lang="ts">
    import ImageList from "./ImageList.svelte";
    import MenuBar from "./MenuBar.svelte";
    import { fly } from "svelte/transition";
    let visible = false;
    window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.keyCode === 32) {
            visible = !visible;
        }
    });
</script>

<style lang="less" scoped="false">
    .darw-toolbal {
        position: absolute;
        width: 100%;
        z-index: 999;
        margin-top: 10px;
    }
    label {
        position: absolute;
        margin-top: 10px;
        z-index: 999;
        color: cornsilk;
    }
</style>

{#if visible}
    <div class="darw-toolbal" transition:fly={{ y: -200, duration: 1000 }}>
        <MenuBar />
        <ImageList />
    </div>
{/if}
<label> {visible ? 'press space key: open' : 'press space key: close'} </label>
