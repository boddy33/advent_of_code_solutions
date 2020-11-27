'use strict';

const day = 25;
console.log(`Day ${day} - Advent Of Code 2015`);
const { count } = require('console');
/*
  
*/
const fs = require('fs');
const input = 'To continue, please consult the code grid in the manual.  Enter the code at row 2981, column 3075.'
let code11 = 20151125;
let prevMultBy = 252533;
let keepRemainderFromDiv = 33554393;
let codeRow = 2981;
let codeCol = 3075;
let diagonalsToGenerate = codeCol + codeRow - 1;
let codeMatrix = 
  new Array(diagonalsToGenerate + 1).fill(0).map(() => new Array(diagonalsToGenerate + 1).fill(0));
codeMatrix[1][1] = 20151125;
let prevValue = 20151125;
let codesInDiagonal = 2;
for (let d = 2; d <= diagonalsToGenerate; d++) {
  let row = d;
  for (let col = 1; col <= codesInDiagonal; col++) {
    codeMatrix[row][col] = (prevValue * prevMultBy) % keepRemainderFromDiv;
    prevValue = codeMatrix[row][col];
    row--;
  }
  codesInDiagonal++;
}

console.log();
console.log(codeMatrix[2981][3075]);