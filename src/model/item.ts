import Box from "./box"
import type {Config} from "./box"
import { Konva } from "../Konva"
import Container from "./container";
class Item extends Box {
    name: string;
    attribute: "liquid" | "solid" | "mix" | "gas"
    color: string
    constructor(config: Config & {name: string; attribute: "liquid" | "solid" | "mix" | "gas"; color: string}) {
        super({
            ...config,
            instance: new Konva.Rect({
                x: config.x,
                y: config.y,
                width: 10,
                height: 10,
                fill: 'black',
                stroke: 'black',
                strokeWidth: 1
            })
        })
        this.name = config.name
        this.attribute = config.attribute
        this.color = config.color
    }
    addToLayer(layer: Konva.Layer) {
        let target = layer.getIntersection({x: this.x + this.width / 2, y: this.y + this.height / 2})
        while (target) {
            if (target["_h2o"] instanceof Container) {
                const container = target["_h2o"] as Container
                container.addItem(this)
                layer.draw()
                return
            }
            target = target.parent
        }
        console.warn("药瓶只能添加进容器！")
    }
}

export default Item