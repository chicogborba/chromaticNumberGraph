class BacktrackingGraphColoring {
    constructor(graph, graphCanvas) {
        this.graph = graph;
        this.graphCanvas = graphCanvas;
        this.colors = [];
        this.minColors = Infinity;
        this.speed = 100;
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

    // Inicia a coloração do grafo
    async colorGraph() {
        this.colors = new Array(this.graph.nodes.length).fill(-1);
        await this.backtrack(0);
        console.log(`Número cromático: ${this.minColors}`);
    }

    // Verifica se é seguro colorir o nó
    async isSafe(nodeIndex, color) {
        for (const edge of this.graph.edges) {
            if (edge.from === nodeIndex || edge.to === nodeIndex) {
                const adjacentNodeIndex = edge.from === nodeIndex ? edge.to : edge.from;
                await this.highlightEdge(edge, true);

                if (this.colors[adjacentNodeIndex] === color) {
                    await this.highlightEdge(edge, false);
                    return false; // Não é seguro colorir
                }

                await this.highlightEdge(edge, false);
            }
        }

        return true; // É seguro colorir
    }

async backtrack(nodeIndex) {
    if (nodeIndex === this.graph.nodes.length) {
        // Todos os nós foram coloridos, verifica o número de cores utilizadas
        const usedColors = new Set(this.colors);
        this.minColors = Math.min(this.minColors, usedColors.size);
        await this.visualizeAll();
        return true; // Retorna verdadeiro se todas as cores foram atribuídas
    }

    for (let color = 0; color < this.availableColors.length; color++) {
        if (await this.isSafe(nodeIndex, color)) {
            this.colors[nodeIndex] = color;
            await this.visualize(nodeIndex, color);
            console.log(`Colorindo nó ${nodeIndex} com cor ${color}`);

            // Chama recursivamente a função para o próximo nó
            if (await this.backtrack(nodeIndex + 1)) {
                return true; // Se a coloração for bem-sucedida, retorna verdadeiro
            }

            // Se não for possível, remove a cor (backtrack)
            console.log(`Backtracking: removendo cor do nó ${nodeIndex}`);
            this.colors[nodeIndex] = -1; // Remover a cor
            await this.visualize(nodeIndex, -1); // Visualiza a remoção da cor
        }
    }

    return false; // Retorna falso se não foi possível colorir
}

async visualize(nodeIndex, color) {
    if (color === -1) {
        this.graph.nodes[nodeIndex].color = null; // Remove a cor
        console.log(`Nó ${nodeIndex} sem cor`);
    } else {
        this.graph.nodes[nodeIndex].color = this.getColor(color);
    }
    
    // Adiciona um destaque visual (ex: muda a borda ou o fundo)
    this.graphCanvas.draw();
    await this.delay(this.speed);
}

    // Visualiza todos os nós com suas cores finais
    async visualizeAll() {
        for (let i = 0; i < this.graph.nodes.length; i++) {
            this.graph.nodes[i].color = this.getColor(this.colors[i]);
        }
        this.graphCanvas.draw();
        await this.delay(this.speed);
    }

    // Destaca uma aresta específica
    async highlightEdge(edge, highlight) {
        edge.highlighted = highlight;
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
