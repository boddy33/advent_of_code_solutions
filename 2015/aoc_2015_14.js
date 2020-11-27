'use strict';

const day = 14;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  
*/
const fs = require('fs');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString().split('\r\n');
let sprintDuration = 2503; // main puzzle: 2503
let deerSpecs = input.map(specLine => {
  let spec = {};
  let specArray = specLine.split(' ');
  spec.name = specArray[0];
  spec.speed = +specArray[3];
  spec.flyDuration = +specArray[6];
  spec.restDuration = +specArray[13];
  return spec;
});

let sprintPoints = new Array(deerSpecs.length).fill(0);
for (let i = 1; i <= sprintDuration; i++) {
  let sprintDistances = deerSpecs.map(spec => {
    let distance = 0;
    //how many full sycles fit into sprint?
    let fullCycles = Math.floor(i / (spec.flyDuration + spec.restDuration));
    let cycleRemainder = i % (spec.flyDuration + spec.restDuration);
    //what is the distance travelled?
    distance += spec.speed * spec.flyDuration * fullCycles;
    //is there any remainder?
    if (cycleRemainder > 0) {
      //will it cover fly stage completely?
      if (cycleRemainder >= spec.flyDuration) {
        distance += spec.speed * spec.flyDuration;
      } else {
        //add remainder kms to distance
        distance += spec.speed * cycleRemainder;
      }
    }
    return distance;
  });
  //awarding points
  let maxDistance = Math.max(...sprintDistances);
  for (let i = 0; i < sprintDistances.length; i++) {
    if (sprintDistances[i] == maxDistance)
      sprintPoints[i]++;
  }
}

console.log(sprintPoints);
//answer 1 - 2655
console.log(' ');
console.log('ANSWER: ', Math.max(...sprintPoints));