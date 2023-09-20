'use strict';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const locks = new Set();

const marcus = { name: 'Marcus', born: 121 };

const client = new Proxy(marcus, {
  get(obj, key) {
    return obj[key];
  },
  set(obj, key, val) {
    if (locks.has(obj)) return true;
    obj[key] = val;
    return true;
  }
});

const check = async () => {
  locks.add(marcus);
  if (client.born !== 121) return;
  await sleep(100);
  console.log('Marcus detected');
  console.log(client);
  locks.delete(marcus);
};

setTimeout(() => {
  client.name = 'Timur';
  client.born = 1980;
}, 50);

setTimeout(() => {
  client.name = 'Lucius';
  client.born = 130;
}, 200);

check();

setTimeout(() => {
  console.log(client);
}, 250);
