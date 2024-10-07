console.log('Script.js loaded');
const graph = new Graph();
const graphCanvas = new GraphCanvas('graphCanvas', graph);

// Evento para imprimir o grafo no console
document.getElementById('printGraph').addEventListener('click', () => {
    graph.printGraph();
});

// Evento para limpar o grafo
document.getElementById('clearGraph').addEventListener('click', () => {
    graphCanvas.clear();
});

document.getElementById('zoom+').addEventListener('click', () => {
    graphCanvas.zoom(1.1);
});

document.getElementById('zoom-').addEventListener('click', () => {
    graphCanvas.zoom(0.9);
});


