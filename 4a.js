import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

function getAssignment(sections){
    const assignments = sections.split('-');
    return {
        start: +assignments[0],
        end: +assignments[1]
    }
}

let result = 0;
for await (const line of rl) {
    const pair = line.split(',');
    const assignment1 = getAssignment(pair[0]);
    const assignment2 = getAssignment(pair[1]);
    if ((assignment1.start >= assignment2.start && assignment1.end <= assignment2.end) || (assignment1.start <= assignment2.start && assignment1.end >= assignment2.end)) {
        result++;
    }
}
console.log('Result: ' + result);