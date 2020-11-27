const fs = require('fs');

console.log('Day 1 - Advent Of Code 2015');

const initFloor = 0;
const commands = fs.readFileSync('./aoc_2015_1.txt').toString();
//console.log(commands);

console.time('calcFinalFloor');
let finalFloor = calcFinalFloor(initFloor, commands);
console.timeEnd('calcFinalFloor');
console.log('final floor: ' + finalFloor);

console.time('posFirstBasement');
let firstBasementPos = posFirstBasement(initFloor, commands);
console.timeEnd('posFirstBasement');
console.log('first basement occurence: ' + firstBasementPos);

function calcFinalFloor(initFloor, commands) {
    //REDUCE will run faster
    return initFloor 
        + Array.from(commands).filter(c => Number(c == '(')).length
        - Array.from(commands).filter(c => Number(c == ')')).length;
}

function posFirstBasement(currFloor, commands) {
    let pos = 0
    let commandsArray = Array.from(commands);
    //SOME() allows to stop iteration
    for(let i = 0; i < commandsArray.length; i++) {
        currFloor += commandsArray[i] == '(' ? 1 : -1;
        //console.log('after iteration', i, ' floor ',currFloor);
        if (currFloor < 0) {
            pos = ++i;
            break;
        }
    }
    return pos;
}
