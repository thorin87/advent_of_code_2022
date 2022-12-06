import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

let sum = 0;
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let group = [];
for await (const line of rl) {
    group.push(line);
    if (group.length % 3 === 0) {
        const matches1 = group[1].match(new RegExp(`[${group[0]}]`,'g'));
        const matches2 = group[2].match(new RegExp(`[${matches1.join('')}]`));
        sum += letters.indexOf(matches2[0]) + 1;
        group = [];
    }
}
console.log('Sum: ' + sum);
