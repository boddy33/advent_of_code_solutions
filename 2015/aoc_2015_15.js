'use strict';

const day = 15;
console.log(`Day ${day} - Advent Of Code 2015`);
/*
  Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
  Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
  
  - ignore calories for now
  - 100 teaspoons
  - save the recipe config
  - score = multiply all totals; 
  - total = sum of #spoonsOfIngredient*propertyOfIngredientPerSpoon of every ingredient for specific property
  - if total < 0, total = 0 => score = 0
  - find best proportion giving max score
*/
const fs = require('fs');
const input = fs.readFileSync(`D:/L290/WEBDEV_2020/BACKEND/sandbox/aoc_2015_${day}.txt`).toString().split('\r\n');
console.log('input', input);
let answer = 0;
let spoonsNum = 100;
let ingredientCount = input.length;
// parse properties
let ingredients = input.map(string => {
  let ingredient = {};
  string = string.split(' ');
  ingredient.name = string[0].slice(0, string[0].length - 1);
  ingredient.capacity = parseInt(string[2].slice(0, string[2].length - 1));
  ingredient.durability = parseInt(string[4].slice(0, string[4].length - 1));
  ingredient.flavor = parseInt(string[6].slice(0, string[6].length - 1));
  ingredient.texture = parseInt(string[8].slice(0, string[8].length - 1));
  ingredient.calories = parseInt(string[10]);
  return ingredient;
});
/* find all permutations of recipes of N properties giving sum() == 100
   unclear if it is allowed to not to use some ingredient, will allow for now => permutation: 100, 0, 0, ... */
let ingredientAmounts = []; 
let proportion = new Array(ingredientCount).fill(0);
while (proportion != null) {
  proportion = incrementProportion(proportion);
  if (proportion === null || proportion.reduce((a, b) => a + b, 0) != spoonsNum) 
    continue;

  //console.log('valid proportion found', proportion);
  ingredientAmounts.push(proportion);
} 
// salculate score for each recipe (permutation) 
let recipeScores = ingredientAmounts.map(recipe => {
  let index = -1;
  let recipeScore = {recipe: recipe, score: 0};
  //iterate over amounts for each ingredient
  let capacityScore = recipe.reduce((score, ingredientAmount) => {
    index++;
    return score + ingredients[index].capacity * ingredientAmount;
  },0);
  index = -1;
  let durabilityScore = recipe.reduce((score, ingredientAmount) => {
    index++;
    return score + ingredients[index].durability * ingredientAmount;
  },0);
  index = -1;
  let flavorScore = recipe.reduce((score, ingredientAmount) => {
    index++;
    return score + ingredients[index].flavor * ingredientAmount;
  },0);
  index = -1;
  let textureScore = recipe.reduce((score, ingredientAmount) => {
    index++;
    return score + ingredients[index].texture * ingredientAmount;
  },0);
  index = -1;
  let calorieScore = recipe.reduce((score, ingredientAmount) => {
    index++;
    return score + ingredients[index].calories * ingredientAmount;
  },0);

  if (capacityScore <= 0 || durabilityScore <= 0 || flavorScore <= 0 || textureScore <= 0 || calorieScore != 500) {
    return recipeScore;
  } else {
    recipeScore.score = capacityScore * durabilityScore * flavorScore * textureScore;
    return recipeScore;
  }
});
// find max score and its recipe (permutation) 
let bestRecipe = null;
let bestRecipeScore = recipeScores.reduce((maxScore, recipe) => {
  if (recipe.score > maxScore) {
    maxScore = recipe.score;
    bestRecipe = recipe;
  }
  return maxScore;
}, 0);

function incrementProportion(proportion) {
  let currProportion = [...proportion];
  if (currProportion.reduce((a, b) => a + b, 0) / currProportion.length == spoonsNum) {
    console.log('reached last proportion', currProportion);
    return null;
  }
  let incrementNext = false;
  for(let i = currProportion.length - 1; i >= 0; i--) {
    if (currProportion[i] == spoonsNum) {
      currProportion[i] = 0;
      incrementNext = true;
    } else {
      currProportion[i]++;
      break;
    }
  }
  //console.log('proportion increment', currProportion);
  return currProportion;
}
//answer 1: 21367368
console.log(' ');
console.log('ANSWER: ', bestRecipeScore, 'recipe', bestRecipe.recipe.toString());