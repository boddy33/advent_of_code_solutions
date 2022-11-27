'use strict';

console.log('Day 5 - Advent Of Code 2015');

const fs = require('fs');
const input = fs.readFileSync('D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_5.txt').toString().split("\r\n");

let accum = input.reduce((accum, next) => {
    return accum += classifyNew(next) ? 1 : 0;
}, 0);

console.log('nice strings:', accum, 'out of', input.length);

//
//- It contains a pair of any two letters that appears at least twice in the string without overlapping, 
//  like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
//
//- It contains at least one letter which repeats with exactly one letter between them, 
//  like xyx, abcdefeghi (efe), or even aaa.
//
function classifyNew(str) {
    let letterPairRepeats = false;
    let letterBetweenRepeats = false;
    if (str.length >= 4) {
        console.log('looking for repeating pair of:', str);
        for (let i = 0; i < str.length - 2; i++) {
            let currPair = str.substr(i, 2);
            console.log('current pair:', currPair);
            if (str.substr(i + 2).indexOf(currPair) != -1) {
                console.log('occurence found');
                letterPairRepeats = true;
                break;
            }
        }
    }
    if (str.length >= 3) {
        console.log('looking for letter in between same latter for:', str);
        let prevPrevChar = '';
        let prevChar = '';
        [...str].forEach(char => {
            if (prevPrevChar == char) {
                console.log('found combination of chars:', prevPrevChar + prevChar + char);
                letterBetweenRepeats = true;
            }
            prevPrevChar = prevChar;
            prevChar = char;
        });
    }
    
    return letterPairRepeats && letterBetweenRepeats;
}

function classify(str) {
    let vowelCount = 0;
    let doubleAppear = false;
    let forbiddenAppear = false;
    let strArray = [...str];
    let forbiddenArray = ['ab', 'cd', 'pq', 'xy'];
    let prevChar = '';
    strArray.forEach(char => {
        if ('aeiou'.indexOf(char) != -1) { 
            vowelCount++;
        }
        if (prevChar == char) {
            doubleAppear = true;
        }
        if (forbiddenArray.indexOf(prevChar + char) != -1) {
            forbiddenAppear = true;
        }
        
        prevChar = char;
    });

    return vowelCount >= 3 && doubleAppear && !forbiddenAppear;
}