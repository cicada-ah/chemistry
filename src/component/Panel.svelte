<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { Konva, key } from "../Konva"
    import Item from "../model/item";
    import Container from "../model/container"
    import type { Config } from "../model/useDrag"
    import {drop} from "../model/useDrop"
    import { haveIntersection } from "@/utils/utilsFunc";
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
            console.log(data)
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
            // console.log()
            Konva.Image.fromURL(e.dataTransfer.getData("text"), function (
                image: Konva.Image & { _testRotate: Function }
            ) {
                image._testRotate = (deg: number) => {
                    var tween = new Konva.Tween({
                        node: image,
                        duration: 2,
                        rotation: deg,
                        opacity: 0.5,
                        easing: Konva.Easings.BackEaseOut,
                        onFinish: function () {
                            image.destroy();
                        },
                    });

                    setTimeout(function () {
                        tween.play();
                    }, 100);
                };

                layer.add(image);

                image.position(stage.getPointerPosition());
                image.draggable(true);

                layer.draw();
            });
        });
        layer.on("dragmove", function (e) {
            let target = e.target;
            let targetRect = target.getClientRect();
            layer.children.each((group) => {
                if (group === target) {
                    return;
                }
                if (haveIntersection(group.getClientRect(), targetRect)) {
                    const { x, y, width, height } = group.getClientRect();
                    target.position({
                        x: x + 25,
                        y,
                    });
                    target.draggable(false);
                    target._testRotate(-70);

                    let A = 3,
                        W = 1 / 3,
                        Q = 0,
                        H = height / 2,
                        speed = -0.001;
                    var triangle = new Konva.Shape({
                        x: x,
                        y: y,
                        sceneFunc: function (ctx, shape) {
                            (function drawAnimation() {
                                ctx.beginPath();
                                ctx.moveTo(0, height / 2);
                                Q += speed;
                                for (let xm = 0; xm <= width; xm++) {
                                    let ym = A * Math.sin(W * xm + Q) + H;
                                    ctx.lineTo(xm, ym);
                                }
                                ctx.stroke();
                                // ctx.lineTo(width - 13, H);
                                // ctx.lineTo(0, height);
                                // ctx.fill();
                                ctx.closePath();
                                // window.requestAnimationFrame(drawAnimation);
                            })();

                            // (!) Konva specific method, it is very important
                            ctx.fillStrokeShape(shape);
                        },
                        fill: "#00ffff",
                        stroke: "#00ffff",
                        lineWidth: 1,
                        strokeWidth: 1,
                    });

                    // add the triangle shape to the layer
                    layer.add(triangle);

                    // add the layer to the stage
                    stage.add(layer);
                }
            });
        });
    });
</script>
<style lang="less">
    #container {
        background-color: #1e90ff;
    }
</style>

<div id="container" use:drop={{stage, layer}} />
