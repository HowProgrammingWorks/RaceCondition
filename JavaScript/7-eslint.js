'use strict';

const f = async obj => obj.x;

const g = async obj => {
  obj.x += await f(obj);
};

g({ x: 1 });
