function GameBoard() {
    const rows = 3
    const cols = 3
    const board = []

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const putToken = (row, col, player) => {
        if (board[row][col].getValue() === 0) {
            board[row][col].addToken(player);
        } else {
            console.log("didn't add token");
        }
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log("Printing board");
        console.log(boardWithCellValues);
    };

    return { getBoard, putToken, printBoard };
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };
    
    const getValue = () => value;

    return { addToken, getValue };
}

function GameController(
    playerOneName,
    playerTwoName
) {
    const board = GameBoard()

    const players = [
        {
            name: playerOneName,
            token: 1,
        },
        {
            name: playerTwoName,
            token: 2,
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name}'s token is put into row ${row} column ${column}`);
        board.putToken(row, column, getActivePlayer().token);
        /* Winnger logic & message */
        
        // row check
        for (let i = 0; i < 3; i++) {
            if (board.getBoard()[i][i].getValue() && 
            board.getBoard()[i][i+1].getValue() && 
            board.getBoard()[i][i+2].getValue() == getActivePlayer().token)
                console.log(`${getActivePlayer().name} won`)  
        }
        // col check
        for (let j = 0; j < 3; j++) {
            if (board.getBoard()[j][j].getValue() && 
            board.getBoard()[j+1][j].getValue() && 
            board.getBoard()[j+2][j].getValue() == getActivePlayer().token)
                console.log(`${getActivePlayer().name} won`)  
        }
        // diagonal check
        let m = 0
        let n = 0
        if (board.getBoard()[m][n].getValue() && 
        board.getBoard()[m+1][n+1].getValue() && 
        board.getBoard()[m+2][n+2].getValue() == getActivePlayer().token)
            console.log(`${getActivePlayer().name} won`)
        if (board.getBoard()[m][n+2].getValue() && 
        board.getBoard()[m+1][n+1].getValue() && 
        board.getBoard()[m+2][n].getValue() == getActivePlayer().token)
            console.log(`${getActivePlayer().name} won`)


        switchPlayerTurn()
        printNewRound()
    };
    
    printNewRound(); 

    return { playRound, getActivePlayer, getBoard: board.getBoard };
}

const game = GameController("Player 1", "Player 2");
console.log("game loaded");


