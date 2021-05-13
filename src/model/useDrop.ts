import { haveIntersection } from "@/utils/utilsFunc"
import type Konva from "konva"
import type { KonvaEventObject } from "konva/types/Node"
import type Box from "./box"
export function drop(node: HTMLElement, {stage, layer}: {
    stage?: Konva.Stage,
    layer?: Konva.Layer
}) {
    const init = () => {
        let from: Box[] = []
        const dragStartHandler = (event: KonvaEventObject<DragEvent>) => {
            if (event.target["_h2o"]) {
                const target = event.target["_h2o"]
               
                layer.children.each((v) => {
                    const box = v["_h2o"] as Box
                    if (!box || box === target) {
                        return
                    }
                    if (haveIntersection(target, box)) {
                        from.push(box)
                    }
                })
            }
        }
        const dragEndHandler = (event: KonvaEventObject<DragEvent>) => {
            if (event.target["_h2o"]) {
                const target = event.target["_h2o"]
                Object.assign(target, {
                    x: event.target.attrs.x,
                    y: event.target.attrs.y
                })
                from.forEach((v) => {
                    if (!haveIntersection(v, target)) {
                        v?.leave(event.target)
                    }
                })
                from = []
                layer.children.each((v) => {
                    const box = v["_h2o"] as Box
                    if (!box || box === target) {
                        return
                    }
                    if (haveIntersection(target, box)) {
                        box.enter?.(event.target)
                    }
                })
            }
        }
        if (stage) {
            stage.on("dragstart", dragStartHandler)
            stage.on("dragend", dragEndHandler)
            return () => {
                stage.off("dragstart", dragStartHandler)
                stage.off("dragend", dragEndHandler)
            }
        }
    }
    let destroy
    return {
        destroy() {
            destroy?.()
        },
        update(v) {
            stage = v.stage
            layer = v.layer
            destroy = init()
        }
    }
}
