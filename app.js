

const allCells = document.querySelectorAll('.cell:not(.toprow)');
const topCells = document.querySelectorAll('.cell.toprow');
const replayBut = document.querySelector('.replay');
const statusSpan = document.querySelector('.status');


const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]];
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]];
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]];
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]];
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]];
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]];
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];
// an array of the above array

const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]];
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]];
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]];
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]];
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]];
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]];
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];
// an array of the above array

let gamePlay = true;
// tells if game is on our not
let yellowIsNext = true;
// determines who is the next player

const getClassList = (cell) => {
  const classList = cell.classList;
  return [...classList];
};
// converts the class list into the array which we later use to grab the 
// row and column index

const getCellLocation = (cell) => {
  const classList = getClassList(cell);

  const rowClass = classList.find(className => className.includes('row'));
  const colClass = classList.find(className => className.includes('col'));
  const indexOfRow = rowClass[4];
  const indexOfColumn = colClass[4];
  const rowNum = parseInt(indexOfRow, 10);
  const colNum = parseInt(indexOfColumn, 10);

  return [rowNum, colNum];
};

// by calling getClassList above this isolates the row and column number to get the
// location of the cell

const firstOpenCell = (indexOfColumn) => {
const column = columns[indexOfColumn];
const columnWithoutTop = column.slice(0, 6);

  // goes through columns and shows first available, also takes out the top row that is "outside" of the game 
  // board that is only used to show which column user is hovering over. 
// (0,6) isolates the number by grabbing the 6th index in the output.

  for (const cell of columnWithoutTop) {
    const classList = getClassList(cell);
    if (!classList.includes('yellow') && !classList.includes('black')) {
      return cell;
    }
  }
 // Identifies if the class is not yellow or black that means it is open and is the next available cell 
  return null;
  // if there are no open cells
};

const changeChipColor = (indexOfColumn) => {
  const topCell = topCells[indexOfColumn];
  topCell.classList.remove('yellow');
  topCell.classList.remove('black');
  
};

const colorOfCell = (cell) => {
const classList = getClassList(cell);
if (classList.includes('yellow')) return 'yellow';
if (classList.includes('black')) return 'black';
return null;
};

const checkWinningCells = (cells) => { 
  if (cells.length < 4) return false;

  gamePlay = false;
  for (const cell of cells) {
    cell.classList.add('win');

  }
  statusSpan.textContent = `${yellowIsNext ? 'Yellow' : 'Black'} has won!`
  return true;

};
// checks for a similar class of cells of 4 in a row 

