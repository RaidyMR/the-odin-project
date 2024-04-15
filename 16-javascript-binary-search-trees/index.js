class Node {
    constructor(value = 0) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        array = [...new Set(array)].sort((a, b) => a - b); // Remove Duplicates and sort

		function recursiveBuild(start, end) {
			if (start > end) return null;

			let mid = Math.trunc((start + end) / 2);
			let root = new Node(array[mid]);

			root.left = recursiveBuild(start, mid - 1);
			root.right = recursiveBuild(mid + 1, end);

			return root;
		}

		return recursiveBuild(0, array.length - 1);
    }

    insert(value) {
		(function recursive(root) {
			if (!root) return new Node(value);

			if (root.value > value) {
				root.left = recursive(root.left);
			} else {
				root.right = recursive(root.right);
			}
			return root;
		})(this.root);
	}

	delete(defaultValue) {
		(function recursive(root, value = defaultValue) {
			if (!root) return null;

			if (root.value > value) {
				root.left = recursive(root.left);
			} else if (root.value < value) {
				root.right = recursive(root.right);
			} else {
				if (!root.left) {
					return root.right;
				} else if (!root.right) {
					return root.left;
				}

				let node = root.right;
				while (node.left) {
					node = node.left;
				}
				root.value = node.value;
				root.right = recursive(root.right, node.value);
			}

			return root;
		})(this.root);
	}

	find(value) {
		function recursive(root) {
			if (!root) return null;
			if (root.value === value) return root;

			if (root.value > value) {
				return recursive(root.left);
			}
			return recursive(root.right);
		}

		return recursive(this.root);
	}

	levelOrderIterative(callback = (a) => {}) {
		const queueArray = new Queue();
		let resultArray = [this.root.value];
		queueArray.enqueue(this.root);
		while (!queueArray.isEmpty()) {
			const curr = queueArray.dequeue();
			callback(curr);
			if (curr.left) {
				resultArray.push(curr.left.value);
				queueArray.enqueue(curr.left);
			}
			if (curr.right) {
				resultArray.push(curr.right.value);
				queueArray.enqueue(curr.right);
			}
		}
		return resultArray;
	}

	levelOrderRecursive(callback = (a) => {}) {
		let queueArray = new Queue();
		queueArray.enqueue(this.root);
		let resultArray = [this.root.value];
		(function recursive() {
			const curr = queueArray.dequeue();
			if (curr.left) {
				resultArray.push(curr.left.value);
				queueArray.enqueue(curr.left);
			}
			if (curr.right) {
				resultArray.push(curr.right.value);
				queueArray.enqueue(curr.right);
			}
			if (!queueArray.isEmpty()) {
				recursive();
			}

			callback();
		})();
		return resultArray;
	}

	preorder(callback = () => {}) {
		let resArray = [];
		(function recursive(root) {
			if (!root) return;

			callback(root);
			resArray.push(root.value);
			recursive(root.left);
			recursive(root.right);
		})(this.root);
		return resArray;
	}

	inorder(callback = () => {}) {
		let resArray = [];
		(function recursive(root) {
			if (!root) return;

			recursive(root.left);
			callback(root);
			resArray.push(root.value);
			recursive(root.right);
		})(this.root);
		return resArray;
	}

	postorder(callback = () => {}) {
		let resArray = [];
		(function recursive(root) {
			if (!root) return;

			recursive(root.left);
			recursive(root.right);
			resArray.push(root.value);
			callback(root);
		})(this.root);
		return resArray;
	}

	height(node = this.root) {
		if (!node) return 0;

		return 1 + Math.max(this.height(node.left), this.height(node.right));
	}

	depth(node, tree = this.root) {
		if (!node || !tree) return -1;

		if (node === tree) return 0;

		if (node.value > tree.value) {
			const right = this.depth(node, tree.right);
			return right >= 0 ? 1 + right : right;
		}
		const left = this.depth(node, tree.left);
		return left >= 0 ? 1 + left : left;
	}

	get isBalanced() {
		return (this.height(this.root.left) === this.height(this.root.right));
	}

	rebalance() {
		const vals = this.inorder();
		this.root = this.buildTree(vals);
	}
}

class Queue {
	constructor() {
		this.queue = [];
		this.head = 0;
		this.tail = 0;
	}

	enqueue(value) {
		this.queue[this.tail] = value;
		this.tail++;
	}

	dequeue() {
		const value = this.queue[this.head];
		delete this.queue[this.head];
		this.head++;
		return value;
	}

	isEmpty() {
		return this.tail - this.head === 0;
	}
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node == null) {
		console.log(null);
		return;
	}
	if (node.right != null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
	if (node.left != null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
};

function randNum(max) {
	return 1 + Math.floor(Math.random() * max)
}

const newTree = new Tree(new Array(randNum(randNum(100))).fill(0).map((value) => value + randNum(100)));
// prettyPrint(newTree.root)
console.log(newTree.isBalanced);
console.log(newTree.levelOrderIterative());
console.log(newTree.preorder());
console.log(newTree.inorder());
console.log(newTree.postorder());
for (let i = 0; i < 10; i++) {
	newTree.insert(100 + randNum(900));
}
console.log(newTree.isBalanced);
newTree.rebalance();
console.log(newTree.isBalanced);
console.log(newTree.levelOrderRecursive());
console.log(newTree.preorder());
console.log(newTree.inorder());
console.log(newTree.postorder());