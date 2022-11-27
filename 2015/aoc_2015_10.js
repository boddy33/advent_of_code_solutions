'use strict';

const day = 10;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  1 becomes 11 (1 copy of digit 1).
  11 becomes 21 (2 copies of digit 1).
  21 becomes 1211 (one 2 followed by one 1).
  1211 becomes 111221 (one 1, one 2, and two 1s).
  111221 becomes 312211 (three 1s, two 2s, and one 1).
*/
let io = '1113122113';
const repeat = 50;

for (let i = 0; i < repeat; i++) {
  let newIo = '';
  let prevDigit = io[0];
  let lastSequenceLength = 1;
  for (let k = 1; k <= io.length; k++) {
    if (k == io.length) {
      //end of input
      newIo += lastSequenceLength + prevDigit;
    } else {
      if (io[k] == prevDigit) {
        lastSequenceLength++;
      } else {
        newIo += lastSequenceLength + prevDigit;
        prevDigit = io[k];
        lastSequenceLength = 1;
      }
    }
  }
  io = newIo;
  //console.log('io after iteration', i, ':', io);
}
console.log(' ');
console.log('ANSWER: ', io.length);