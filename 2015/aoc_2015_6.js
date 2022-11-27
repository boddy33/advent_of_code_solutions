'use strict';

console.log('Day 6 - Advent Of Code 2015');

//const { count } = require('console');
const fs = require('fs');
const input = fs.readFileSync('D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_6.txt').toString().split("\r\n");
let xDim = 1000;
let yDim = 1000;
let grid = new Array(xDim).fill(0);
grid = grid.map(x => {
    return new Array(yDim).fill(0);
})

let counter = 0;

input.forEach(commandString => {
    let command = parseCommand(commandString);
    console.log('action (turn on: 1, toggle: 0, turn off: -1):', command.action);
    console.log('box X from..to', command.xFrom, command.xTo);
    console.log('box Y from..to', command.yFrom, command.yTo);
    for(let x = command.xFrom; x <= command.xTo; x++) {
        for(let y = command.yFrom; y <= command.yTo; y++) {
            /*
                1 - increase the brightness of those lights by 1
               -1 - decrease the brightness of those lights by 1, to a minimum of zero.
                0 - increase the brightness of those lights by 2.
            */
            switch (command.action) {
                case -1:
                    grid[x][y]--;
                    if (grid[x][y] < 0) grid[x][y] = 0;
                    break;
                case 1: 
                    grid[x][y]++;
                    break;
                default:
                    grid[x][y] += 2;
            }
            counter++;
        }
    }
});

function parseCommand(commandString) {
    let command = {
        action: -2,
        xFrom: -1,
        xTo: -1,
        yFrom: -1,
        yTo: -1
    }
    //console.log(commandString);
    if (commandString.startsWith('turn on')) {
        command.action = 1;
        commandString = commandString.substr('turn on'.length + 1);
    } else if (commandString.startsWith('turn off')) {
        command.action = -1;
        commandString = commandString.substr('turn off'.length + 1);
    } else {
        command.action = 0;
        commandString = commandString.substr('toggle'.length + 1);
    }
    //console.log(commandString);
    command.xFrom = +commandString.split('through')[0].split(',')[0];
    command.xTo = +commandString.split('through')[1].split(',')[0];
    command.yFrom = +commandString.split('through')[0].split(',')[1];
    command.yTo = +commandString.split('through')[1].split(',')[1];
    return command;
}

let sum = grid.reduce((accumX, currX) => {
    return accumX + currX.reduce((accumY, currY) => {
        return accumY + currY;
    }, 0);
}, 0);

console.log('total affected:', counter, 'lights lit:', sum);
