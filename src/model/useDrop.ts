import type Konva from "konva"
import type { KonvaEventObject } from "konva/types/Node"
export function drop(node: HTMLElement, {stage, layer}: {
    stage?: Konva.Stage,
    layer?: Konva.Layer
}) {
    const init = () => {
        const dragStartHandler = (event: KonvaEventObject<DragEvent>) => {
            console.log(event)
        }
        const dragEndHandler = (event: KonvaEventObject<DragEvent>) => {
            event.target["_h2o"] && Object.assign(event.target["_h2o"], {
                x: event.target.attrs.x,
                y: event.target.attrs.y
            })
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
