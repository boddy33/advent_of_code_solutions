'use strict';

const day = 22;
console.log(`Day ${day} - Advent Of Code 2015`);
  
let spells = {
    m: {code: 'm', name: 'Magic Missile', duration: 1, cost: 53, damage: 4},
    d: {code: 'd', name: 'Drain', duration: 1, cost: 73, damage: 2, heal: 2},
    s: {code: 's', name: 'Shield', duration: 6, cost: 113, armor: 7},
    p: {code: 'p', name: 'Poison', duration: 6, cost: 173, damage: 3},
    r: {code: 'r', name: 'Recharge', duration: 5, cost: 229, mana: 101}
}

let spell_sequence_max_length = 15;
let spell_sequence_count = 5000000;
let spell_sequence_array = getSpellSequences(spell_sequence_max_length);

let manaSpentCounters = new Map();

spell_sequence_array.forEach(spell_sequence => {

    let spent_mana_couner = playSequence(spell_sequence);
    if (spent_mana_couner > 0) {
        manaSpentCounters.set(spent_mana_couner, spell_sequence);
    }

});

if (manaSpentCounters.length == 0) {
    console.log('Could not find winning spell sequence');
} else {
    console.log(`After applying all sequences with max length ${spell_sequence_max_length}`);
    console.log(`Minimum mana spent:`, Math.min(...manaSpentCounters.keys()));
    console.log(`Winning sequence:`, manaSpentCounters.get(Math.min(...manaSpentCounters.keys())));
}
//1329 - too high

function getSpellSequences() {
    let retArray = new Array();
    let vocabulary = ['m', 'd', 's', 'p', 'r'];
    for (let i = 0; i <= spell_sequence_count; i++) {
        let newSequence = new Array(spell_sequence_max_length);
        for (let j = 0; j < spell_sequence_max_length; j++) {
            newSequence[j] = vocabulary[~~(Math.random() * 5)];
        }
        retArray.push(newSequence);
    }
    //retArray.push(['p', 'd', 'r', 'p', 's', 'r', 'p', 'm', 'm']);
    return retArray;
}

