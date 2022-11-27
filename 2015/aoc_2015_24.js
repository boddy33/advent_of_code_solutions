'use strict';

const day = 24;
console.log(`Day ${day} - Advent Of Code 2015`);
const { count } = require('console');
/*
  
*/
const fs = require('fs');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString().split('\r\n');

let sum = 0;
let packages = input.map(pckg => {
    let int = Number(pckg);
    sum += int;
    return int;
});

let groupSize = sum / 4;

const getAllSubsets = 
      theArray => theArray.reduce(
        (subsets, value) => subsets.concat(
         subsets.map(set => [value,...set])
        ),
        [[]]
      );

// Generate all array subsets:
function* subsets(array, offset = 0) {
    while (offset < array.length) {
      let first = array[offset++];
      for (let subset of subsets(array, offset)) {
        subset.push(first);
        yield subset;
      }
    }
    yield [];
  }

let minCount = 99999;
let minQE = 99999;

for (let element of subsets(packages)) {
    let sum = element.reduce((acc, next) => {
        return acc + next;
    }, 0);
    if (sum == groupSize) {
        let qe = element.reduce((acc, next) => {
            return acc *= next;
        }, 1);

        if (element.length == minCount && qe < minQE) {
            console.log(element);
            minQE = qe;
            console.log('new min min qe', minQE);
        }
        if (element.length < minCount) {
            console.log(element);
            minCount = element.length;
            minQE = qe;
            console.log('new min length', minCount, 'new min qe', minQE);
        } 
    }
}
//139699414 too high
console.log();
console.log(minQE);