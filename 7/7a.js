import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, terminal: false });

const NodeType = {
    Dir: 'Dir',
    File: 'File'
};

const rootNode = {
    type: NodeType.Dir,
    name: '/',
    parent: null,
    children: []
}
let currentNode = rootNode;

let result = 0;
for await (const line of rl) {
    if (line.charAt(0) === '$') { // command
        const command = line.substring(2, 4);
        switch (command) {
            case 'cd':
                const newDir = line.substring(5);
                switch (newDir) {
                    case '/':
                        currentNode = rootNode;
                    break;
                    case '..':
                        currentNode = currentNode.parent;
                    break;
                    default:
                        currentNode = currentNode.children.find(x => x.name === newDir);
                }
            break;
            case 'ls':
                continue;
        }
    } else {
        if (line.substring(0, 3) === 'dir') {
            currentNode.children.push({
                type: NodeType.Dir,
                name: line.substring(4),
                parent: currentNode,
                children: []
            });
        } else {
            const fileInfo = line.split(' ');
            currentNode.children.push({
                type: NodeType.File,
                size: +fileInfo[0],
                name: fileInfo[1],
                parent: currentNode
            });
        }
    }
}

function calculateSize(node) {
    const subDirs = node.children.filter(x => x.type === NodeType.Dir);
    subDirs.forEach(subDir => {
        calculateSize(subDir);
    });
    node.size = node.children.reduce((accumulator, currentNode) => accumulator += currentNode.size, 0);
    if (node.size < 100000) {
        result += node.size;
    }
}

calculateSize(rootNode);
console.log('Result: ' + result);