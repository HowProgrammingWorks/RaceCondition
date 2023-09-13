const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const client = { name: 'Marcus', born: 121 };

setTimeout(() => {
  client.name = 'Timur';
  client.born = 1980;
}, 50);

if (client.born === 121) {
  await sleep(100);
  console.log('Marcus detected');
  console.log(client);
}
