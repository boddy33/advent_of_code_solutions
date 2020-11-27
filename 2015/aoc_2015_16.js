'use strict';

const day = 16;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  
*/
const fs = require('fs');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString().split('\r\n');
//console.log('input', input);
let rules = new Map();
rules.set('children', 3);
rules.set('cats', 7);
rules.set('samoyeds', 2);
rules.set('pomeranians', 3);
rules.set('akitas', 0);
rules.set('vizslas', 0);
rules.set('goldfish', 5);
rules.set('trees', 3);
rules.set('cars', 2);
rules.set('perfumes', 1)

let aunts = input.map(string => {
    string = string.split(' ');
    return {
        number: +string[1].slice(0, -1),
        items: parseItems(string)
    }
});

function parseItems(string) {
    let items = new Map();
    items.set(string[2].slice(0, -1), +string[3].slice(0, -1));
    items.set(string[4].slice(0, -1), +string[5].slice(0, -1));
    items.set(string[6].slice(0, -1), +string[7]);
    return items;
}

let aunt = aunts.reduce((theAunt, currentAunt) => {
    if (theAunt === null) {
        //aunt detected, if for each matched rule, there is a value match
        let match = true;
        rules.forEach((value, key, map) => {
            if (match && currentAunt.items.has(key)) {
                console.log('aunt', currentAunt.number, 'has rule', key);
                let currRuleMatch = false;
                switch(key) {
                    case 'cats':
                    case 'trees':
                        currRuleMatch = currentAunt.items.get(key) > value;
                        break;
                    case 'pomeranians':
                    case 'goldfish':
                        currRuleMatch = currentAunt.items.get(key) < value;
                        break;
                    default:
                        currRuleMatch = currentAunt.items.get(key) == value;
                }
                //test next matched item
                if (!currRuleMatch) {
                    console.log('aunt', currentAunt.number, 'rule', key, 'not matched');
                    match = false;
                } else {
                    console.log('aunt', currentAunt.number, 'rule', key, 'MATCH!');
                }
            }
        });
        if (match) {
            console.log('aunt', currentAunt.number, 'is THE aunt');
            theAunt = currentAunt;
        }
    }
    return theAunt;
}, null);
//answer 1: 40
console.log(' ');
console.log('ANSWER: ', aunt.number);