console.log('Graph class loaded');

class Node {
    constructor(x, y, color, label) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.label = label;
        this.blueBorder = false;
        this.orangeBorder = false;
    }
}

class Graph {
    constructor(initialGraph) {
        this.nodes = [];
        this.edges = [];

        // Se um grafo inicial for fornecido, insira-o
        if (initialGraph) {
            this.insertGraph(initialGraph);
        }
    }

    // Método para adicionar um nó
    addNode(x, y) {
        const newNode = new Node(x, y, 'lightyellow', `${this.nodes.length}`);
        this.nodes.push(newNode);
    }

    // Método para adicionar uma aresta
    addEdge(fromIndex, toIndex) {
        this.edges.push({ from: fromIndex, to: toIndex });
    }

    // Método para deletar um nó
    deleteNode(nodeIndex) {
        this.nodes.splice(nodeIndex, 1);
        this.edges = this.edges.filter(edge => edge.from !== nodeIndex && edge.to !== nodeIndex);
    }

    // Método para encontrar o índice de um nó com base na posição
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

    // Método para imprimir o grafo como uma lista de adjacência
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

    // Método para limpar o grafo
    clear() {
        this.nodes = [];
        this.edges = [];
    }

    clearColoring() {
        this.nodes.forEach(node => {
            node.color = 'lightyellow';
            node.blueBorder = false;
            node.orangeBorder = false;
        });
        this.edges.forEach(edge => {
            edge.highlighted = false
        });
    }

    // Método para inserir um grafo a partir de um objeto
    insertGraph(graphObject) {
        // Adicionar nós
        graphObject.nodes.forEach(node => {
            const newNode = new Node(node.x, node.y, node.color, node.label);
            this.nodes.push(newNode);
        });

        // Adicionar arestas
        graphObject.edges.forEach(edge => {
            this.addEdge(edge.from, edge.to);
        });
    }

    // Método para obter o grafo atual como um objeto
    getGraph() {
        return {
            nodes: this.nodes,
            edges: this.edges
        };
    }
}
