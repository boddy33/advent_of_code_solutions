'use strict';

const day = 18;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  
*/
const fs = require('fs');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString().split('\r\n');
let gridSize = input.length;
let steps = 100;
let grid = new Array(gridSize).fill(0);
grid = grid.map(x => {
    return new Array(gridSize).fill(0);
})
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        grid[i][j] = input[i][j] == '#' ? 1 : 0;
    }
}
grid[0][0] = 1;
grid[0][gridSize - 1] = 1;
grid[gridSize - 1][0] = 1;
grid[gridSize - 1][gridSize - 1] = 1;
/*
The state a light should have next is based on its current state (on or off) 
plus the number of neighbors that are on:

A light which is on stays on when 2 or 3 neighbors are on, and turns off otherwise.
A light which is off turns on if exactly 3 neighbors are on, and stays off otherwise.
All of the lights update simultaneously; they all consider the same current state before moving to the next.

Part 2
four lights, one in each corner, are stuck on and can't be turned off.
*/
let prevStepGrid = grid;
for (let s = 1; s <= steps; s++) {
    console.log('step', s);
    let stepGrid = JSON.parse(JSON.stringify(prevStepGrid));
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let number = getTotalNumber(i, j, prevStepGrid);
            if (stepGrid[i][j] == 1 && number != 2 && number != 3) {
                //part 2
                if (!(i == 0 && j == 0) && !(i == (gridSize - 1) && j == 0) &&
                    !(i == 0 && j == (gridSize - 1)) && !(i == (gridSize - 1) && (j == (gridSize - 1))))
                stepGrid[i][j] = 0;
            }
            if (stepGrid[i][j] == 0 && number == 3) {
                stepGrid[i][j] = 1;
            }
        }
    }
    prevStepGrid = stepGrid;
}

function getTotalNumber(i, j, prevStepGrid) {
    let number = 0;
    number += lightExists(i - 1, j - 1) ? prevStepGrid[i - 1][j - 1] : 0;
    number += lightExists(i, j - 1) ? prevStepGrid[i][j - 1] : 0;
    number += lightExists(i + 1, j - 1) ? prevStepGrid[i + 1][j - 1] : 0;
    number += lightExists(i - 1, j) ? prevStepGrid[i - 1][j] : 0;
    number += lightExists(i + 1, j) ? prevStepGrid[i + 1][j] : 0;
    number += lightExists(i - 1, j + 1) ? prevStepGrid[i - 1][j + 1] : 0;
    number += lightExists(i, j + 1) ? prevStepGrid[i][j + 1] : 0;
    number += lightExists(i + 1, j + 1) ? prevStepGrid[i + 1][j + 1] : 0;
    return number;
}

function lightExists(i, j) {
    if (i < 0 || j < 0) return false;
    if (i >= gridSize || j >= gridSize) return false;
    return true;
}

//how many lights are on after 100 steps?
let answer = prevStepGrid.reduce((totalSum, column) => {
    return totalSum + column.reduce((sum, light) => {
        return sum + light;
    }, 0);
}, 0);
//your answer is too high
console.log(' ');
console.log('ANSWER: ', answer);