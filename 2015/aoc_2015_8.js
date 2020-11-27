'use strict';

console.log('Day 8 - Advent Of Code 2015');

const fs = require('fs');
const input = fs.readFileSync('D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_8.txt').toString().split("\r\n");
/*
    \\ -> \
    \" -> "
    \xFF -> ASCII char
    TOTAL = num in code MINUS num in memory
*/

let codeCounter = 0;
let memoryCounter = 0;

input.forEach(str => {
    //debug
    if (!str[0] == '"'|| !str[str.length - 1] == '"') throw Error('malformed string');
    //
    let currCodeCounter = str.length;
    //removing leading and trailing "
    str = str.substr(1, str.length - 2);
    codeCounter += currCodeCounter;
    // MINUS double quotes
    let currMemoryCounter = currCodeCounter - 2;
    // MINUS 1 for each occurence of \\
    currMemoryCounter -= (str.match(/\\\\/g) || []).length;
    // MINUS 1 for each occurence of \"
    currMemoryCounter -= (str.match(/\\\"/g) || []).length;
    // MINUS 3 for each hex code
    currMemoryCounter -= (str.match(/\\x[0-9a-f]{2}/g) || []).length * 3;
    memoryCounter += currMemoryCounter;
    console.log('string[', str, '] codeCounter:', currCodeCounter, 'memory counter:', currMemoryCounter);
})
// 1378 too high => difference is lower => memory count is HIGHER => optimizing TOO MUCH => 1371
console.log('ANSWER:', codeCounter, '-', memoryCounter, '=', codeCounter - memoryCounter);
console.log('\n\n\n')
/*
    PART 2
    "" encodes to "\"\""
    "abc" encodes to "\"abc\""
    "aaa\"aaa" encodes to "\"aaa\\\"aaa\""
    "\x27" encodes to "\"\\x27\""
    total = new length - original length
    42 - 23 = 19
*/

let oldCodeCounter = 0;
let newCodeCounter = 0;

input.forEach(str => {
    let currOldCodeCounter = str.length;
    oldCodeCounter += currOldCodeCounter;
    // +2 for quotes
    let currNewCodeCounter = currOldCodeCounter + 2;
    // +1 for every original quote
    currNewCodeCounter += (str.match(/"/g)||[]).length;
    // +1 for every original \
    currNewCodeCounter += (str.match(/\\/g)||[]).length;

    newCodeCounter += currNewCodeCounter;
    console.log(str, currOldCodeCounter, '=>', currNewCodeCounter);
});

console.log('ANSWER:', newCodeCounter, '-', oldCodeCounter, '=', newCodeCounter - oldCodeCounter);