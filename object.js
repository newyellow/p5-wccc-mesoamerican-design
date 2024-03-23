class NYColor {
    constructor(_h, _s, _b, _a = 1.0) {
        this.h = _h;
        this.s = _s;
        this.b = _b;
        this.a = _a;
    }

    copy() {
        return new NYColor(this.h, this.s, this.b, this.a);
    }

    slightRandomize(_hDiff = 10, _sDiff = 12, _bDiff = 12, _aDiff = 0.0) {
        this.h += random(-0.5 * _hDiff, 0.5 * _hDiff);
        this.s += random(-0.5 * _sDiff, 0.5 * _sDiff);
        this.b += random(-0.5 * _bDiff, 0.5 * _bDiff);
        this.a += random(-0.5 * _aDiff, 0.5 * _aDiff);

        this.h = processHue(this.h);
    }

    color() {
        return color(this.h, this.s, this.b, this.a);
    }

    static newRandomColor(_mainHue) {
        let h = processHue(_mainHue + random(-80, 80));
        let s = random(40, 100);
        let b = random(60, 100);

        return new NYColor(h, s, b);
    }
}


class NYPoint {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}

class Walker {
    constructor(_x, _y, _direction = 0) {
        this.pos = new NYPoint(_x, _y);
        this.direction = _direction;

        this.moveSpeed = 1;
        this.turnLerpValue = 0.4;

        this.targets = null;
    }

    setTarget(_targetPoint) {
        this.target = _targetPoint;

        console.log("set new target");
        console.log(`${this.target.x}, ${this.target.y}`);
        stroke('red');
        noFill();
        ellipse(this.target.x, this.target.y, 10, 10);
    }

    moveStep() {
        // turn a bit
        let newDir = getAngle(this.pos.x, this.pos.y, this.target.x, this.target.y);
        newDir = (newDir + 360) % 360;
        this.direction = NYLerpAngle(this.direction, newDir, this.turnLerpValue);

        let stepX = sin(radians(this.direction)) * this.moveSpeed;
        let stepY = -cos(radians(this.direction)) * this.moveSpeed;

        this.pos.x += stepX;
        this.pos.y += stepY;

        noStroke();
        fill('white');
        ellipse(this.pos.x, this.pos.y, 5, 5);

        if (dist(this.pos.x, this.pos.y, this.target.x, this.target.y) < 6) {
            return true;
        }
        else {
            return false;
        }
    }

    display() {
        fill(this.color.color());
        noStroke();
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }
}