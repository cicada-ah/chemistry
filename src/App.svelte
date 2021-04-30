<script lang="typescript">
    import Panel from "./component/Panel.svelte"

    const src = "public/favicon.png";
    var itemURL = "";
    const handleDragstart = (e: DragEvent) => {
        itemURL = (e.target as HTMLImageElement).src;
        e.dataTransfer.setData("text/plain", itemURL)
    };
    
</script>
<style lang="less">
    #drag-items img {
        height: 100px;
    }
</style>

<main>
    <p>Drag&drop yoda into the grey area.</p>
    <div id="drag-items">
        <img {src} on:dragstart={handleDragstart} draggable="true" alt="123" />
    </div>
    <Panel />
</main>
