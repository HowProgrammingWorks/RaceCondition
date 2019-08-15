'use strict';

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const add = (x, dx) => new Promise(resolve => {
  setTimeout(() => {
    resolve(x + dx);
  }, random(20, 100));
});

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lock = false;
    this.queue = [];
  }

  async move(dx, dy) {
    await this.enter();
    this.x = await add(this.x, dx);
    this.y = await add(this.y, dy);
    this.leave();
  }

  enter() {
    return new Promise(resolve => {
      if (!this.lock) {
        this.lock = true;
        resolve();
        return;
      }
      this.queue.push(resolve);
    });
  }

  leave() {
    this.lock = false;
    const next = this.queue.pop();
    if (next) next();
  }
}

// Usage

const p1 = new Point(10, 10);
console.log(p1);

p1.move(5, 5);
p1.move(6, 6);
p1.move(7, 7);
p1.move(8, 8);

setTimeout(() => {
  console.dir(p1);
}, 1000);
