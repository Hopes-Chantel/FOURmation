// selectors
const allCells = document.querySelectorAll('.cell:not(.row-top)');
const topCells = document.querySelectorAll('.cell row-top');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.status');

// columns for the game board
const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]];
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]];
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]];
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]];
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]];
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]];
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];


// rows for the vame board 
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]];
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]];
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]];
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]];
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]];
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]];
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];

// game variables 

let gameIsLive = true;
let yellowIsNext = true;


const getClassListArray = (cell) => {
    const classList = cell.classList
    return ([...classList]);
};
    
// this function above will turn classList into an array 

const getCellLocation = (cell) => {
    const classList = getClassListArray(cell);
    
    const rowClass = classList.find(className => className.includes('row'));
    const columnClass = classList.find(className => className.includes ('col'));
    const whichRow = rowClass[4];
    const whichCol = columnClass[4];
    const rowNumber = parseInt(whichRow,10);
    const columnNumber = parseInt(whichCol,10);

 return [rowNumber, columnNumber];
};

// gives an array of row and column



//event handlers
const cellMouseOver = (e) => {
    const cell = e.target;
const [whichRow,whichColumn] = getCellLocation(cell);

const topCell = topCells[whichColumn];
topCell.classList.add(yellowIsNext ? 'yellow' : 'red');
};

// when users click on the column location. Need code that will detect where they click and 
// find the first open spot for their game piece


// event listeners

for (const row of rows) {
    for (const cell of row) {
        cell.addEventListener('mouseover', cellMouseOver);
    
    }
}

// need a reset button


// need to see why I am gettin an event listener error