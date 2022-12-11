import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

let result = 0;
const map = [];
const maxHeight = [];
let i = 0;
for await (const line of rl) {
    map[i++] = line;
}

for (let i = 0; i < map.length; i++) {
    maxHeight[i] = [];
    for (let j = 0; j < map[i].length; j++) {
        if (i === 0) {
            maxHeight[i][j] = {
                up: +map[i][j]
            };
            result++;
        } else if (i === map.length - 1) {
            maxHeight[i][j] = {
                down: +map[i][j]
            };
            result++;
        } else {
            if (j === 0) {
                maxHeight[i][j] = {
                    left: +map[i][j]
                };
                result++;
            } else if (j === map[i].length - 1) {
                maxHeight[i][j] = {
                    right: +map[i][j]
                };
                result++;
            }
        }
    }
}

for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[i].length - 1; j++) {
        let height = {};
        if (maxHeight[i][j]) {
            height = maxHeight[i][j];
        }
        height.up = Math.max(maxHeight[i-1][j].up, +map[i-1][j]);
        height.left = Math.max(maxHeight[i][j-1].left, +map[i][j-1]);
        maxHeight[i][j] = height;

        height = {};
        const downIndex = map.length - 1 - i;
        const rightIndex = map[i].length - 1 - j;
        if (maxHeight[downIndex][rightIndex]) {
            height = maxHeight[downIndex][rightIndex];
        }
        height.down = Math.max(maxHeight[downIndex+1][rightIndex].down, +map[downIndex+1][rightIndex]);
        height.right = Math.max(maxHeight[downIndex][rightIndex+1].right, +map[downIndex][rightIndex+1]);
        maxHeight[downIndex][rightIndex] = height;
    }
}

for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[i].length - 1; j++) {
        const current = +map[i][j];
        // console.log (i, j, current, maxHeight[i][j]);
        if (current > maxHeight[i][j].up || current > maxHeight[i][j].down || current > maxHeight[i][j].left || current > maxHeight[i][j].right) {
            result++;
        }
    }
}

console.log('Result: ' + result);