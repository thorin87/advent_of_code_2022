import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

let result = 0;
let last3char = [];
for await (const line of rl) {
    for (let i = 0; i < line.length; i++) {
        const repeatedAt = last3char.indexOf(line[i]);
        if (repeatedAt >= 0) {
            last3char.splice(0, repeatedAt + 1);
        }
        if (last3char.length === 3) {
            result = i + 1;
            last3char = [];
            break;
        } else {
            last3char.push(line[i]);
        }
    }
    console.log('Result: ' + result);
}
