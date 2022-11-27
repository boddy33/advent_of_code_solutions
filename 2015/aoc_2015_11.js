'use strict';

const day = 11;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  generate next password based on input
  * must have 8 lowercase letters
  start by incrementing letters one by one as if they were numbers
  
 
 

  hijklmmn FAIL
  abbceffg FAIL
  abbcegjk FAIL
  DEBUG: next after abcdefgh is abcdffaa, next after ghijklmn is ghjaabcc
  next after hxbxwxba - ?
*/
let input = 'hxbxxyzz';
let counter = 0;
while(input != 'zzzzzzzz') {
  counter++;
  input = getNextCandidate(input);
  if (testInput(input)) break;
  if (counter % 100 == 0) console.log('tested', counter, 'passwords');
}

function getNextCandidate(input) {
  let candArray = new Array(input.length);
  let incrementNextChar = true;
  for (let i = input.length - 1; i >= 0; i--) {
    if (incrementNextChar) {
      if (input[i] == 'z') {
        candArray[i] = 'a';
      }  else {
        candArray[i] = String.fromCharCode(input.charCodeAt(i) + 1);
        incrementNextChar = false;
      }
    } else {
      candArray[i] = input[i];
    }
  }
  return candArray.reduce((a, b) => a + b, '');
}

//guaranteed length of 8, lowercase letters only
function testInput(input) {
  let testThreeStraight = false;
  let testNoIOL = true;
  let testPairs = false;
  //* must include one increasing straight of at least three letters - abc or bcd or .. xyz
  for (let i = 0; i < input.length - 2; i++) {
    if (isLetterStraight(input.slice(i, i + 3))) {
      testThreeStraight = true;
      break;
    }
  }
  //* may not contain i, o, l
  for (let i = 0; i < input.length; i++) {
    if (['i', 'o', 'l'].includes(input[i])) {
      testNoIOL = false;
      break;
    }
  }
  //* must conain min TWO, DIFFERENT, NON-OVERLAPPING pairs of letters, like aa, bb .. zz
  let pairCounter = 0;
  let lastChar = input[0];
  let lastPairChar = '';
  for (let i = 1; i < input.length; i++) {
    if (lastChar == input[i] && lastChar != lastPairChar) {
      pairCounter++;
      if (pairCounter == 2) break;
      lastChar = input[i + 1];
      lastPairChar = input[i];
      i++;
    } else {
      lastChar = input[i];
    }
  }
  testPairs = pairCounter >= 2;
  //console.log(input, 'testThreeStraight', testThreeStraight, 'testNoIOL', testNoIOL, 'testPairs', testPairs);
  return testThreeStraight && testNoIOL && testPairs;
}

//lower case, always 3 chars
function isLetterStraight(input) {
  return (input.charCodeAt(0) + 1 == input.charCodeAt(1)) 
      && (input.charCodeAt(1) + 1 == input.charCodeAt(2));
}


console.log(' ');
//answer 1: hxbxxyzz
console.log('ANSWER 2: ', input);