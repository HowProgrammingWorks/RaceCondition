'use strict';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const client = { name: 'Marcus', born: 121 };

const check = async () => {
  if (client.born !== 121) return;
  await sleep(100);
  console.log('Marcus detected');
  console.log(client);
};

setTimeout(() => {
  client.name = 'Timur';
  client.born = 1980;
}, 50);

check();
