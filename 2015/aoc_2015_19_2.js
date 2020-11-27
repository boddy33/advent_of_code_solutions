'use strict';

const day = 19;
console.log(`Day ${day} - Advent Of Code 2015 (Part 2)`);
const { match } = require('assert');
/*
  
*/

Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

const fs = require('fs');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString().split('\r\n');
let replacements = [];
let initialReplacements = [];
let moleculeString = input[input.length - 1];
let moleculeArray = toElementArray(moleculeString);
for (let i  = 0; i < input.length - 2; i++) {
    if (input[i].split(' => ')[0] != 'e') {
        replacements.push([input[i].split(' => ')[0], input[i].split(' => ')[1]]);
    } else {
        initialReplacements.push([input[i].split(' => ')[0], input[i].split(' => ')[1]]);
    }

}
let stepCounter = 0;
//make first step with initial replacements
//make next steps, replacing molecules with arrays of molecules
//upon each step completion, check for match and return or increment counter and continue
let moleculeTree = initialReplacements.map(replacement => replacement[1]);
let matchFound = false;
stepCounter++;
console.log('completed step', stepCounter);
//hack - after 1st step require 1 beginning molecule match,
//otherwise do not add to the tree
//after each step require 2 more to match
let moleculeMatchFilter = moleculeArray[0];
let moleculeMatchCounter = 1;

while (!matchFound) {
    console.log('step', stepCounter, 'started');
    moleculeTree = nextStep(moleculeTree);
    console.log('moleculeTree generated');
    moleculeTree = [].concat.apply([], moleculeTree);
    console.log('moleculeTree flattened');
    moleculeTree = [...new Set(moleculeTree)];
    console.log('duplicated removed');
    matchFound = checkMatch(moleculeTree);
    stepCounter++;
    console.log('array size after step', stepCounter, 'is', moleculeTree.length);
    console.log('completed step', stepCounter);
    //how many molecules to match?
    if (moleculeTree.length < 1000) {
        moleculeMatchFilter += moleculeArray[moleculeMatchCounter];
        moleculeMatchCounter += 1;
    } else {
        console.log('will require double new match on the next step');
        moleculeMatchFilter += moleculeArray[moleculeMatchCounter] + moleculeArray[moleculeMatchCounter + 1];
        moleculeMatchCounter += 2;
    }
    console.log('will require partial match on the next step:', moleculeMatchFilter);
}

function checkMatch(moleculeSubTree) {
    let match = false;
    moleculeSubTree.forEach(replacement => {
        if ((typeof replacement) == 'string') {
            match = match || replacement == moleculeString;
        } else {
            match = match || checkMatch(replacement);
        }
    });
    return match;
}

function nextStep(replacementArray) {
    replacementArray = replacementArray.map(replacement => {
        if ((typeof replacement) == 'string') {
            //proceed with replacement
            let replacements = getReplacements(replacement);
            if (replacements.length > 0) {
                return replacements;
            } else {
                return null;
            }
        } else {
            //go deeper
            if (replacement.length == 0) {
                return null;
            } else {
                return nextStep(replacement);
            }
        }
    });
    return replacementArray.filter(item => item != null);
}

function getReplacements(subMolecule) {
    let moleculeCalibrations = new Set();
    //iterate over molecule
    //for every element (A or Aa)
    //apply all replacements
    //save every calibration
    if (subMolecule.length == 1) {
        replacements.forEach(replacement => {
            if (replacement[0] == subMolecule) {
                moleculeCalibrations.add(replacement[1]);
            }
        });
    } else {
        let prevChar = subMolecule[0];
        for (let i = 1; i < subMolecule.length; i++) {
            //if current char lower case, combine with prev, process replacement for combined chars
            if (isLowerCase(subMolecule[i])) {
                let element = prevChar + subMolecule[i];
                replacements.forEach(replacement => {
                    if (replacement[0] == element) {
                        moleculeCalibrations.add(subMolecule.slice(0, i - 1) + replacement[1] + subMolecule.slice(i + 1));
                    }
                });
            } 
            //if current char upper case, and previous upper case, process replacement for prev char
            if (!isLowerCase(subMolecule[i]) && !isLowerCase(prevChar)) {
                let element = prevChar;
                replacements.forEach(replacement => {
                    if (replacement[0] == element) {
                        moleculeCalibrations.add(subMolecule.slice(0, i - 1) + replacement[1] + subMolecule.slice(i));
                    }
                });
            }
            //if current char is last char and is uppercase, process it as well
            if ((i == subMolecule.length - 1) && !isLowerCase(subMolecule[i])) {
                let element = subMolecule[i];
                replacements.forEach(replacement => {
                    if (replacement[0] == element) {
                        moleculeCalibrations.add(subMolecule.slice(0, i) + replacement[1]);
                    }
                });
            }  
            prevChar = subMolecule[i];
        }
    }

    //sub-molecule match check
    for(let item of moleculeCalibrations) {
        if (!item.startsWith(moleculeMatchFilter)) {
            moleculeCalibrations.delete(item);
        }
    }
        
    return Array.from(moleculeCalibrations);
}

function isLowerCase(char) {
    return char == char.toLowerCase();
}

function toElementArray(molecule) {
    if (molecule.length == 0) return [];
    if (module.length == 1) return [molecule];
    let elementArray = [];
    let prevChar = molecule[0];
    for (let i = 1; i < molecule.length; i++) {
        //if current char lower case, combine with prev
        if (isLowerCase(molecule[i])) {
            let element = prevChar + molecule[i];
            elementArray.push(element);
        //if current char upper case, and previous upper case, use prev char
        } else if (!isLowerCase(molecule[i]) && !isLowerCase(prevChar)) {
            let element = prevChar;
            elementArray.push(element);
        }
        
        if (i == molecule.length - 1 && !isLowerCase(molecule[i])) {
            elementArray.push(molecule[i]);
        }

        prevChar = molecule[i];
    }
    return elementArray;
}


console.log(' ');
console.log('ANSWER: ', stepCounter);