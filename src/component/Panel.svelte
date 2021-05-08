<script lang="typescript">
    import { onMount, setContext } from "svelte";
    import { Konva, key } from "../Konva"
    import Item from "../model/item";
    import Container from "../model/container"
    import type { Config } from "../model/useDrag"
    import {drop} from "../model/useDrop"
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
            e.preventDefault();
        });
        con.addEventListener("drop", function (e: DragEvent) {
            e.preventDefault();
            stage.setPointersPositions(e);
            const data = JSON.parse(e.dataTransfer.getData("text")) as Config;
            switch (data.type) {
                case "item":
                    new Item({
                        x: stage.getPointerPosition().x,
                        y: stage.getPointerPosition().y,
                        ...data.params,
                    }).addToLayer(layer)
                    break;
                case "container":
                    new Container({
                        x: stage.getPointerPosition().x - data.offsetX,
                        y: stage.getPointerPosition().y - data.offsetY,
                        ...data.params,
                    }).addToLayer(layer)
                    break;
                default:
                    break;
            }
        });
    });
</script>
<div id="container" use:drop={{stage, layer}} />
<style lang="less">
    #container {
        background-color: rgba(0, 0, 0, 0.1);
    }
</style>