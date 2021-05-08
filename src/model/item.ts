import Box from "./box"
import type {Config} from "./box"
import type { Konva } from "../Konva"
import Container from "./container";

export interface ItemConfig extends Config {
    name: string;
    attribute: "liquid" | "solid" | "mix" | "gas";
    color: string
    afterAdded: (layer: Konva.Layer) => void
}
class Item extends Box {
    name: string;
    attribute: "liquid" | "solid" | "mix" | "gas"
    color: string
    afterAdded?: (layer: Konva.Layer) => void
    constructor(config: ItemConfig) {
        super(config)
        this.name = config.name
        this.attribute = config.attribute
        this.color = config.color
        this.afterAdded = config.afterAdded
    }
    addToLayer(layer: Konva.Layer) {
        for (let i = 0; i < layer.children.length; i++) {
            if (layer.children[i]["_h2o"] instanceof Container) {
                const container = layer.children[i]["_h2o"] as Container
                if (this.x >= container.x && this.x <= container.x + container.width && this.y >= container.y && this.y <= container.y + container.height) {
                    container.addItem(this)
                    this.afterAdded?.(layer)
                    layer.draw()
                    return
                }
            }
        }
        console.warn("药瓶只能添加进容器！")
    }
}

export default Item