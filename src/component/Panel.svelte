<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { Konva, key } from "../Konva";
    import Item from "../model/item";
    import Container from "../model/container";
    import type { Config } from "../model/useDrag";
    import { drop } from "../model/useDrop";
    import AlcoholBurner from "@/model/alcoholBurner";
    import { layered } from "@/store/MenuBar.ts";
    let stage;
    let con;
    let layer;

    setContext(key, {
        getStage() {
            return stage;
        },
        getBaseLayer() {
            return layer;
        },
        getContainer() {
            return con;
        },
    });

    onMount(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        stage = new Konva.Stage({
            container: "container",
            width: width,
            height: height,
        });
        layered.set(new Konva.Layer());
        layered.subscribe((value) => {
            layer = value;
        });
        stage.add(layer);
        con = stage.container();
        con.addEventListener("dragover", function (e: DragEvent) {
            e.preventDefault();
        });
        con.addEventListener("drop", function (e: DragEvent) {
            e.preventDefault();
            stage.setPointersPositions(e);
            const data = JSON.parse(e.dataTransfer.getData("text")) as Config;
            Konva.Image.fromURL(data.params.src, function (image: Konva.Image) {
                switch (data.type) {
                    case "item": {
                        new Item({
                            x: stage.getPointerPosition().x,
                            y: stage.getPointerPosition().y,
                            width: image.width(),
                            height: image.height(),
                            ...data.params,
                            afterAdded(layer) {
                                switch (this.attribute) {
                                    case "liquid":
                                        layer.add(image);
                                        layer.draw();
                                        var tween = new Konva.Tween({
                                            node: image,
                                            duration: 2,
                                            rotation: -70,
                                            opacity: 0.5,
                                            easing: Konva.Easings.BackEaseOut,
                                            onFinish: function () {
                                                image.destroy();
                                            },
                                        });

                                        setTimeout(function () {
                                            tween.play();
                                        }, 100);
                                        break;
                                    case "gas":
                                        layer.add(image);
                                        layer.draw();
                                        var tween = new Konva.Tween({
                                            node: image,
                                            duration: 2,
                                            rotation: -70,
                                            opacity: 0.5,
                                            easing: Konva.Easings.BackEaseOut,
                                            onFinish: function () {
                                                image.destroy();
                                            },
                                        });

                                        setTimeout(function () {
                                            tween.play();
                                        }, 100);
                                    default:
                                        break;
                                }
                            },
                            instance: image,
                        }).addToLayer(layer);
                        break;
                    }
                    case "container": {
                        const width = image.width();
                        const height = image.height();
                        const contGroup = new Konva.Group();
                        contGroup.add(image);
                        new Container({
                            x:
                                stage.getPointerPosition().x -
                                data.offsetX * width,
                            y:
                                stage.getPointerPosition().y -
                                data.offsetY * height,
                            width,
                            height,
                            ...data.params,
                            instance: contGroup,
                        }).addToLayer(layer);
                        break;
                    }
                    case "burner": {
                        const width = image.width();
                        const height = image.height();
                        new AlcoholBurner({
                            x:
                                stage.getPointerPosition().x -
                                data.offsetX * width,
                            y:
                                stage.getPointerPosition().y -
                                data.offsetY * height,
                            width,
                            height,
                            status: "burned",
                            ...data.params,
                        }).addToLayer(layer);
                    }
                    default:
                        break;
                }
            });
        });
    });
</script>

<style lang="less">
    #container {
        background-color: #274c43;
    }
</style>

<div id="container" use:drop={{ stage, layer }} />
