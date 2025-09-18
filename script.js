let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

function init() {
  render();
}

// Funktion zum Rendern der Tabelle
function render() {
  let htmlTable = '<table>';
  for (let row = 0; row < 3; row++) {
    htmlTable += '<tr>';
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      htmlTable += `<td>${fields[index]}</td>`;
    }
    htmlTable += '</tr>';
  }
  htmlTable += '</table>';

  // Tabelle in den Container einfügen
  document.getElementById('content').innerHTML = htmlTable;
}