function playSequence(spell_sequence) {
    let round = 0;
    let spent_mana_couner = 0;
    let player = {health : 50, mana: 500};
    let boss = {health : 58, damage: 9};
    let game_state = {player_turn: true, shield_effect: 0, poison_effect: 0, recharge_effect: 0, 
                    player_victory: undefined};

    while(game_state.player_victory === undefined) {
        if (spell_sequence[round] === undefined) {
            //console.log('Reached the end of the spell sequence. Player lost.');
            game_state.player_victory = false;
            break;
        }
        //turn statistics
        if (game_state.player_turn) {
            //console.log('');
            //console.log('-- Player turn --');
            //LEVEL HARD
            player.health--;
            if (player.health <= 0) {
                //console.log('hard level lost due to 1 point');
                game_state.player_victory = false;
                break;
            }
        } else {
            //console.log('');
            //console.log('-- Boss turn --');
        }
        //console.log('- Player has', player.health, 'hit points,',
        //    (game_state.shield_effect > 0 ? 7 : 0 ), 'armor,', player.mana, 'mana');
        //console.log('- Boss has', boss.health, 'hit points');
        //apply active effects
        let playerArmor = 0;
        if (game_state.shield_effect > 0) {
            game_state.shield_effect--;
            playerArmor = spells.s.armor;
        //    console.log(`Shield's timer is now ${game_state.shield_effect}.`);
            if (game_state.shield_effect == 0) {
        //        console.log(`Shield wears off, decreasing armor by ${spells.s.armor}.`);
            }
        }
        if (game_state.recharge_effect > 0) {
            game_state.recharge_effect--;
            player.mana += spells.r.mana;
        //    console.log(`Recharge provides ${spells.r.mana} mana; its timer is now ${game_state.recharge_effect}.`);
            if (game_state.recharge_effect == 0) {
        //        console.log(`Recharge wears off.`);
            }
        }
        if (game_state.poison_effect > 0) {
            game_state.poison_effect--;
            boss.health -= spells.p.damage;
            if (boss.health > 0) {
        //        console.log('Poison deals', spells.p.damage, `damage; its timer is now ${game_state.poison_effect}.`);
            } else {
                boss.health = 0;
        //        console.log('Poison deals', spells.p.damage, `damage. This kills the boss, and the player wins.`);
                game_state.player_victory = true;
                break;
            }
            if (game_state.poison_effect == 0) {
        //        console.log(`Poison wears off.`);
            }
        }
        //player turn
        if (game_state.player_turn) {
            switch(spell_sequence[round]) {
                case 's': {
                    if (player.mana < spells.s.cost || game_state.shield_effect > 0) {
         //               console.log(`Invalid spell, player lost`);
                        game_state.player_victory = false;
                    } else {
                        player.mana -= spells.s.cost;
                        spent_mana_couner += spells.s.cost;
                        game_state.shield_effect = spells.s.duration;
         //               console.log(`Player casts ${spells.s.name}, increasing armor by ${spells.s.armor}.`);
                    }
                    break;
                }
                case 'r': {
                    if (player.mana < spells.r.cost || game_state.recharge_effect > 0) {
         //               console.log(`Invalid spell, player lost`);
                        game_state.player_victory = false;
                    } else {
                        player.mana -= spells.r.cost;
                        spent_mana_couner += spells.r.cost;
                        game_state.recharge_effect = spells.r.duration;
         //               console.log(`Player casts ${spells.r.name}.`);
                    }
                    break;
                }
                case 'p': {
                    if (player.mana < spells.p.cost || game_state.poison_effect > 0) {
         //               console.log(`Invalid spell, player lost`);
                        game_state.player_victory = false;
                    } else {
                        player.mana -= spells.p.cost;
                        spent_mana_couner += spells.p.cost;
                        game_state.poison_effect = spells.p.duration;    
         //               console.log(`Player casts ${spells.p.name}.`);
                    }
                    break;
                }
                case 'd': {
                    if (player.mana < spells.d.cost) {
         //               console.log(`Invalid spell, player lost`);
                        game_state.player_victory = false;
                    } else {
                        player.mana -= spells.d.cost;
                        spent_mana_couner += spells.d.cost;
                        player.health += spells.d.heal;
                        boss.health -= spells.d.damage;    
         //               console.log(`Player casts ${spells.d.name}, dealing ${spells.d.damage} damage, and healing ${spells.d.heal} hit points.`);
                        if (boss.health <= 0) {
                            boss.health = 0;
         //                   console.log('This kills the boss, and the player wins.');
                            game_state.player_victory = true;
                        }
                    }
                    break;
                }
                case 'm': {
                    if (player.mana < spells.m.cost) {
         //               console.log(`Invalid spell, player lost`);
                        game_state.player_victory = false;
                    } else {
                        player.mana -= spells.m.cost;
                        spent_mana_couner += spells.m.cost;
                        boss.health -= spells.m.damage;    
          //              console.log(`Player casts ${spells.m.name}, dealing ${spells.m.damage} damage.`);
                        if (boss.health <= 0) {
                            boss.health = 0;
           //                 console.log('This kills the boss, and the player wins.');
                            game_state.player_victory = true;
                        }
                    }
                    break;
                }
                default: 
                    break;
            }
            //break inside switch will not exit WHILE
            if (game_state.player_victory !== undefined) break;
        //boss turn
        } else {
            let boss_attack_damage = ((boss.damage - playerArmor) > 1 ? boss.damage - playerArmor : 1);
            player.health -= boss_attack_damage;
          //  console.log(`Boss attacks for ${boss_attack_damage} damage!`);
            if (player.health <= 0) {
                player.health = 0;
           //     console.log('This kills the player, and the boss wins.');
                game_state.player_victory = false;
                break;
            }
        }
        //next turn
        game_state.player_turn = !game_state.player_turn;
        if (game_state.player_turn) round++;
    }
    
    //console.log(' ');
   // console.log('Game won: ', game_state.player_victory);
   // console.log('Total Mana Spent: ', spent_mana_couner, 'in', round, 'rounds, mana remainder', player.mana);

    return game_state.player_victory ? spent_mana_couner : 0;
}