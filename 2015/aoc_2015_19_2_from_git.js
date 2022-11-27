'use strict';

const day = 19;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  
*/
const fs = require('fs');
const INPUT = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`, 'utf-8');
const REPLACEMENTS = INPUT.split('\r\n\r\n')[0].split('\r\n').reduce((map, r) => map.set(r.split(' => ')[1], r.split(' => ')[0]), new Map());

let MOLECULE = INPUT.split('\r\n\r\n')[1];
let count = 0;

while (MOLECULE !== 'e') {
  const randomMolecule = Array.from(REPLACEMENTS.keys())[Math.round(Math.random() * REPLACEMENTS.size)];

  MOLECULE = MOLECULE.replace(randomMolecule, match => {
    count++;
    return REPLACEMENTS.get(match);
  });
}

console.log(`${MOLECULE} -> ${count}`);