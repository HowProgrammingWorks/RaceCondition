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
  }

  async move(dx, dy) {
    this.x = await add(this.x, dx);
    this.y = await add(this.y, dy);
  }
}

// Usage

const p1 = new Point(10, 10);
console.log(p1);

// Hint: Imagine that this 4 calls are from different places
// (different client requests, different timer events, etc.)
// so we can't just add await before each call, we need to protect point
p1.move(5, 5);
p1.move(6, 6);
p1.move(7, 7);
p1.move(8, 8);

setTimeout(() => {
  console.log(p1);
}, 1000);
