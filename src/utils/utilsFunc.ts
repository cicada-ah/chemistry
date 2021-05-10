import Konva from "konva";
import type Item from "@/model/item";
import type Container from "@/model/container";

export function haveIntersection(r1, r2) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}

export function drawLiquid(container, item) {
  const { width, height } = container;

  const groupCludeImageLen = container.instance.children.length;
  const groupChildCount =
    5 - groupCludeImageLen <= 1 ? 1 : 5 - groupCludeImageLen;
  let A = 2,
    W = 1 / 2,
    Q = 0,
    H = (groupChildCount * height) / 5;
  // speed = -0.000001;
  var triangle = new Konva.Shape({
    x: 0,
    y: 0,
    sceneFunc: function (ctx, shape) {
      (function drawAnimation() {
        ctx.beginPath();
        ctx.moveTo(12, H);
        // Q += speed;
        for (let xm = 12; xm <= width - 9; xm++) {
          let ym = A * Math.sin(W * xm + Q) + H;
          ctx.lineTo(xm, ym);
        }
        ctx.stroke();
        ctx.lineTo(width - 9, height - 4);
        ctx.lineTo(12, height - 4);
        ctx.fill();
        ctx.closePath();
      })();

      // (!) Konva specific method, it is very important
      ctx.fillStrokeShape(shape);
    },
    fill: item.color,
    stroke: item.color,
    lineWidth: 1,
    strokeWidth: 1,
    opacity: 0.7,
  });
  container.instance.add(triangle);
}

export function drawSolid(container, item: Item) {
  const { width, height } = container;
  item.instance.opacity(0.7);
  item.instance.setPosition({ x: (2 * width) / 5, y: (6 * height) / 10 });
  container.instance.add(item.instance);
}

export function drawBubble(container) {
  const { width, height } = container;
  for (let i = 0; i < 15; i++) {
    let xRange = Math.min(width - 12, Math.random() * width);
    let circleX = xRange > 15 ? xRange : 15;
    const circle = new Konva.Circle({
      x: circleX,
      y: height - 5,
      radius: Math.random() * 3,
      fill: "#fff",
      opacity: 0.9,
      name: "shape-" + i,
    });
    container.instance.add(circle);
    const tween = new Konva.Tween({
      node: circle,
      duration: (Math.random() + 0.6) * 2,
      y: (Math.random() + 1) * 10,
      opacity: 0,
      onFinish: () => {
        circle.destroy();
      },
    });
    setTimeout(() => {
      tween.play();
    }, 100 * i);
  }
}
