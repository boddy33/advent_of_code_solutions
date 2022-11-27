'use strict';

const day = 12;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  
*/
const fs = require('fs');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString();
let document = JSON.parse(input);

let sum = getSum(document);

function getSum(document) {
    if (Number.isInteger(document)) {
        return document;
    } else if(Array.isArray(document)) {
        return document.reduce((accum, next) => accum + getSum(next), 0);
    } else if(typeof document == 'string') {
        return 0;
    } else if(typeof document == 'object') {
        //"red" check
        let redExists = Object.values(document).reduce((accum, next) => {
            if (next == 'red' && !(next === 'red')) {
                console.log('tricky next', next);
            }
            return accum || next === 'red';
        }, false);
        if (redExists) {
            return 0;
        } else {
            return Object.values(document).reduce((accum, next) => accum + getSum(next), 0);
        }
    } else {
        throw new Error ('unknown document type ' + (typeof document));
    }
}
//96566 too low, MEANS filtering TOO MUCH -> 96852
console.log('ANSWER: ', sum);