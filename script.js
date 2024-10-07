console.log('Script.js loaded');
const graph = new Graph();
const graphCanvas = new GraphCanvas('graphCanvas', graph);
const graphColoring = new GraphColoring(graph, graphCanvas); // Instanciando a classe GraphColoring

// Evento para imprimir o grafo no console
document.getElementById('printGraph').addEventListener('click', () => {
    graph.printGraph();
});

// Evento para limpar o grafo
document.getElementById('clearGraph').addEventListener('click', () => {
    graphCanvas.clear();
});

// Evento para zoom
document.getElementById('zoom+').addEventListener('click', () => {
    graphCanvas.zoom(1.1);
});

document.getElementById('zoom-').addEventListener('click', () => {
    graphCanvas.zoom(0.9);
});

// Evento para iniciar o algoritmo de coloração
document.getElementById('startAlgorithm').addEventListener('click', () => {
    graphColoring.colorGraph(); // Inicia a coloração
});
