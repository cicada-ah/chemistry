import type Konva from "konva"
interface Rect {
    x: number
    y: number
    width: number
    height: number
}
class Box implements Rect {
    x: number
    y: number
    width: number
    height: number
    actualBox: Rect
    instance: Konva.Shape | Konva.Group
    enter?: (v: Konva.Shape | Konva.Group) => void
    leave?: (v: Konva.Shape | Konva.Group) => void
    constructor(config: Rect & { instance: Konva.Shape | Konva.Group, actualBox: Rect}) {
        Object.assign(this, config)
        this.instance.on("enter", e => this.enter?.(e.target))
        this.instance.on("leave", e => this.leave?.(e.target))
    }
    addToLayer(layer: Konva.Layer) {
        layer.add(this.instance)
    }
    dispose() {
        
    }
}

export default Box;
