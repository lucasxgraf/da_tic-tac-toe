let fields = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

let currentPlayer = "X"; // Startet mit X

function init() {
  render();
}

function render() {
  let htmlTable = '<table>';
  for (let row = 0; row < 3; row++) {
    htmlTable += '<tr>';
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      let content = "";

      if (fields[index] === "X") {
        content = createCrossSVG();
      } else if (fields[index] === "O") {
        content = createCircleSVG();
      }

      const onclickAttr = fields[index] === "" ? `onclick="handleClick(${index})"` : "";
      htmlTable += `<td id="field-${index}" ${onclickAttr}>${content}</td>`;
    }
    htmlTable += '</tr>';
  }
  htmlTable += '</table>';
  document.getElementById('content').innerHTML = htmlTable;
}

function handleClick(index) {
  fields[index] = currentPlayer;

  // Nur dieses Feld aktualisieren
  const clickedTd = document.getElementById("field-" + index);
  if (currentPlayer === "X") {
    clickedTd.innerHTML = createCrossSVG();
  } else {
    clickedTd.innerHTML = createCircleSVG();
  }

  clickedTd.removeAttribute("onclick");

  // Spieler wechseln
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Funktion, um ein SVG für den Kreis zu erstellen
function createCircleSVG() {
  return `
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" stroke="#00B0EF" stroke-width="8" fill="none">
        <animate attributeName="stroke-dasharray" from="0, 251.2" to="251.2, 0" dur="0.5s" fill="freeze" />
      </circle>
    </svg>
  `;
}

// Funktion, um ein SVG für das Kreuz zu erstellen
function createCrossSVG() {
  return `
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="8" stroke-linecap="round">
        <animate attributeName="x2" from="20" to="80" dur="0.3s" fill="freeze" />
        <animate attributeName="y2" from="20" to="80" dur="0.3s" fill="freeze" />
      </line>
      <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="8" stroke-linecap="round">
        <animate attributeName="x2" from="80" to="20" dur="0.3s" fill="freeze" />
        <animate attributeName="y2" from="20" to="80" dur="0.3s" fill="freeze" />
      </line>
    </svg>
  `;
}