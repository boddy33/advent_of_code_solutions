const fs = require('fs');

console.log('Day 2 - Advent Of Code 2015');

const input = fs.readFileSync('D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_2.txt').toString().split("\r\n");
let counter = 0;
let ribbonAccum = 0;
let accum = input.reduce((accum, next) => {
    let dim = next.split('x');
    let sides = [dim[0] * dim[1], dim[0] * dim[2], dim[1] * dim[2]];
    let minSide = Math.min(...sides);
    let perimeters = [(+dim[0] + +dim[1]) * 2, (+dim[0] + +dim[2]) * 2, (+dim[1] + +dim[2]) * 2];
    let minPerimeter = Math.min(...perimeters);
    //paper
    accum += sides.reduce((a, b) => a + b, 0) * 2 + minSide;
    //ribbon
    let ribbonBow = dim[0] * dim[1] * dim[2];
    //debug
    counter++;
    if (counter == 1) {
        console.log(`dimensions: ${next} result: ${accum}`);
        console.log(`minPerimeter: ${minPerimeter} ribbonBow: ${ribbonBow}`);
    }
    //
    ribbonAccum += minPerimeter + ribbonBow;
    return accum;
}, 0);

console.log(`total gifts: ${counter} total paper needed: ${accum} total ribbon needed: ${ribbonAccum}`);