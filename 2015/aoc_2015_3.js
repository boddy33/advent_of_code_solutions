'use strict';
//const { dir } = require('console');
const fs = require('fs');

console.log('Day 3 - Advent Of Code 2015');

const input = fs.readFileSync('D:\\ForYourFile\\file.txt').toString();
const instruct = Array.from(input);
//[x, y]
let currPosSanta = [0, 0];
//let currPosRoboSanta = [0, 0];
let deliveryMap = new Map();
deliveryMap.set([0, 0], 1);
//let santaTurn = true;
instruct.forEach(currInstruct => {
    currPosSanta = updateCurrPos(currPosSanta, currInstruct);
    let currPosExists = false;

    deliveryMap.forEach((value, pos, map) => {
        if (!currPosExists && pos[0] == currPosSanta[0] && pos[1] == currPosSanta[1]) {
            currPosExists = true;
            map.set(pos, ++value);
        }
    });
    if (!currPosExists) {
        //console.log(`adding new house to the map`);
        deliveryMap.set([...currPosSanta], 1);
    }
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