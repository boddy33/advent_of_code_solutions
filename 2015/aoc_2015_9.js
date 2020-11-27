'use strict';

const day = 9;
console.log(`Day ${day} - Advent Of Code 2015`);

const fs = require('fs');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${9}.txt`).toString().split("\r\n");

let distanceMap = [];
let citySet = new Set();

input.forEach(distanceDesc => {
    let distance = parseDistance(distanceDesc);
    distanceMap.push(distance);
    if (!citySet.has(distance.source)) citySet.add(distance.source);
    if (!citySet.has(distance.dest)) citySet.add(distance.dest);
});

let destPermutations = permute(Array.from(citySet));
let routeDistArray = destPermutations.map(permutation => {
    let currDistance = 0;
    for (let i = 0; i < permutation.length - 1; i++) {
        currDistance += distanceMap.filter(distance => {
            return (distance.source == permutation[i] && distance.dest == permutation[i + 1])
                || (distance.dest == permutation[i] && distance.source == permutation[i + 1]);
        })[0].dist;
    }
    //console.log(permutation, currDistance);
    return currDistance;
});

console.log('ANSWER 1', Math.min(...routeDistArray));
console.log('ANSWER 2', Math.max(...routeDistArray));

function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;
  
    while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        result.push(permutation.slice());
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return result;
}

function parseDistance(distanceDesc) {
    let distance = {};
    let arr = distanceDesc.split(' ');
    distance.source = arr[0];
    distance.dest = arr[2];
    distance.dist = +arr[4];
    return distance;
}