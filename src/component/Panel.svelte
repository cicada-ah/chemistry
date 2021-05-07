<script lang="typescript">
    import { onMount, setContext } from "svelte";
    import { Konva, key } from "../Konva"
    let stage
    let layer
    let con

    setContext(key, {
        getStage() {
            return stage;
        },
        getBaseLayer() {
            return layer;
        },
        getContainer() {
            return con
        }
    })
    onMount(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        stage = new Konva.Stage({
            container: "container",
            width: width,
            height: height,
        });
        layer = new Konva.Layer();
        stage.add(layer);
        con = stage.container();
        con.addEventListener("dragover", function (e: DragEvent) {
            e.preventDefault(); // !important
        });
        con.addEventListener("drop", function (e: DragEvent) {
            e.preventDefault();
            stage.setPointersPositions(e);
            // console.log()
            Konva.Image.fromURL(e.dataTransfer.getData("text"), function (image: Konva.Image) {
                layer.add(image);

                image.position(stage.getPointerPosition());
                image.draggable(true);

                layer.draw();
            });
        });
    });
</script>
<div id="container" />
<style lang="less">
    #container {
        background-color: #1e90ff;
    }
</style>