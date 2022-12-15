import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

const Direction = {
    Up: 'U',
    Rigth: 'R',
    Down: 'D',
    Left: 'L'
};
const moves = [];

for await (const line of rl) {
    let parts = line.split(' ');
    moves.push({
        direction: parts[0],
        times: +parts[1]
    });
}

function move(x, y, direction) {
    switch (direction) {
        case Direction.Up:
            y++;
            break;
        case Direction.Rigth:
            x++;
            break;
        case Direction.Down:
            y--;
            break;
        case Direction.Left:
            x--;
            break;
    };
    return {x, y};
}

let visited = [{x: 0, y: 0}];

function addToVisited(point) {
    if (visited.some(item => item.x === point.x && item.y === point.y)) {
        return;
    }
    visited.push(point);
}

function isTouching(head, tail) {
    return tail.x >= head.x - 1 && tail.x <= head.x + 1 && tail.y >= head.y - 1 && tail.y <= head.y + 1;
}

let head = {
    x: 0,
    y: 0
};

let tail = {
    x: 0,
    y: 0
};

for (let i = 0; i < moves.length; i++) {
    // console.log(moves[i].direction, moves[i].times);
    for (let j = 0; j < moves[i].times; j++) {
        let newHead = move(head.x, head.y, moves[i].direction);
        if (!isTouching(newHead, tail)) {
            tail = head;
            addToVisited(tail);
        }
        head = newHead;
        // console.log(head, tail);
    }
}

console.log('Result: ' + visited.length);