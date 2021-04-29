<script lang="typescript">
    import Konva from "konva";
    import { onMount } from "svelte";

    const src = "public/favicon.png";
    var itemURL = "";
    const handleDragstart = (e: DragEvent) => {
        itemURL = e.target.src;
    };
    onMount(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const stage = new Konva.Stage({
            container: "container",
            width: width,
            height: height,
        });
        const layer = new Konva.Layer();
        stage.add(layer);

        const con = stage.container();
        con.addEventListener("dragover", function (e: DragEvent) {
            e.preventDefault(); // !important
        });

        con.addEventListener("drop", function (e: DragEvent) {
            e.preventDefault();

            stage.setPointersPositions(e);

            Konva.Image.fromURL(itemURL, function (image: Konva.Image) {
                layer.add(image);

                image.position(stage.getPointerPosition());
                image.draggable(true);

                layer.draw();
            });
        });
    });
</script>

<style lang="less">
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #f0f0f0;
    }

    #container {
        background-color: rgba(0, 0, 0, 0.1);
    }

    p {
        margin: 4px;
    }

    #drag-items img {
        height: 100px;
    }
</style>

<main>
    <p>Drag&drop yoda into the grey area.</p>
    <div id="drag-items">
        <img {src} on:dragstart={handleDragstart} draggable="true" />
        <img {src} on:dragstart={handleDragstart} draggable="true" />
    </div>
    <div id="container" />
</main>
