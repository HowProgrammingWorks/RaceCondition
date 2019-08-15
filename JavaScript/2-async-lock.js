'use strict';

// Lock

class Lock {
  constructor() {
    this.active = false;
    this.queue = [];
  }

  enter() {
    return new Promise(resolve => {
      const start = () => {
        this.active = true;
        resolve();
      };
      if (!this.active) {
        start();
        return;
      }
      this.queue.push(start);
    });
  }

  leave() {
    if (!this.active) return;
    this.active = false;
    const next = this.queue.pop();
    if (next) next();
  }
}

// Utils

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const add = (x, dx) => new Promise(resolve => {
  setTimeout(() => {
    resolve(x + dx);
  }, random(20, 100));
});

// Implementation

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lock = new Lock();
  }

  async move(dx, dy) {
    await this.lock.enter();
    this.x = await add(this.x, dx);
    this.y = await add(this.y, dy);
    this.lock.leave();
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
