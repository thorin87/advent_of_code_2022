import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

let sum = 0;
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
for await (const line of rl) {
    const compartmentSize = line.length / 2;
    const firstCompartment = line.substring(0, compartmentSize);
    const secondCompartment = line.substring(compartmentSize);
    const matches = secondCompartment.match(new RegExp(`[${firstCompartment}]`));
    for (let i = 0; i < matches.length; i++) {
        sum += letters.indexOf(matches[i]) + 1;
    }
}
console.log('Sum: ' + sum);