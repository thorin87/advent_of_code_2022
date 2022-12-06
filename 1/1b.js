import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

let top3Sums = [];
let currentSum = 0;
for await (const line of rl) {
    if (line === '') {
        if (top3Sums.length < 3) {
            top3Sums.push(currentSum);
        } else {
            const lowestOfTop3 = Math.min(...top3Sums);
            if (lowestOfTop3 < currentSum) {
                const lowestOfTop3Index = top3Sums.findIndex(x => x === lowestOfTop3);
                top3Sums[lowestOfTop3Index] = currentSum;
            }
        }
        currentSum = 0;
    } else {
        currentSum += +line;
    }
}
console.log(top3Sums);
const sumOfTop3Sums = top3Sums.reduce((prev, current) => current + prev);
console.log('Max 3: ' + sumOfTop3Sums);