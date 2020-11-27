'use strict';

const day = 23;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  
*/
const fs = require('fs');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString().split('\r\n');
let instructions = input.map(line => {
    let command = undefined;
    if (line.split(' ').length == 2) {
        command = {instruction: line.split(' ')[0], commands: [line.split(' ')[1]]};
    } else {
        command = {instruction: line.split(' ')[0], 
            commands: [line.split(', ')[0].split(' ')[1],line.split(', ')[1]]};
    }
    return command;
});
let registers = new Map();
let line_counter = 0;
let finished = false;

while (!finished) {
    let command = getNextCommand();
    console.log(` ${line_counter}: ${input[line_counter]}, 'a' before: ${registers.get('a').val}`);
    switch (command.instruction) {
        case 'inc':
            registers.get(command.commands[0]).val++;
            line_counter++;
            break;
        case 'hlf':
            registers.get(command.commands[0]).val = 
                Math.floor(registers.get(command.commands[0]).val / 2);
            line_counter++;
            break;
        case 'tpl':
            registers.get(command.commands[0]).val *= 3;
            line_counter++;
            break;
        case 'jmp':
            line_counter += Number(command.commands[0]);
            break;
        case 'jie':
            if (registers.get(command.commands[0]).val % 2 === 0) {
                line_counter += Number(command.commands[1]);
            } else {
                line_counter++;
            }
            break;
        case 'jio':
            if (registers.get(command.commands[0]).val === 1) {
                line_counter += Number(command.commands[1]);
            } else {
                line_counter++;
            }
            break;
        default:
            console.log('unknown instruction', command.instruction);
            finished = true;
            break;
    }
    if (line_counter >= instructions.length) {
        finished = true;
    }
}

function getNextCommand() {

    let command = instructions[line_counter];

    if (command.instruction !== 'jmp' && !registers.has(command.commands[0])) {
        registers.set(command.commands[0], {val: 0});
        if (command.commands[0] === 'a') {
            registers.get(command.commands[0]).val++;
        }
    } 

    return command;
}

console.log(' ');
console.log('ANSWER: ', registers);