const gameStatus = (cell) => {
  const color = colorOfCell(cell);
  if (!color) return;
  const [indexOfRow, indexOfColumn] = getCellLocation(cell);
  

  // horizontal cells win check
let winningCells= [cell];
let checkPatternRow = indexOfRow;
let checkPatternCol = indexOfColumn -1;
while (checkPatternCol >= 0) {
  const checkCell = rows[checkPatternRow][checkPatternCol];
  if (colorOfCell(checkCell) === color) {
    winningCells.push(checkCell);
    checkPatternCol--;
  } else {
    break;
  }
}
checkPatternCol = indexOfColumn +1;
while (checkPatternCol <=6) {
  const checkCell = rows[checkPatternRow][checkPatternCol];
  if (colorOfCell(checkCell) === color) {
    winningCells.push(checkCell);
    checkPatternCol++;
  } else {
    break;
  }
};
let connectFour = checkWinningCells(winningCells);
if (connectFour) return;

// vertical cells win check
winningCells= [cell];
checkPatternRow = indexOfRow -1;
checkPatternCol = indexOfColumn;
while (checkPatternRow >= 0) {
  const checkCell = rows[checkPatternRow][checkPatternCol];
  if (colorOfCell(checkCell) === color) {
    winningCells.push(checkCell);
    checkPatternRow--;
  } else {
    break;
  }
}
checkPatternRow = indexOfRow+1;
while (checkPatternRow <=5) {
  const checkCell = rows[checkPatternRow][checkPatternCol];
  if (colorOfCell(checkCell) === color) {
    winningCells.push(checkCell);
    checkPatternRow++;
  } else {
    break;
  }
};
connectFour = checkWinningCells(winningCells);
if (connectFour) return;

// diagonal LR cells win check

winningCells= [cell];
checkPatternRow = indexOfRow +1;
checkPatternCol = indexOfColumn -1;
while (checkPatternCol >=0 && checkPatternRow <= 5) {
  const checkCell = rows[checkPatternRow][checkPatternCol];
  if (colorOfCell(checkCell) === color) {
    winningCells.push(checkCell);
    checkPatternRow++;
    checkPatternCol--;
  } else {
    break;
  }
}
checkPatternRow = indexOfRow -1;
checkPatternCol = indexOfColumn +1;
while (checkPatternCol <=6 && checkPatternRow >= 0) {
  const checkCell = rows[checkPatternRow][checkPatternCol];
  if (colorOfCell(checkCell) === color) {
    winningCells.push(checkCell);
    checkPatternRow--;
    checkPatternCol++;
  } else {
    break;
  }
};
connectFour = checkWinningCells(winningCells);
if (connectFour) return;


// diagonal RL cells win check

winningCells= [cell];
checkPatternRow = indexOfRow -1;
checkPatternCol = indexOfColumn -1;
while (checkPatternCol >=0 && checkPatternRow >= 0) {
  const checkCell = rows[checkPatternRow][checkPatternCol];
  if (colorOfCell(checkCell) === color) {
    winningCells.push(checkCell);
    checkPatternRow--;
    checkPatternCol--;
  } else {
    break;
  }
}
checkPatternRow = indexOfRow +1;
checkPatternCol = indexOfColumn +1;
while (checkPatternCol <=6 && checkPatternRow <= 6) {
  const checkCell = rows[checkPatternRow][checkPatternCol];
  if (colorOfCell(checkCell) === color) {
    winningCells.push(checkCell);
    checkPatternRow++;
    checkPatternCol++;
  } else {
    break;
  }
};
connectFour = checkWinningCells(winningCells);
if (connectFour) return;

// TIE win check 

const emptyTop = rows.slice(0,6);
for (const row of emptyTop){
  for (const cell of row) {
    const classList = getClassList(cell);
    if (!classList.includes('yellow') && !classList.includes('black')) {
      return;
    }
  }
}
gamePlay = false;
statusSpan.textContent = "Its a Tie";
};


// event handlers
const mouseoverCell = (e) => {
  if (!gamePlay) return;
  const cell = e.target;
  const [indexOfRow, indexOfColumn] = getCellLocation(cell)
  const topCell = topCells[indexOfColumn];
  if (yellowIsNext) {
    topCell.classList.add('yellow');
  } else {
    topCell.classList.add('black');
  }
};

// Shows game piece at column that player is hovering over, it will choose its color based on 
// the boolean "yellowIsNext"

mouseoutCell  = (e) => {
const cell = e.target;
const [indexOfRow, indexOfColumn] = getCellLocation(cell);
changeChipColor(indexOfColumn);

topCell = topCells[indexOfColumn];
topCell.classList.remove('yellow');
topCell.classList.remove('black');
};
// removes class of coin when mouse is not over game 

clickOnCell = (e) => {
  if (!gamePlay) return;
const cell = e.target;
const [indexOfRow, indexOfColumn] = getCellLocation(cell);

// on click puts the game piece in the open row and column that was hovered over

const openCell = firstOpenCell(indexOfColumn);
if (!openCell) return;

  openCell.classList.add(yellowIsNext ? 'yellow' : 'black');
  gameStatus(openCell);


  yellowIsNext = !yellowIsNext;
  changeChipColor(indexOfColumn);

};
 //  makes top turn to next color

// Event Listeners


for (const row of rows) {
  for (const cell of row) {
    cell.addEventListener('mouseover', mouseoverCell);
    cell.addEventListener('mouseout', mouseoutCell);
    cell.addEventListener('click', clickOnCell);
}};


// adds gamepiece to top of columm when mouse is hovering over cells
// removes gamepiece to top of columm when mouse is hovering over cells
// listens for click over cell




replayBut.addEventListener('click', () => {
for (const row of rows) {
  for (const cell of row) {
    cell.classList.remove('black');
    cell.classList.remove('yellow');
    cell.classList.remove('win');
  }
}
// removes classes when Replay Button is pressed to present an empty game board
gamePlay = true;
yellowIsNext = true;
statusSpan.textContent = ''
});