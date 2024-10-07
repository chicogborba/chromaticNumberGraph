console.log('Graph class loaded');

class Node {
    constructor(x, y, color, label) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.label = label;
    }
}

class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(x, y) {
        const newNode = new Node(x, y, 'lightyellow', `Nó ${this.nodes.length}`);
        this.nodes.push(newNode);
    }

    addEdge(fromIndex, toIndex) {
        this.edges.push({ from: fromIndex, to: toIndex });
    }

    deleteNode(nodeIndex) {
      this.nodes.splice(nodeIndex, 1);
      this.edges = this.edges.filter(edge => edge.from !== nodeIndex && edge.to !== nodeIndex);
    }


    getNodeIndex(x, y) {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
            if (distance < 20) {
                return i;
            }
        }
        return -1;
    }

    // Formato clássico: Representação como lista de adjacência
    printGraph() {
        const adjacencyList = {};
        this.nodes.forEach((_, index) => {
            adjacencyList[index] = [];
        });
        this.edges.forEach((edge) => {
            adjacencyList[edge.from].push(edge.to);
            adjacencyList[edge.to].push(edge.from); // Grafo não direcionado
        });
        console.log(adjacencyList);
    }

    clear() {
        this.nodes = [];
        this.edges = [];
    }
}
