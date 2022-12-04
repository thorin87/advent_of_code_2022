import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

const RoundResult = {
    Win: 'Win',
    Draw: 'Draw',
    Lose: 'Lose'
};

// opponent: A for Rock, B for Paper, and C for Scissors
// player: X for Rock, Y for Paper, and Z for Scissors
const roundResultMatrix = {
    A: {
        X: RoundResult.Draw,
        Y: RoundResult.Win,
        Z: RoundResult.Lose
    },
    B: {
        X: RoundResult.Lose,
        Y: RoundResult.Draw,
        Z: RoundResult.Win
    },
    C: {
        X: RoundResult.Win,
        Y: RoundResult.Lose,
        Z: RoundResult.Draw
    }
}

// score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)
function scoreForRound(opponent, player) {
    const roundResult = roundResultMatrix[opponent][player];
    switch (roundResult) {
        case RoundResult.Win:
            return 6;
        case RoundResult.Draw:
            return 3;
        case RoundResult.Lose:
            return 0;
    }
}

// score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors)
function scoreForShape(player) {
    switch (player) {
        case 'X':
            return 1;
        case 'Y':
            return 2;
        case 'Z':
            return 3;
    }
}

let totalPoints = 0;
for await (const line of rl) {
    let round = line.split(' ');
    totalPoints += scoreForRound(round[0], round[1]) + scoreForShape(round[1]);
}
console.log('Total: ' + totalPoints);