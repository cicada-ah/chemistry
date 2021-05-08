import type Konva from "konva"
interface Rect {
    x: number
    y: number
    width: number
    height: number
}
export type Config = Rect & { instance: Konva.Shape | Konva.Group, actualBox?: Rect}
class Box implements Rect {
    containerWidth: number
    containerHeight: number
    x: number
    y: number
    width: number
    height: number
    instance: Konva.Shape | Konva.Group
    needClear: (() => void)[]
    enter?: (v: Konva.Shape | Konva.Group) => void
    leave?: (v: Konva.Shape | Konva.Group) => void
    constructor(config: Config) {
        Object.assign(this, config)
        this.needClear = []
        this.setContainer()
        this.initInstance(config.instance)
        this.initX(config.x)
        this.initY(config.y)
        this.initWidth(config.width)
        this.initHeight(config.height)
    }
    addToLayer(layer: Konva.Layer) {
        layer.add(this.instance)
        layer.draw()
    }
    dispose() {

    }
    setContainer(width?: number, height?: number) {
        if (!width || !height) {
            this.containerWidth = document.getElementById("container").clientWidth
            this.containerHeight = document.getElementById("container").clientHeight
            window.addEventListener("resize", () => {
                this.containerWidth = document.getElementById("container").clientWidth
                this.containerHeight = document.getElementById("container").clientHeight
            })
        }
    }
    initInstance(instance: Config["instance"]) {
        this.instance = instance
        this.instance.on("enter", e => this.enter?.(e.target))
        this.instance.on("leave", e => this.leave?.(e.target))
        this.instance.width(this.width)
        this.instance.height(this.height)
        this.instance.y(this.y)
        this.instance.draggable(true)
        this.instance.dragBoundFunc(({x, y}) => {
            return {
                x: Math.max(0, Math.min(x, this.containerWidth - this.width)),
                y: Math.max(0, Math.min(y, this.containerHeight - this.height))
            }
        })
        Object.assign(this.instance, {_h2o: this})
    }
    initX(x: number) {
        this.x = x
        this.instance.x(x)
    }
    initY(y: number) {
        this.y = y
        this.instance.y(y)
    }
    initWidth(width: number) {
        this.width = width
        this.instance.width(width)
    }
    initHeight(height: number) {
        this.height = height
        this.instance.height(height)
    }
}

export default Box;
