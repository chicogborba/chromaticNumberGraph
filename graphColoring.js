class GraphColoring {
    constructor(graph, graphCanvas) {
        this.graph = graph;
        this.graphCanvas = graphCanvas;
        this.colors = []; // Array para armazenar as cores dos nós
        this.speed = 500; // Velocidade de execução (em milissegundos)
        this.availableColors = ['lightblue', 'lightgreen', 'lightcoral', 'lightseagreen', 'lightsalmon', 'lightpink', 'lightsteelblue', 'lightgoldenrodyellow', 'lightcyan', 'lightgray']; // Cores disponíveis
    }

    // Método para iniciar a coloração
    async colorGraph() {
        this.colors = new Array(this.graph.nodes.length).fill(-1); // -1 significa sem cor
        let colorCount = 0; // Contador de cores usadas

        // Loop até que todos os nós sejam coloridos
        for (let i = 0; i < this.graph.nodes.length; i++) {
            // Tentar colorir o nó atual com a primeira cor disponível
            if (await this.assignColor(i, colorCount)) {
                colorCount++; // Incrementar o contador de cores
            }
        }

        console.log(`Número cromático: ${colorCount}`);
    }

    // Método para tentar atribuir uma cor a um nó
    async assignColor(nodeIndex, colorCount) {
        for (let color = 0; color < colorCount; color++) {
            if (this.isSafe(nodeIndex, color)) {
                this.colors[nodeIndex] = color; // Atribuir a cor ao nó
                await this.visualize(nodeIndex, color); // Visualizar a coloração
                return true; // Cor atribuída com sucesso
            }
        }
        // Se não houver cores disponíveis, use a próxima cor
        this.colors[nodeIndex] = colorCount;
        await this.visualize(nodeIndex, colorCount);
        return true;
    }

    // Método para verificar se é seguro colorir um nó
    isSafe(nodeIndex, color) {
        for (const edge of this.graph.edges) {
            if (edge.from === nodeIndex && this.colors[edge.to] === color) {
                return false; // Conflito de cores
            }
            if (edge.to === nodeIndex && this.colors[edge.from] === color) {
                return false; // Conflito de cores
            }
        }
        return true; // Seguro colorir
    }

    // Método para visualizar a coloração do nó
    async visualize(nodeIndex, color) {
        const node = this.graph.nodes[nodeIndex];
        node.color = this.getColor(color); // Definir a cor do nó
        this.graphCanvas.draw(); // Redesenhar o canvas
        await this.delay(this.speed); // Aguardar a velocidade definida
    }

    // Método para obter a cor correspondente a um índice
    getColor(index) {
        return this.availableColors[index % this.availableColors.length]; // Ciclar pelas cores disponíveis
    }

    // Método para criar um atraso
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
