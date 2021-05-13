export class Particle {
  x;
  y;
  vx;
  vy;
  size;
  img;
  alpha;
  constructor({ x, y, vx, vy, size, img }) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.img = img;
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
  render(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.scale(this.size, this.size);
    ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
    ctx.restore();
  }
}
