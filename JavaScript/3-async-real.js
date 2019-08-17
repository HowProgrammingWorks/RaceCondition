'use strict';

const fs = require('fs').promises;

// Implementation

const warehouse = {
  shipped: 0,

  async ship(product, quantity) {
    console.log(`Request ${quantity} ${product}`);
    const fileName = `./data/${product}.json`;
    const json = await fs.readFile(fileName, 'utf8');
    const record = JSON.parse(json);
    const balance = record.quantity - quantity;
    if (balance <= 0) {
      console.log(`Can't ship ${quantity} ${product}`);
      return false;
    }
    record.quantity = balance;
    this.shipped += quantity;
    const result = JSON.stringify(record);
    await fs.writeFile(fileName, result);
    console.log(`Shipped ${quantity} ${product}`);
    console.log(`Shipped total: ${this.shipped}; Balance: ${balance}`);
    return true;
  }
};

// Usage

warehouse.ship('glass', 20);
warehouse.ship('glass', 10);
warehouse.ship('glass', 20);
warehouse.ship('glass', 20);
warehouse.ship('glass', 70);
warehouse.ship('glass', 10);
warehouse.ship('glass', 50);
warehouse.ship('glass', 10);
