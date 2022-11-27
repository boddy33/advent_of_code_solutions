'use strict';

const day = 20;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  
*/
const input = 33100000;
let answer = 0;
let house = 1;
let elfLimits = new Map();

while (!answer) {
    let elves = getAllDivisors(house);
    elves.forEach(elf => {
        if (!elfLimits.has(elf)) {
            elfLimits.set(elf, 1);
        } else {
            elfLimits.set(elf, elfLimits.get(elf) + 1);
        }
    });

    let count = elves.reduce((count, elf) => {
        //elf is counted only if he has not reached the limit of 50 yet
        return count + (elfLimits.get(elf) <= 50 ? elf * 11 : 0);
    }, 0);
    //console.log('house', house, 'gets', count, 'gifts');
    if (count >= input) {
        answer = house;
    } else {
        house++;
    }
}

function getAllDivisors(n) {
    let divisors = new Array();
    // 1 is always there
    divisors.push(1);
    // 1 is a special case where "1 and itself" are only one divisor rather than 2
    if (n === 1) {     
        return divisors;
    }
    // n is always there
    divisors.push(n);

    var mod = 2;
    while (mod * mod <= n) {
        if (n % mod === 0) {
            if (mod * mod < n) {
                divisors.push(mod);
                divisors.push(n / mod);
            } 
            else {
                divisors.push(mod);
            }
        }
        mod++;
    }

    return divisors;
}


//your answer is too high 3009091
console.log(' ');
console.log('ANSWER: ', answer);