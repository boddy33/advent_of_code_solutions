'use strict';

const day = 21;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  
*/
//const fs = require('fs');
//const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString().split('\r\n');
//console.log(input);

let player = {health : 100};
let boss = {health : 104, damage: 8, armor: 1};
let shop = {
    weapons:[
        {cost: 8, damage: 4},
        {cost: 10, damage: 5},
        {cost: 25, damage: 6},
        {cost: 40, damage: 7},
        {cost: 74, damage: 8}
    ], armor: [
        {cost: 0, armor: 0},
        {cost: 13, armor: 1},
        {cost: 31, armor: 2},
        {cost: 53, armor: 3},
        {cost: 75, armor: 4},
        {cost: 102, armor: 5}
    ], rings: [
        {cost: 0, damage: 0, armor: 0},
        {cost: 25, damage: 1, armor: 0},
        {cost: 50, damage: 2, armor: 0},
        {cost: 100, damage: 3, armor: 0},
        {cost: 20, damage: 0, armor: 1},
        {cost: 40, damage: 0, armor: 2},
        {cost: 80, damage: 0, armor: 3}
    ]
}
let outcomes = [];


for (let w = 0; w < shop.weapons.length; w++) {
    for (let a = 0; a < shop.armor.length; a++) {
        for (let r1 = 0; r1 < shop.rings.length; r1++) {
            for (let r2 = 0; r2 < shop.rings.length; r2++) {
                //r1 may == r2 only for zero case, otherwise go to next
                if (r1 > 0 && r1 == r2) continue;
                let outcome = {w: w, a: a, r1: r1, r2: r2};
                outcome.cost = shop.weapons[w].cost + 
                                shop.armor[a].cost +
                                shop.rings[r1].cost + 
                                shop.rings[r2].cost;
                outcome.damage = shop.weapons[w].damage +
                                shop.rings[r1].damage + 
                                shop.rings[r2].damage;
                outcome.armor = shop.armor[a].armor +
                                shop.rings[r1].armor + 
                                shop.rings[r2].armor;
                outcome.win = (Math.ceil(boss.health / ((outcome.damage - boss.armor > 1 ? outcome.damage - boss.armor : 1)))
                       <= Math.ceil(player.health / ((boss.damage - outcome.armor > 1 ? boss.damage - outcome.armor : 1))));
                console.log('player damage', outcome.damage, 'armor', outcome.armor, 'cost', outcome.cost, 'this is a victory:', outcome.win);
                console.log('------');
                outcomes.push(outcome);
            }
        }
    }
}

let maxCost = outcomes.reduce((prevMaxCost, outcome) => {
               if (!outcome.win && outcome.cost > prevMaxCost) return outcome.cost;
               return prevMaxCost;
            }, 0);
let worstOutcome = outcomes.filter((outcome => {
    return !outcome.win && outcome.cost == maxCost;
}))[0];
//71 incorrect 76 incorrect 91 incorrect
console.log(' ');
console.log('ANSWER: ', maxCost);