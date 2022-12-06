import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

let ship = [];
ship[1] = ['Z', 'T', 'F', 'R', 'W', 'J', 'G'];
ship[2] = ['G', 'W', 'M'];
ship[3] = ['J', 'N', 'H', 'G'];
ship[4] = ['J', 'R', 'C', 'N', 'W'];
ship[5] = ['W', 'F', 'S', 'B', 'G', 'Q', 'V', 'M'];
ship[6] = ['S', 'R', 'T', 'D', 'V', 'W', 'C'];
ship[7] = ['H', 'B', 'N', 'C', 'D', 'Z', 'G', 'V'];
ship[8] = ['S', 'J', 'N', 'M', 'G', 'C'];
ship[9] = ['G', 'P', 'N', 'W', 'C', 'J', 'D', 'L'];

for await (const line of rl) {
    const matches = line.match(/move (\d+) from (\d) to (\d)/);
    if (matches) {
        const qty = matches[1];
        const from = matches[2];
        const to = matches[3];
        const moved = ship[from].splice(-qty, qty);
        ship[to].push(...moved);
    }
}

let result = '';
for (let i = 1; i <= 9; i++) {
    result += ship[i][ship[i].length - 1];
}
console.log('Result: ' + result);