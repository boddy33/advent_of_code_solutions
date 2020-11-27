'use strict';
var md5 = require('md5');
console.log('Day 4 - Advent Of Code 2015');

const input = 'iwrupvqb';
let num = 0;
console.log('iterating until', Number.MAX_SAFE_INTEGER);

while (true) {
    num++;
    let hash = md5(input + num);
    //console.log('hash for', num, 'is', hash);
    if (num % 10000 == 0) {
        console.log('calculated', num, 'hashes');
    }
    if(hash.startsWith('000000') || num == Number.MAX_SAFE_INTEGER) {
        break;
    }
}
console.log('1 AdventCoin mined:', num);