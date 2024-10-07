class File {
  constructor() {
    this.filename = ''; // Armazena o nome do arquivo
  }

  setFilename(filename) {
    this.filename = filename; // Define o nome do arquivo
  }

  read = (file) => {
    this.file = file;
    return this;
  };

  save = (data) => {
    const blob = new Blob([JSON.stringify(data)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = this.filename; // Usa o nome do arquivo definido
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
}
