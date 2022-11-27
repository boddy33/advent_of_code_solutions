'use strict';

console.log('Day 7 - Advent Of Code 2015');

//const { sign } = require('crypto');
const fs = require('fs');
//const { parse } = require('path');
const input = fs.readFileSync('D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_7.txt').toString().split("\r\n");
// AND gate '&'
// [number] -> x - direct signal
// LSHIFT [number] -> left shift by number '<<'
// NOT '' '~'
// OR '|'
// RSHIFT '>>'
// !!! "A gate provides no signal until all of its inputs have a signal."
let circuit = input.map(instuct => parseSignal(instuct));
let wire = 'a';
let wireSignal = getWireSignal(wire);
let stepCounter = 0;
console.log('wire signal for', wire, 'is', wireSignal);

function getWireSignal(wire) {
    let signal = 0;
    let wireInstruct = circuit.filter(instruct => instruct.wire == wire)[0];
    //console.log('current instruction:', JSON.stringify(wireInstruct));
    if (wireInstruct.wireValue != -1) {
        //value has been calculated already
        return wireInstruct.wireValue;
    }
    if (wireInstruct.type == 'VAL') {
        signal = wireInstruct.value;
    } else if (['LSHIFT', 'RSHIFT', 'NOT', 'SIMPLE'].includes(wireInstruct.type)) {
        //one level down to calculate input wire signal
        let inputWireSignal = getWireSignal(wireInstruct.firstWire);
        switch (wireInstruct.type) {
            case 'LSHIFT':
                signal = uint16(inputWireSignal << wireInstruct.value);
                break;
            case 'RSHIFT':
                signal = uint16(inputWireSignal >> wireInstruct.value);
                break;
            case 'NOT':
                signal = uint16(~ inputWireSignal);
                break;
            default:
                signal = uint16(inputWireSignal);
        }
    } else {
        //GATE
        //one level down to calculate input wire signal
        let firstWireSignal = isNaN(wireInstruct.firstWire) ? getWireSignal(wireInstruct.firstWire) : parseInt(wireInstruct.firstWire);
        let secondWireSignal = isNaN(wireInstruct.secondWire) ? getWireSignal(wireInstruct.secondWire) : parseInt(wireInstruct.secondWire);
        switch (wireInstruct.type) {
            case 'AND':
                signal = uint16(firstWireSignal & secondWireSignal);
                break;
            case 'OR':
                signal = uint16(firstWireSignal | secondWireSignal);
                break;
        }
    }
    wireInstruct.wireValue = signal;
    return signal;
}

function uint16 (n) {
    return n & 0xFFFF;
  }


function parseSignal(signalString) {
    let signal = {
        type: '',
        value: -1,
        firstWire: '',
        secondWire: '',
        wire: '',
        wireValue: -1
    }
    let signalArray = signalString.split(' ');
    if (signalString.indexOf('AND') != -1 || signalString.indexOf('OR') != -1) {
        signal.type = signalArray[1];
        signal.firstWire = signalArray[0];
        signal.secondWire = signalArray[2];
        signal.wire = signalArray[4];
    } else if (signalString.indexOf('NOT') != -1) {
        signal.type = signalArray[0];
        signal.firstWire = signalArray[1];
        signal.wire = signalArray[3];
    } else if (signalString.indexOf('SHIFT') != -1) {
        signal.type = signalArray[1];
        signal.firstWire = signalArray[0];
        //right operand is always a number
        signal.value = +signalArray[2];
        signal.wire = signalArray[4];
    } else {
        //plain signal or simple connection
        //console.log(parseInt(signalArray[0]));
        if (isNaN(parseInt(signalArray[0]))) {
            signal.firstWire = signalArray[0];
            signal.type = 'SIMPLE'
        } else {
            signal.value = +signalArray[0];
            signal.type = 'VAL'
        }      
        signal.wire = signalArray[2];
    }
    //Task 2
    if (signal.wire == 'b') {
        //wireValue is Task 1 answer
        signal.wireValue = 3176;
        //task 2 answer: 14710
    }
    return signal;
} 