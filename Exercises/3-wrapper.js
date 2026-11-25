'use strict';

const contract =
  (fn, ...types) =>
  (...args) => {
    const names = types.map((t) => t.name);
    const check = (v, n, i) => {
      if (v?.constructor?.name !== n) {
        throw new TypeError(`${i} expected: ${n}`);
      }
    };
    args.forEach((a, i) => check(a, names[i], `Argument ${i}`));
    const r = fn(...args);
    check(r, names.at(-1), 'Result');
    return r;
  };
const add = (a, b) => a + b;
const addNumbers = contract(add, Number, Number, Number);
const res = addNumbers(2, 3);
console.dir(res);
module.exports = { contract };
