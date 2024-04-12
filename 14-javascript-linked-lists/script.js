class Node {
    constructor(value, nextNode) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(value) {
        if (this.head === null) {
            this.prepend(value);
        } else {
            let tempNode = this.head;
            while (tempNode.nextNode !== null) {
                tempNode = tempNode.nextNode;
            }

            const newNode = new Node(value, null);
            tempNode.nextNode = newNode;
        }
    }

    prepend(value) {
        const newNode = new Node(value, this.head);
        this.head = newNode;
    }

    size() {
        let n = 0;
        let counter = this.head;
        while (counter !== null) {
            if (counter.value) {
                n++;
            }
            counter = counter.nextNode;
        }
        return n;
    }

    listHead() {
        return this.head;
    }

    tail() {
        let node = this.head;
        while (node.nextNode !== null) {
            node = node.nextNode;
        }
        return node;
    }

    atIndex(index) {
        let node = this.head;
        for (let i = 0; i < index; i++) {
            if (i === index - 1) {
                node.value;
            } else {
                node = node.nextNode;
            }
        }
        return node;
    }

    pop() {
        let node = this.head;
        while (node.nextNode.nextNode !== null) {
            node = node.nextNode;
        }
        node.nextNode = null;
    }

    contains(value) {
        let node = this.head;
        let contains = false;
        while (node.nextNode !== null) {
            if (node.value === value) {
                contains = true;
                break;
            }
            node = node.nextNode;
        }
        return contains;
    }

    find(value) {
        let node = this.head;
        let counter = 0;
        while (node.nextNode !== null) {
            if (node.value === value) {
                return counter;
            }
            counter++;
            node = node.nextNode;
        }
        return null;
    }

    toString() {
        let node = this.head;
        let str = '';
        while (node !== null) {
            str += `(${node.value}) -> `;
            node = node.nextNode;
        }
        str += 'null';
        return str;
    }

    insertAt(value, index) {
        if (index === 0) {
            list.prepend(value);
        } else {
            let node = this.head;
            let temp = node.nextNode;
            for (let i = 0; i < index - 1; i++) {
                temp = node.nextNode.nextNode;
                node = node.nextNode;
            }
            const newNode = new Node(value, temp);
            node.nextNode = newNode;
        }
    }

    removeAt(index) {
        if (index === 0) {
            this.head = this.head.nextNode;
        } else {
            let node = this.head;
            for (let i = 0; i < index - 1; i++) {
                node = node.nextNode;
            }
            node.nextNode = node.nextNode.nextNode;
        }
    }
}

let list = new LinkedList();

let nodes = [];
for (let i = 0; i < 10; i++) {
    nodes.push(new Node(i));
    list.append(nodes[i].value);
}

console.log('linked list:', list);
console.log('size:', list.size());
console.log('head:', list.listHead());
console.log('tail:', list.tail());
console.log('at index 6:', list.atIndex(6));
console.log('contains 4:', list.contains(4));
console.log('find 7:', list.find(7));
console.log('toString:', list.toString());

list.insertAt('joker', 2);
console.log('insert at 2:', list.toString());
list.pop()
console.log('pop:', list.toString());
