import { haveIntersection } from "@/utils/utilsFunc";
import type Konva from "konva";
interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface Config extends Rect {
  instance?: Konva.Shape | Konva.Group;
  actualBox?: Rect;
}
class Box implements Rect {
  containerWidth: number;
  containerHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  instance: Konva.Shape | Konva.Group;
  needClear: (() => void)[];
  constructor(config: Config) {
    Object.assign(this, config);
    this.needClear = [];
    this.setContainer();
    if (config.instance) {
      this.initInstance(config.instance);
      this.initX(config.x);
      this.initY(config.y);
      this.initWidth(config.width);
      this.initHeight(config.height);
    }
  }
  addToLayer(layer: Konva.Layer) {
    layer.add(this.instance);
    layer.draw();
    layer.children.each((v) => {
      const target = v["_h2o"] as Box;
      if (target && target !== this) {
        if (haveIntersection(target, this)) {
          target.enter(this);
        }
      }
    });
  }
  dispose() {
    this.instance.destroy();
  }
  enter(v) {
    console.log("哎呀，进来了！");
  }
  leave(v) {
    console.log("别出去呀！");
  }
  setContainer(width?: number, height?: number) {
    if (!width || !height) {
      this.containerWidth = document.getElementById("container").clientWidth;
      this.containerHeight = document.getElementById("container").clientHeight;
      window.addEventListener("resize", () => {
        this.containerWidth = document.getElementById("container").clientWidth;
        this.containerHeight = document.getElementById(
          "container"
        ).clientHeight;
      });
    }
  }
  initInstance(instance: Config["instance"]) {
    this.instance = instance;
    this.instance.on("enter", (e) => this.enter?.(e.target));
    this.instance.on("leave", (e) => this.leave?.(e.target));
    this.instance.width(this.width);
    this.instance.height(this.height);
    this.instance.y(this.y);
    this.instance.draggable(true);
    this.instance.dragBoundFunc(({ x, y }) => {
      return {
        x: Math.max(0, Math.min(x, this.containerWidth - this.width)),
        y: Math.max(0, Math.min(y, this.containerHeight - this.height)),
      };
    });
    Object.assign(this.instance, { _h2o: this });
  }
  initX(x: number) {
    this.x = x;
    this.instance.x(x);
  }
  initY(y: number) {
    this.y = y;
    this.instance.y(y);
  }
  initWidth(width: number) {
    this.width = width;
    this.instance.width(width);
  }
  initHeight(height: number) {
    this.height = height;
    this.instance.height(height);
  }
}

export default Box;
