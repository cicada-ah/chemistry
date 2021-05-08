<script lang="typescript">
    import Panel from "./component/Panel.svelte"
    import {drag} from "./model/useDrag"

    const src = "public/favicon.png";
    const a = {
        type: "item" as const,
        params: {
            name: "h2o",
            width: 10,
            height: 10
        }
    }
    const b = {
        type: "container" as const,
        params: {
            name: "beaker",
            width: 100,
            height: 100
        }
    }
</script>
<style lang="less">
    #drag-items img {
        height: 100px;
    }
</style>

<main>
    <p>Drag&drop yoda into the grey area.</p>
    <div id="drag-items">
        <img {src} use:drag={a} draggable="true" alt="123" />
        <img {src} use:drag={b} draggable="true" alt="123" />
    </div>
    <Panel />
</main>
