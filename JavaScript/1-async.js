'use strict';

const add = (x, dx) => new Promise(resolve => {
  setTimeout(() => {
    resolve(x + dx);
  }, 100);
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

const p1 = new Point(10, 10);
console.log(p1);

(async () => {
  await p1.move(5, 5);
})();

(async () => {
  await p1.move(6, 6);
})();

(async () => {
  await p1.move(7, 7);
})();

(async () => {
  await p1.move(8, 8);
})();

setTimeout(() => {
  console.log(p1);
}, 300);
