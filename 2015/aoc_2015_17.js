'use strict';

const day = 17;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  
*/
const fs = require('fs');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString().split('\r\n');
//console.log('input', input);
let liters = 150;
let containers = input.map(container => +container);
let subset = generatePowerSet(containers)
let minimum = subset.reduce((minimum, container) => {
    if (container.reduce((a, b) => a + b, 0) == liters) {
        if (container.length < minimum) {
            minimum = container.length;
        }
    }
    return minimum;
}, 999);
let answer = subset.reduce((counter, container) => {
    if (container.length == minimum && container.reduce((a, b) => a + b, 0) == liters) {
        counter++;
    }
    return counter;
}, 0);

function generatePowerSet(array) {
    var result = [];
    result.push([]);
  
    for (var i = 1; i < (1 << array.length); i++) {
      var subset = [];
      for (var j = 0; j < array.length; j++)
        if (i & (1 << j))
          subset.push(array[j]);
  
      result.push(subset);
    }
  
    return result;
  }

console.log(' ');
console.log('ANSWER: ', answer);