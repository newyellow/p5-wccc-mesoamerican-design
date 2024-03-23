
let dots = [];

async function setup() {
  createCanvas(800, 1000);
  background(0);
  colorMode(HSB);

  patternRect(300, 300, 200, 400);

}

async function patternRect(_x, _y, _width, _height, _frameThickness = 20) {
  stroke('white');
  noFill();
  rect(_x, _y, _width, _height);

  let dotSize = 50;
  let blockSize = 20;
  let xCount = (_width - 2 * _frameThickness) / blockSize;
  let yCount = (_height - 2 * _frameThickness) / blockSize;

  for (let i = 0; i < dotSize; i++) {
    let newX = int(random(xCount)) * blockSize + _x + _frameThickness;
    let newY = int(random(yCount)) * blockSize + _y + _frameThickness;

    dots[i] = new NYPoint(newX, newY);
  }


  for (let i = 0; i < dots.length; i++) {
    fill(255);
    noStroke();
    ellipse(dots[i].x, dots[i].y, 2, 2);
    await sleep(30);
  }

  let walkers = [];
  walkers.push(new Walker(_x, _y + _height / 2, 0));
  walkers.push(new Walker(_x + _width / 2, _y, 90));
  walkers.push(new Walker(_x + _width, _y + _height / 2, 180));
  walkers.push(new Walker(_x + _width / 2, _y + _height, 270));

  for (let i = 0; i < walkers.length; i++) {
    let nowWalker = walkers[i];

    let newTarget = popClosestDot(nowWalker.pos.x, nowWalker.pos.y);
    nowWalker.setTarget(newTarget);
  }

  // draw through dots
  while (true) {
    for (let i = 0; i < walkers.length; i++) {
      let nowWalker = walkers[i];

      if (nowWalker.moveStep()) {
        if (dots.length == 0)
          break;

        let newTarget = popClosestDot(nowWalker.pos.x, nowWalker.pos.y);
        nowWalker.setTarget(newTarget);
      }
    }


    await sleep(30);
  }

}

function popClosestDot(_x, _y) {
  if (dots.length == 0) return null;
  else if (dots.length == 1) return dots.pop();

  let closestDot = dots[0];
  let closestDist = dist(_x, _y, dots[0].x, dots[0].y);

  for (let i = 0; i < dots.length; i++) {
    let d = dist(_x, _y, dots[i].x, dots[i].y);

    if (d < closestDist) {
      closestDist = d;
      closestDot = dots[i];
    }
  }

  dots.splice(dots.indexOf(closestDot), 1);
  return closestDot;
}

// async sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}