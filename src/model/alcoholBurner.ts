import Box from "./box";
import type { Config } from "./box";
import { Particle } from "./particle";
import { Konva } from "../Konva";

export interface AlcoholBurnerConfig extends Config {
  status: "burned" | "extinct";
  lampType: "normal" | "high";
  src: string;
}
export default class AlcoholBurner extends Box {
  status: "burned" | "extinct";
  private _particles: Particle[];
  private _particlesCount: number;
  private _fileInstance: Konva.Group;
  private _timeoutId: number;
  lampType: "normal" | "high";
  constructor(config: AlcoholBurnerConfig) {
    super(config);
    this.status = config.status;
    this.lampType = config.lampType;
    this._particles = [];
    this._particlesCount = 200;
    this._fileInstance = new Konva.Group();
    const instance = new Konva.Group();
    instance.add(this._fileInstance);
    Konva.Image.fromURL(config.src, (image: Konva.Image) => {
      image.width(config.width * 0.8);
      image.height(config.height * 0.8);
      image.y(30);
      image.x(-2);
      instance.add(image);
    });
    this.initInstance(instance);
    this.initX(config.x);
    this.initY(config.y);
    this.initWidth(config.width);
    this.initHeight(config.height);
  }
  burn(layer: Konva.Layer) {
    this.status = "burned";
    this._createParticles(layer);
    this._timeoutId = setInterval(() => this._createParticles(layer), 60);
  }

  extinct(layer: Konva.Layer) {
    this.status = "extinct";
    clearInterval(this._timeoutId);
    this._particles = [];
    this._fileInstance.remove();
    this._fileInstance = new Konva.Group();
    (this.instance as Konva.Group).add(this._fileInstance);
    layer.draw();
  }

  addToLayer(layer: Konva.Layer) {
    if (this.status === "burned") {
      this.burn(layer);
    }
    super.addToLayer(layer);
  }

  private _createParticles(layer: Konva.Layer) {
    if (this._particles.length < this._particlesCount) {
      const particle = new Particle(
        100,
        100,
        50,
        50,
        Math.random() - 0.5,
        Math.random() * -10,
        Math.random() * 1.5
      );
      particle.create({ lampType: this.lampType });
      this._particles.push(particle);
      this._fileInstance.add(particle.instance);
    }
    this._particles.forEach((particle) => {
      particle.update({
        mouse: {
          x: 100,
          y: 100,
          tx: 50,
          ty: 50,
        },
        W: 100,
        H: 100,
      });
      particle.render();
    });
    layer.draw();
  }
}
