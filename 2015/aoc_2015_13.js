'use strict';

const day = 13;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  
*/
const fs = require('fs');
//const permute = require('./aoc_2015_9');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString().split('\r\n');
let guestArray = [];
let guestHappinessRules = [];

input.forEach(ruleString => {
    let rule = parseRule(ruleString);
    if (!guestArray.includes(rule.guest)) guestArray.push(rule.guest);
    guestHappinessRules.push(rule);
});

guestArray.forEach(guest => {
    let rule1 = {guest: 'Bo', points: 0, nextGuest: guest};
    let rule2 = {guest: guest, points: 0, nextGuest: 'Bo'};
    guestHappinessRules.push(rule1);
    guestHappinessRules.push(rule2);
});
guestArray.push('Bo');

let guestPermutations = permute(guestArray);
let happinessChangeArray = guestPermutations.map(permutation => {
    return permutation.reduce((score, guest) => {
      let leftGuest = permutation.indexOf(guest) == 0 ? 
        permutation[permutation.length - 1] : 
        permutation [permutation.indexOf(guest) - 1];
      let rightGuest = permutation.indexOf(guest) == (permutation.length - 1) ? 
        permutation[0] : 
        permutation [permutation.indexOf(guest) + 1]; 
      let leftGuestScore = 
        guestHappinessRules.filter(rule => rule.guest == guest && rule.nextGuest == leftGuest)[0].points;
      let rightGuestScore = 
        guestHappinessRules.filter(rule => rule.guest == guest && rule.nextGuest == rightGuest)[0].points;
      return score + leftGuestScore + rightGuestScore;
    }, 0);
});

function parseRule(ruleString) {
    let rule = {};
    let ruleArray = ruleString.split(' ');
    rule.guest = ruleArray[0];
    rule.points = ruleArray[2] == 'gain' ? parseInt(ruleArray[3]) : -parseInt(ruleArray[3]);
    rule.nextGuest = ruleArray[10].slice(0, ruleArray[10].length - 1);
    return rule;
}

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
//stack problems..
happinessChangeArray = [...new Set(happinessChangeArray)];

//answer 1: 709
console.log(' ');
console.log('ANSWER: ', Math.max(...happinessChangeArray));