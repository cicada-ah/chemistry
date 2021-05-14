import Box from "./box";
import type { Config } from "./box";
import type Item from "./item";
import {
  drawLiquid,
  drawSolid,
  drawProduct,
  drawBubble,
  drawLabel,
} from "@/utils/utilsFunc";
import { postChemicalReact } from "@/subjects/http";
import { delay } from "rxjs/operators";
import type AlcoholBurner from "./alcoholBurner";

export interface ContainerConfig extends Config {
  name: string;
}

class Container extends Box {
  name: string;
  includes: Item[];
  includesDraw: [];
  condition: 1 | 2 | 3;
  constructor(config: ContainerConfig) {
    super(config);
    this.name = config.name;
    this.includes = [];
    this.includesDraw = [];
    this.condition = 1;
  }
  changeCondition(nextCondition: Container["condition"]) {
    if (nextCondition !== this.condition) {
      this.condition = nextCondition;
      this.reaction();
    }
  }
  reaction() {
    const reqParmas: {
      condType: number;
      reactors: Array<string>;
    } = {
      condType: this.condition,
      reactors: [],
    };
    this.includes?.forEach((item) => {
      reqParmas.reactors.push(item.name);
    });
    postChemicalReact(reqParmas)
      .pipe(delay(1000))
      .subscribe((res) => {
        if (res.success && res.reactResp.length) {
          // clearn container
          this.includesDraw?.forEach((item: any) => {
            item.destroy();
          });
          this.includesDraw = [];
          this.includes = [];
          // draw new chemRes
          drawProduct(this, res.reactResp);
          drawLabel(this, res.reactResp);
          this.instance.draw();
        }
      });
  }
  enter(v: AlcoholBurner) {
    if (v.lampType) {
      v.lampType === "high" ? this.changeCondition(2) : this.changeCondition(3);
    } else if (v["_h2o"]?.lmapType !== undefined) {
      switch (v["_h2o"]?.lmapType) {
        case "high":
          this.changeCondition(2);
          break;

        default:
          this.changeCondition(3);
          break;
      }
    }
  }

  leave(v: AlcoholBurner) {
    this.changeCondition(1);
  }
  addItem(item: Item) {
    switch (item.attribute) {
      case "liquid":
        drawLiquid(this, item);
        break;
      case "solid":
        drawSolid(this, item);
        break;
      case "gas":
        drawBubble(this, item);
        break;
    }
    this.includes.push(item);
    this.includes.length >= 2 && this.reaction();
  }
}

export default Container;
