class GraphColoring {
    constructor(graph, graphCanvas) {
        this.graph = graph;
        this.graphCanvas = graphCanvas;
        this.colors = [];
        this.speed = 1000;
        this.availableColors = [
          'lightblue', 
          'lightgreen', 
          'lightcoral', 
          'lightseagreen', 
          'lightsalmon', 
          'lightpink', 
          'lightsteelblue', 
          'lightgoldenrodyellow', 
          'lightcyan', 
          'lightgray',
        ];
    }

    generateRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    updateSpeed(speed) {
        this.speed = speed;
    }
    // Inicia a coloração dos nós
    async colorGraph() {
        this.colors = new Array(this.graph.nodes.length).fill(-1);
        let colorCount = 0;

        for (let i = 0; i < this.graph.nodes.length; i++) {
            await this.highlightNode(i, 'blue', true); // Destaca o nó atual

            if (await this.assignColor(i, colorCount)) {
                colorCount++;
            }

            await this.highlightNode(i, 'blue', false);
        }

        console.log(`Número cromático: ${colorCount}`);
    }

    // Tenta atribuir uma cor ao nó atual
    async assignColor(nodeIndex, colorCount) {
        for (let color = 0; color < colorCount; color++) {
            if (await this.isSafe(nodeIndex, color)) {
                this.colors[nodeIndex] = color;
                await this.visualize(nodeIndex, color);
                return true;
            }
        }

        this.colors[nodeIndex] = colorCount;
        await this.visualize(nodeIndex, colorCount);
        return true;
    }

    // Verifica se é seguro colorir o nó
    async isSafe(nodeIndex, color) {
        for (const edge of this.graph.edges) {
            if (edge.from === nodeIndex || edge.to === nodeIndex) {
                const adjacentNodeIndex = edge.from === nodeIndex ? edge.to : edge.from;
                await this.highlightEdge(edge, true);

                if (this.colors[adjacentNodeIndex] === color) {
                    await this.highlightEdge(edge, false);
                    return false;
                }

                await this.highlightEdge(edge, false);
            }
        }

        return true;
    }

    // Visualiza a coloração do nó
    async visualize(nodeIndex, color) {
        this.graph.nodes[nodeIndex].color = this.getColor(color);
        this.graphCanvas.draw();
        await this.delay(this.speed);
    }

    // Destaca uma aresta específica
    async highlightEdge(edge, highlight) {
        edge.highlighted = highlight;
        this.graphCanvas.draw();
        await this.delay(this.speed / 2);
    }

    // Destaca um nó específico
    async highlightNode(nodeIndex, color, highlight) {
        this.graph.nodes[nodeIndex][`${color}Border`] = highlight;
        this.graphCanvas.draw();
        await this.delay(this.speed / 2);
    }

    getColor(index) {
        // Caso as cores tenham acabado, gera uma cor aleatória e a adiciona ao array de cores disponíveis
        if (index >= this.availableColors.length) {
            this.availableColors.push(this.generateRandomColor());
        }
        return this.availableColors[index % this.availableColors.length];
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
