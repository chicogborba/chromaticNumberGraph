class GraphCanvas {
    constructor(canvasId, graph) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Melhorar a resolução do canvas
        const dpi = window.devicePixelRatio * 2;
        this.canvas.width = 800 * dpi;
        this.canvas.height = 600 * dpi;
        this.canvas.style.width = '800px';
        this.canvas.style.height = '600px';
        this.ctx.scale(dpi, dpi);

        this.graph = graph;
        this.selectedNode = null;
        this.draggingNode = null;
        this.zoomFactor = 1; // Armazena o fator de zoom

        this.initEvents();
    }

    initEvents() {
        // Desabilita o menu de contexto do botão direito do mouse
        this.canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        // Evento de clique esquerdo para adicionar um nó
        this.canvas.addEventListener('click', (event) => {
            const { offsetX, offsetY } = event;
            const adjustedX = offsetX / this.zoomFactor; // Ajusta a posição em relação ao zoom
            const adjustedY = offsetY / this.zoomFactor; // Ajusta a posição em relação ao zoom
            const nodeIndex = this.graph.getNodeIndex(adjustedX, adjustedY);

            if (nodeIndex === -1) {
                console.log('Adicionando nó');
                this.graph.addNode(adjustedX, adjustedY);
                this.draw();
            }
        });

        // Evento de clique direito para selecionar um nó e conectá-lo a outro
        this.canvas.addEventListener('mousedown', (event) => {
            const { offsetX, offsetY } = event;

            if (event.button === 2) { // Botão direito do mouse
                const adjustedX = offsetX / this.zoomFactor; // Ajusta a posição em relação ao zoom
                const adjustedY = offsetY / this.zoomFactor; // Ajusta a posição em relação ao zoom
                const nodeIndex = this.graph.getNodeIndex(adjustedX, adjustedY);

                if (nodeIndex !== -1) {
                    if (this.selectedNode !== null) {
                        if (this.selectedNode !== nodeIndex) {
                            this.graph.addEdge(this.selectedNode, nodeIndex);
                            this.selectedNode = null; // Reseta a seleção após conectar
                        }
                    } else {
                        this.selectedNode = nodeIndex;
                    }
                    this.draw();
                }
            } else if (event.button === 0) { // Botão esquerdo do mouse
                // Inicia o arraste se o botão esquerdo for pressionado sobre um nó
                const adjustedX = offsetX / this.zoomFactor; // Ajusta a posição em relação ao zoom
                const adjustedY = offsetY / this.zoomFactor; // Ajusta a posição em relação ao zoom
                const nodeIndex = this.graph.getNodeIndex(adjustedX, adjustedY);
                if (nodeIndex !== -1) {
                    this.draggingNode = nodeIndex;
                }
            }
        });

        // Evento para mover o nó enquanto o mouse está pressionado
        this.canvas.addEventListener('mousemove', (event) => {
            if (this.draggingNode !== null) {
                const { offsetX, offsetY } = event;
                const adjustedX = offsetX / this.zoomFactor; // Ajusta a posição em relação ao zoom
                const adjustedY = offsetY / this.zoomFactor; // Ajusta a posição em relação ao zoom
                const node = this.graph.nodes[this.draggingNode];
                node.x = adjustedX;
                node.y = adjustedY;
                this.draw();
            }
        });

        // Evento para soltar o nó
        this.canvas.addEventListener('mouseup', () => {
            this.draggingNode = null;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Desenha as arestas
        this.graph.edges.forEach((edge) => {
            const fromNode = this.graph.nodes[edge.from];
            const toNode = this.graph.nodes[edge.to];
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            if(edge.highlighted) {
                this.ctx.strokeStyle = 'red';
            }else {
              this.ctx.strokeStyle = 'black';
            }
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });

        // Desenha os nós
        this.graph.nodes.forEach((node, index) => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
            this.ctx.fillStyle = node.color;
            this.ctx.fill();
            if (node.blueBorder) {
                this.ctx.strokeStyle = 'blue';
                this.ctx.lineWidth = 5;
                this.ctx.stroke();
            }
            if (node.orangeBorder) {
                this.ctx.strokeStyle = 'orange';
                this.ctx.lineWidth = 5;
                this.ctx.stroke();
            }
            else {
              this.ctx.strokeStyle = index === this.selectedNode ? 'red' : 'black'; // Borda vermelha se o nó estiver selecionado
              this.ctx.lineWidth = 2;
              this.ctx.stroke();
            }
            this.ctx.fillStyle = 'black';
            // this.ctx.fillText(node.label, node.x , node.y);
            // centralizar label e aumentar tamanho
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(node.label, node.x, node.y);
        });
    }

    zoom(factor) {
        this.zoomFactor *= factor; // Atualiza o fator de zoom
        this.ctx.scale(factor, factor);
        this.draw();
    }

    clear() {
        this.graph.clear();
        this.selectedNode = null;
        this.draggingNode = null;
        this.draw();
    }
}
