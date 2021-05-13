<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { Konva, key } from "../Konva";
    import Item from "../model/item";
    import Container from "../model/container";
    import type { Config } from "../model/useDrag";
    import { drop } from "../model/useDrop";
    import { Particle } from "@/model/particle";
    let stage;
    let layer;
    let con;

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
            Konva.Image.fromURL(data.params.src, function (
                image: Konva.Image & { _testRotate: Function }
            ) {
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
                        // var circle = new Konva.Circle({
                        //     x: stage.width() / 2,
                        //     y: stage.height() / 2,
                        //     radius: 70,
                        //     fill: "red",
                        //     stroke: "black",
                        //     strokeWidth: 4,
                        // });
                        // layer.add(circle);
                        // layer.draw();
                        // setTimeout(() => {
                        //     circle.setAttrs({
                        //         radius: 20,
                        //     });
                        //     layer.draw();
                        // }, 1000);

                        const flameGroup = new Konva.Group({
                            draggable: true,
                        });

                        var W = 100;
                        var H = 100;
                        var CX = W / 2;
                        var CY = H / 2;
                        var mouse = {
                            x: CX,
                            y: CY,
                            tx: CX,
                            ty: CY,
                        };
                        const particles = [];
                        const particleCount = 200;
                        let particle = null;
                        setInterval(loop, 60);
                        function loop() {
                            if (particles.length < particleCount) {
                                particle = new Particle(
                                    W,
                                    H,
                                    mouse.x,
                                    mouse.y,
                                    Math.random() - 0.5,
                                    Math.random() * -10,
                                    Math.random() * 1.5
                                );
                                particle.create(layer, flameGroup);
                                particles.push(particle);
                                flameGroup.add(particle.instance);
                            }

                            for (let i = 0; i < particleCount - 1; i++) {
                                particle = particles[i];
                                if (particle) {
                                    particle.update({ mouse, W, H: 100 });
                                    particle.render();
                                }
                            }
                            layer.add(flameGroup);
                            layer.draw();
                        }
                    }
                    default:
                        break;
                }
            });
        });
        // layer.on("dragmove", function (e) {
        //     let target = e.target;
        //     let targetRect = target.getClientRect();
        //     layer.children.each((group) => {
        //         if (group === target) {
        //             return;
        //         }
        //         if (haveIntersection(group.getClientRect(), targetRect)) {
        //             const { x, y, width, height } = group.getClientRect();
        //             target.position({
        //                 x: x + 25,
        //                 y,
        //             });
        //             target.draggable(false);
        //             target._testRotate?.(-70);

        // let A = 3,
        //     W = 1 / 3,
        //     Q = 0,
        //     H = (2 * height) / 3,
        //     speed = -0.001;
        // var triangle = new Konva.Shape({
        //     x: x,
        //     y: y,
        //     sceneFunc: function (ctx, shape) {
        //         (function drawAnimation() {
        //             ctx.beginPath();
        //             ctx.moveTo(13, H);
        //             Q += speed;
        //             for (let xm = 13; xm <= width - 10; xm++) {
        //                 let ym = A * Math.sin(W * xm + Q) + H;
        //                 ctx.lineTo(xm, ym);
        //             }
        //             ctx.stroke();
        //             // ctx.lineTo(width - 13, H);
        //             // ctx.lineTo(0, height);
        //             // ctx.fill();
        //             ctx.closePath();
        //             // window.requestAnimationFrame(drawAnimation);
        //         })();

        //         // (!) Konva specific method, it is very important
        //         ctx.fillStrokeShape(shape);
        //     },
        //     fill: "#00ffff",
        //     stroke: "#00ffff",
        //     lineWidth: 1,
        //     strokeWidth: 1,
        // });

        //             // add the triangle shape to the layer
        //             layer.add(triangle);

        //             // add the layer to the stage
        //             stage.add(layer);
        //         }
        //     });
        // });
    });
</script>

<style lang="less">
    #container {
        background-color: black;
    }
</style>

<div id="container" use:drop={{ stage, layer }} />
