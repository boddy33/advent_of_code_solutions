'use strict';
//const { dir } = require('console');
const fs = require('fs');

console.log('Day 3 - Advent Of Code 2015');

const input = fs.readFileSync('D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_3.txt').toString();
const instruct = Array.from(input);
//[x, y]
let currPosSanta = [0, 0];
let currPosRoboSanta = [0, 0];
let deliveryMap = new Map();
deliveryMap.set([0, 0], 2);
let santaTurn = true;
instruct.forEach(currInstruct => {
    let currPos = santaTurn ? currPosSanta : currPosRoboSanta;
    //console.log(`santa turn: ${santaTurn}`);
    //console.log(`current map size: ${deliveryMap.size}`);
    //console.log(`current position: ${currPos.toString()}, instruction: ${currInstruct}`);
    currPos = updateCurrPos(currPos, currInstruct);
    //console.log(`updated position: ${currPos.toString()}`);
    let currPosExists = false;

    deliveryMap.forEach((value, pos, map) => {
        if (!currPosExists && pos[0] == currPos[0] && pos[1] == currPos[1]) {
            //console.log(`already visited this house, incrementing value`);
            //pos already exists, overwrite
            currPosExists = true;
            map.set(pos, ++value);
        }
    });
    if (!currPosExists) {
        //console.log(`adding new house to the map`);
        deliveryMap.set([...currPos], 1);
    }
    santaTurn = !santaTurn;
});

console.log(deliveryMap.size);

function updateCurrPos (currPos, instruct) {

    switch (instruct) {
        case '<':
            currPos[0] += -1;
            break;
        case '>':
            currPos[0] += 1;
            break;
        case '^':
            currPos[1] += 1;
            break;
        case 'v':
            currPos[1] += -1;
            break;
    } 
    return currPos;
}