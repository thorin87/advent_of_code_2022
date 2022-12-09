import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

let result = 0;
const map = [];
let i = 0;
for await (const line of rl) {
    map[i++] = line;
}
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        
    }
}


console.log('Result: ' + result);