import Konva from "konva";
var colors = [
  ["rgba(101,219,255,1)", "rgba(101,219,255,.5)", "rgba(101,219,255,0)"],
  ["hsla(25, 70%, 50%, 1)", "hsla(35, 70%, 50%, 0.5)", "hsla(35, 70%, 50%, 0)"],
];
export class Particle {
  x;
  y;
  h;
  w;
  vx;
  vy;
  size;
  alpha;
  instance: Konva.Circle;
  constructor(x, y, vx, vy, w, h, size) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.w = w;
    this.h = h;
    this.alpha = Math.random();
  }
  update({ mouse, W, H }) {
    this.x += this.vx;
    this.y += this.vy;
    this.size *= 1;
    this.alpha *= 0.85;

    if (
      this.x < 0 ||
      this.x > W ||
      this.y < 0 ||
      this.y > H ||
      this.size < 0.001 ||
      this.alpha < 0.1
    ) {
      this.x = mouse.tx;
      this.y = mouse.ty;
      this.vx = Math.random() - 0.5;
      this.vy = Math.random() * -10;
      this.size = Math.random() * 0.5;
      this.alpha = Math.random();
    }
  }

  create() {
    const _this = this;
    const innerFlame = new Konva.Circle({
      x: _this.x,
      y: _this.y,
      width: _this.w,
      height: _this.h,
      radius: 50,
      opacity: _this.alpha,
      scale: { x: _this.size, y: _this.size },
      fillRadialGradientStartPoint: { x: 0, y: 0 },
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndPoint: { x: 0, y: 0 },
      fillRadialGradientEndRadius: 50,
      globalCompositeOperation: "lighter",
      fillRadialGradientColorStops: [
        0,
        colors[1][0],
        0.3,
        colors[1][1],
        1,
        colors[1][2],
      ],
    });
    _this.instance = innerFlame;
  }

  render() {
    const _this = this;
    const innerFlame = _this.instance;
    innerFlame.setAttrs({
      x: _this.x,
      y: _this.y,
      width: _this.w,
      height: _this.h,
      radius: 50,
      opacity: _this.alpha,
      scale: { x: _this.size, y: _this.size },
    });
  }
}
