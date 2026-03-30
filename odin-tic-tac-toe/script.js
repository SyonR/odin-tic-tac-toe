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

    const putToken = (row, col, playerToken) => {
        if (board[row][col].getValue() === 0) {
            board[row][col].addToken(playerToken);
            console.log("Token added.");
        } else {
            console.log("Token wasn't added.");
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
        console.log(`Attempting to put ${getActivePlayer().name}'s token into row ${row} column ${column}`);
        board.putToken(row, column, getActivePlayer().token);

        /* Winnger logic & message */
        console.log(`Token is ${getActivePlayer().token}`)
        // row and column check
        for (let i = 0; i < 3; i++) {
            if (board.getBoard()[i][0].getValue() == getActivePlayer().token && 
            board.getBoard()[i][1].getValue() == getActivePlayer().token && 
            board.getBoard()[i][2].getValue() == getActivePlayer().token)
                console.log(`${getActivePlayer().name} won`);

            if (board.getBoard()[0][i].getValue() == getActivePlayer().token && 
            board.getBoard()[1][i].getValue() == getActivePlayer().token && 
            board.getBoard()[2][i].getValue() == getActivePlayer().token)
                console.log(`${getActivePlayer().name} won`);
        }

        // diagonal check
        let m = 0;
        let n = 0;
        if (board.getBoard()[m][n].getValue() == getActivePlayer().token && 
        board.getBoard()[m+1][n+1].getValue() == getActivePlayer().token && 
        board.getBoard()[m+2][n+2].getValue() == getActivePlayer().token)
            console.log(`${getActivePlayer().name} won`);
        if (board.getBoard()[m][n+2].getValue() == getActivePlayer().token && 
        board.getBoard()[m+1][n+1].getValue() == getActivePlayer().token && 
        board.getBoard()[m+2][n].getValue() == getActivePlayer().token)
            console.log(`${getActivePlayer().name} won`);

        // check if everything is filled
        const availableCells = board.getBoard()
        .flat()
        .filter((cell) => cell.getValue() == 0).length
        
        console.log(`${availableCells} cells left`);

        if (!availableCells)
            console.log("Board is filled. Tie!");

        switchPlayerTurn();
        printNewRound();
    };
    
    printNewRound(); 

    return { playRound, getActivePlayer, getBoard: board.getBoard };
}

const game = GameController("Player 1", "Player 2");
console.log("game loaded");


