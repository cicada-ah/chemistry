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
        if (stage) {
            stage.on("dragstart", dragStartHandler)
            return () => {
                stage.off("dragstart", dragStartHandler)
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
