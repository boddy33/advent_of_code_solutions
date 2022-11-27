'use strict';

const day = 19;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  
*/
const fs = require('fs');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString().split('\r\n');
let replacements = [];
let molecule = input[input.length - 1];
for (let i  = 0; i < input.length - 2; i++) {
    replacements.push([input[i].split(' => ')[0], input[i].split(' => ')[1]]);
}
let moleculeCalibrations = new Set();
//iterate over molecule
//for every element (A or Aa)
//apply all replacements
//save every calibration
let prevChar = molecule[0];
for (let i = 1; i < molecule.length; i++) {
    //if current char lower case, combine with prev, process replacement for combined chars
    if (isLowerCase(molecule[i])) {
        let element = prevChar + molecule[i];
        replacements.forEach(replacement => {
            if (replacement[0] == element) {
                moleculeCalibrations.add(molecule.slice(0, i - 1) + replacement[1] + molecule.slice(i + 1));
            }
        });
    } 
    //if current char upper case, and previous upper case, process replacement for prev char
    if (!isLowerCase(molecule[i]) && !isLowerCase(prevChar)) {
        let element = prevChar;
        replacements.forEach(replacement => {
            if (replacement[0] == element) {
                moleculeCalibrations.add(molecule.slice(0, i - 1) + replacement[1] + molecule.slice(i));
            }
        });
    }
    //if current char is last char and is uppercase, process it as well
    if ((i == molecule.length - 1) && !isLowerCase(molecule[i])) {
        let element = molecule[i];
        replacements.forEach(replacement => {
            if (replacement[0] == element) {
                moleculeCalibrations.add(molecule.slice(0, i) + replacement[1]);
            }
        });
    }  
    prevChar = molecule[i];
}

function isLowerCase(char) {
    return char == char.toLowerCase();
}

console.log(' ');
console.log('ANSWER: ', moleculeCalibrations.size);