import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

const RoundResult = {
    Win: 'Win',
    Draw: 'Draw',
    Lose: 'Lose'
};

// opponent: A for Rock, B for Paper, and C for Scissors
// player: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
const playerShould = {
    X: RoundResult.Lose,
    Y: RoundResult.Draw,
    Z: RoundResult.Win
}

const playerMoveMatrix = {
    A: {
        [RoundResult.Draw]: 'X',
        [RoundResult.Win]: 'Y',
        [RoundResult.Lose]: 'Z'
    },
    B: {
        [RoundResult.Lose]: 'X',
        [RoundResult.Draw]: 'Y',
        [RoundResult.Win]: 'Z'
    },
    C: {
        [RoundResult.Win]: 'X',
        [RoundResult.Lose]: 'Y',
        [RoundResult.Draw]: 'Z'
    }
}

// score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)
function scoreForRound(roundResult) {
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
    const round = line.split(' ');
    const expectedRoundResult = playerShould[round[1]];
    const playerMove = playerMoveMatrix[round[0]][expectedRoundResult];
    totalPoints += scoreForRound(expectedRoundResult) + scoreForShape(playerMove);
}
console.log('Total: ' + totalPoints);