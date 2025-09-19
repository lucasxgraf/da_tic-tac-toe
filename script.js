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

// Alle möglichen Gewinnkombinationen
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikal
  [0, 4, 8], [2, 4, 6]             // diagonal
];

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

  // Prüfen ob das Spiel vorbei ist
  const winningCombo = checkGameOver();
  if (winningCombo) {
    drawWinningLine(winningCombo);
    disableAllClicks();
  } else {
    // Spieler wechseln
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Funktion zum Testen ob das Spiel vorbei ist
function checkGameOver() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return combo; // Gibt die Gewinnkombination zurück
    }
  }
  return null; // Kein Gewinner
}

// Funktion zum Zeichnen der Gewinnlinie
function drawWinningLine(combination) {
  const lineColor = '#ffffff';
  const lineWidth = 5;

  const cells = document.querySelectorAll('td');
  const startCell = cells[combination[0]];
  const endCell = cells[combination[2]];
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();
  const contentRect = document.getElementById('content').getBoundingClientRect();

  const lineLength = Math.sqrt(
    Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
  );
  const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

  const line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.width = `${lineLength}px`;
  line.style.height = `${lineWidth}px`;
  line.style.backgroundColor = lineColor;
  line.style.top = `${(startRect.top + startRect.height / 2) - contentRect.top - lineWidth / 2}px`;
  line.style.left = `${(startRect.left + startRect.width / 2) - contentRect.left}px`;
  line.style.transform = `rotate(${lineAngle}rad)`;
  line.style.transformOrigin = 'top left';

  document.getElementById('content').appendChild(line);
}

// Funktion zum Deaktivieren aller Klicks nach Spielende
function disableAllClicks() {
  for (let i = 0; i < 9; i++) {
    const field = document.getElementById(`field-${i}`);
    if (field) {
      field.removeAttribute('onclick');
    }
  }
}

// Funktion, um ein SVG für den Kreis zu erstellen
function createCircleSVG() {
  return `
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" stroke="#00B0EF" stroke-width="8" fill="none">
        <animate attributeName="stroke-dasharray" from="0, 251.2" to="251.2, 0" dur="0.5s" fill="freeze" />
      </circle>
    </svg>
  `;
}

// Funktion, um ein SVG für das Kreuz zu erstellen
function createCrossSVG() {
  return `
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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