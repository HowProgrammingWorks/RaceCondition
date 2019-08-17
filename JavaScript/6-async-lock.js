'use strict';

const fs = require('fs').promises;

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

// Implementation

const warehouse = {
  shipped: 0,
  lock: new Lock(),

  async ship(product, quantity) {
    await this.lock.enter();
    console.log(`Request ${quantity} ${product}`);
    const fileName = `./data/${product}.json`;
    const json = await fs.readFile(fileName, 'utf8');
    const record = JSON.parse(json);
    const balance = record.quantity - quantity;
    if (balance <= 0) {
      console.log(`Can't ship ${quantity} ${product}`);
      this.lock.leave();
      return false;
    }
    record.quantity = balance;
    this.shipped += quantity;
    const result = JSON.stringify(record);
    await fs.writeFile(fileName, result);
    console.log(`Shipped ${quantity} ${product}`);
    console.log(`Shipped total: ${this.shipped}; Balance: ${balance}`);
    this.lock.leave();
    return true;
  }
};

// Usage

(async () => {
  await warehouse.ship('glass', 20);
})();

(async () => {
  await warehouse.ship('glass', 10);
})();

(async () => {
  await warehouse.ship('glass', 20);
})();

(async () => {
  await warehouse.ship('glass', 20);
})();

(async () => {
  await warehouse.ship('glass', 70);
})();

(async () => {
  await warehouse.ship('glass', 10);
})();

(async () => {
  await warehouse.ship('glass', 50);
})();

(async () => {
  await warehouse.ship('glass', 10);
})();
