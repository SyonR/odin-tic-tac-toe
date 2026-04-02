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
            token: "X",
        },
        {
            name: playerTwoName,
            token: "O",
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

function ScreenController() {
    let playerOneName;
    let playerTwoName;
    let game;

    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    const startMenu = document.querySelector("#start-menu");
    const startMenuCloseButton = document.querySelector("#start-menu-close-button");

    const updateScreen = () => {
        boardDiv.textContent = "";

        const activePlayer = game.getActivePlayer();
        const board = game.getBoard();

        playerTurnDiv.textContent = `${activePlayer.name}'s Turn`;
        
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.column = columnIndex;
                cellButton.dataset.row = rowIndex;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            });
        });

        console.log("Screen has been updated");
    };

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
        const board = game.getBoard(); //CANT INITIALIZE IN FUNCTION BECAUSE IT MAY NOT HAVE BEEN INTIALIZED YET

        if ((!selectedColumn) || (!selectedRow)) {
            e.preventDefault();
            return;
        }; //THIS WORKS BECAUSE SELECTED ROW AND COLUMN ARE STRINGS SO "0" IS TRUTHY!

        if (board[selectedRow][selectedColumn].getValue() != "0") {
            console.log("THIS CELL IS TAKEN");
            e.preventDefault();
            return;
        }

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    function clickStartGame(e) {
        playerOneName = document.getElementById("player1").value;
        playerTwoName = document.getElementById("player2").value;
        
        if ((!playerOneName) || (!playerTwoName)) {
            e.preventDefault();
            return;
        };

        game = GameController(playerOneName, playerTwoName);    
        updateScreen();
    }
    
    boardDiv.addEventListener("click", clickHandlerBoard);
    startMenuCloseButton.addEventListener("click", clickStartGame);

    startMenu.showModal();
}

ScreenController();
