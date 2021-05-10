import Konva from "konva";

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
  const groupChildCount =
    5 - container.instance.children.length <= 2
      ? 2
      : 5 - container.instance.children.length;
  console.log(Math.min(groupChildCount, 4));
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
  });
  container.instance.add(triangle);
}

export function drawSolid(container, item) {
    
}
