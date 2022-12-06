import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

let result = 0;
let last13char = [];
for await (const line of rl) {
    for (let i = 0; i < line.length; i++) {
        const repeatedAt = last13char.indexOf(line[i]);
        if (repeatedAt >= 0) {
            last13char.splice(0, repeatedAt + 1);
        }
        if (last13char.length === 13) {
            result = i + 1;
            last13char = [];
            break;
        } else {
            last13char.push(line[i]);
        }
    }
    console.log('Result: ' + result);
}
