console.log('Script.js loaded');
const graph = new Graph();
const graphCanvas = new GraphCanvas('graphCanvas', graph);
const graphColoring = new GraphColoring(graph, graphCanvas); 
const fileHandler = new File(); 

document.getElementById('clearGraph').addEventListener('click', () => {
    graphCanvas.clear();
});

document.getElementById('clearColor').addEventListener('click', () => {
    graphCanvas.clearColoring();
});

document.getElementById('zoom+').addEventListener('click', () => {
    graphCanvas.zoom(1.1);
});

document.getElementById('zoom-').addEventListener('click', () => {
    graphCanvas.zoom(0.9);
});

document.getElementById('startAlgorithm').addEventListener('click', () => {
    graphColoring.colorGraph(); 
});


document.getElementById('speedRange').addEventListener('input', function () {
    const speedValue = document.getElementById('speedRange').value;
    const speedValuePadded = speedValue.padStart(4, '0');
    document.getElementById('speedValue').textContent = `${speedValuePadded} ms`;
    graphColoring.updateSpeed(speedValue);
});


function exportGraph() {
  console.log('Exportando grafo');
  const graphData = graph.getGraph(); 
  const currentTime = new Date().toISOString().slice(0, 19).replace(/:/g, '-'); 
  const filename = `graph_${currentTime}.txt`;
  fileHandler.setFilename(filename); 
  fileHandler.save(graphData); 
}


async function importGraph(event) {
    console.log('Importando grafo');
    const file = event.target.files[0]; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const graphObject = JSON.parse(e.target.result); 
            graph.insertGraph(graphObject); 
            console.log('Grafo importado com sucesso:', graph.getGraph());
            graphCanvas.draw(); 
        };
        reader.readAsText(file);
}
}

document.getElementById("exportGraph").addEventListener("click", exportGraph);
document.getElementById("importGraph").addEventListener("change", importGraph);