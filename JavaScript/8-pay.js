'use strict';

const sleep = (timeout) => new Promise((res) => setTimeout(res, timeout));

const pay = async (from, to, amount) => {
  const { balance } = to;
  from.balance -= amount;
  await sleep(32);
  to.balance = balance + amount;
};

const marcus = { name: 'Marcus', balance: 1000 };
const lucius = { name: 'Lucius', balance: 1000 };

const report = () => console.log(marcus, lucius);

report();
pay(marcus, lucius, 150);
pay(lucius, marcus, 200);
pay(marcus, lucius, 250);
pay(lucius, marcus, 300);
pay(marcus, lucius, 350);
setTimeout(report, 1000);
