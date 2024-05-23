
const rows = 6;
const columns = 7;

const board = Array.from({length: rows}, () => Array(columns).fill(' '));

let player = 'R';

function printBoard() {
    console.log(' 1 2 3 4 5 6 7')
    for(let row of board) {
        console.log('|' +  row.join('|') + '|')
    }
    console.log('----------------')
}

function availableColumn(col) {
    for(let i = rows -1; i >= 0; i--) {
        if(board[i][col] === ' ') {
            return i;
        }
    }
    return null;
}

function checkDirection(row, col, rowDir, colDir, player) {
    let count = 1;

    count += countDiscs(row, col, rowDir, colDir, player) // forward;
    count += countDiscs(row, col, -rowDir, -colDir, player) // backward;

    return count >= 4;
}


function countDiscs(row,col, rowDir, colDir) {
    let count = 0;
    for(let i = 1; i < 4; i++) {
        let r = row + i * rowDir;
        console.log(`🚀 ~ countDiscs ~ r ${row} + ${i} * ${rowDir}:`, r )
        let c = col + i * colDir;
        console.log(`🚀 ~ countDiscs ~ c ${col} + ${i} * ${colDir}:`, c)
        if (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === player) {
            count++;
        } else {
            break;
        }
    }
    console.log("🚀 ~ countDiscs ~ count:", count)
    return count;
}

function play(input) {
    input = parseInt(input) - 1;
    if(input < 0 || input > columns || isNaN(input)) {
        console.log('Invalid input')
        return;
    }

    const row = availableColumn(input);
    if(row === null) {
        console.log('Column already have token')
        return;
    }

    board[row][input] = player;
    const horizontalWin = checkDirection(row, input, 0, 1)
    const verticalWin = checkDirection(row, input, 1, 0)
    const diagonalLeft = checkDirection(row, input, 1, 1)
    const diagonalRight = checkDirection(row, input, 1, -1)
    
    if(diagonalRight || diagonalLeft || horizontalWin || verticalWin) {
        console.log(`Player ${player} wins!`)
        return;
    }

    player = player === 'R' ? 'Y' : 'R';
}
play(1); // R
play(2); // Y
play(2); // R
play(3); // Y
play(3); // R
play(4); // Y
play(3); // R
play(4); // R
play(5); // Y
play(4); // R
play(6)
play(7)
play(4)
printBoard();





