import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

let maxSum = 0;
let currentSum = 0;
for await (const line of rl) {
    if (line === '') {
        if (currentSum > maxSum) {
            maxSum = currentSum;
        }
        currentSum = 0;
    } else {
        currentSum += +line;
    }
}
console.log('Max: ' + maxSum);