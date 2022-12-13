import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

const map = [];
let i = 0;
for await (const line of rl) {
    map[i++] = line;
}

const Direction = {
    Up: 'Up',
    Rigth: 'Right',
    Down: 'Down',
    Left: 'Left'
};

const directions = [Direction.Up, Direction.Rigth, Direction.Down, Direction.Left];

function move(x, y, direction) {
    let newX = x;
    let newY = y;
    switch (direction) {
        case Direction.Up:
            newX--;
            break;
        case Direction.Rigth:
            newY++;
            break;
        case Direction.Down:
            newX++;
            break;
        case Direction.Left:
            newY--;
            break;
    };
    return {X: newX, Y: newY};
}

function calcScore(x, y, direction) {
    let initHeight = +map[x][y];
    let distance = 0;
    let newPlace;
    let newPlaceHeight;
    do {
        newPlace = move(x, y, direction);
        x = newPlace.X;
        y = newPlace.Y;
        newPlaceHeight = +map[x][y];
        distance++;
    } while (newPlaceHeight < initHeight && x > 0 && x < map.length - 1 && y > 0 && y < map[x].length - 1);
    return distance;
}

let maxScore = 0;
for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[i].length - 1; j++) {
        let score = 1;
        directions.forEach(direction => {
            score *= calcScore(i, j, direction);
        });
        if (score > maxScore) {
            maxScore = score;
        }
    }
}

console.log('Result: ' + maxScore);