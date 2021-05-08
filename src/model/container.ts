import Box from "./box"
import type {Config} from "./box"
import { Konva } from "../Konva"
import type Item from "./item";

class Container extends Box {
    name: string;
    includes: Item[]
    condition: "normal" | "heating" | "shake" | "cooling";
    constructor(config: Config & {name: string;}) {
        super({
            ...config,
            instance: new Konva.Group({
                x: config.x,
                y: config.y,
            })
        });
        (this.instance as Konva.Group).add(
            new Konva.Rect({
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                fill: "yellow",
                stroke: 'black',
                strokeWidth: 2
            })
        )
        this.name = config.name
        this.includes = []
        this.condition = "normal"
    }
    reaction() {
        console.log("发生反应了！")
    }
    addItem(item: Item) {
        this.includes.push(item);
        (this.instance as Konva.Group).add(
            new Konva.Rect({
                x: 0,
                y: this.height - (this.includes.length * 10),
                width: 100,
                height: 10,
                fill: "blue",
                // stroke: 'black',
                // strokeWidth: 1
            })
        )
        this.reaction()
    }
}

export default Container