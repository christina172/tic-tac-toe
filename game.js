const playerFactory = (name) => {
    let score = 0;
    return { name, score };
};


const Gameboard = (function () {

    let gameBoard = [];
    for (let j = 0; j < 9; j++) {
        gameBoard[j] = document.querySelector(`#c${j}`);
    };

    const lines = [[gameBoard[0], gameBoard[1], gameBoard[2]],
    [gameBoard[3], gameBoard[4], gameBoard[5]],
    [gameBoard[6], gameBoard[7], gameBoard[8]],
    [gameBoard[0], gameBoard[3], gameBoard[6]],
    [gameBoard[1], gameBoard[4], gameBoard[7]],
    [gameBoard[2], gameBoard[5], gameBoard[8]],
    [gameBoard[0], gameBoard[4], gameBoard[8]],
    [gameBoard[2], gameBoard[4], gameBoard[6]]];

    return { gameBoard, lines };
})();


function play(e) {

    e.preventDefault();
    const checkVal = document.querySelector("form").checkValidity();
    document.querySelector("form").reportValidity();

    if (checkVal) {
        const playerOne = playerFactory(`${document.getElementById("name-one").value}`);
        const playerTwo = playerFactory(`${document.getElementById("name-two").value}`);
        console.log("playerOne.name ", playerOne.name);
        console.log("playerTwo.name ", playerTwo.name);
        console.log("NEW GAME");
        document.querySelector(".form-popup").style.display = "none";

        const announcement = document.querySelector(".announcement");
        const backup = document.querySelector(".backup");
        const firstName = document.querySelector(".first-player");
        const secondName = document.querySelector(".second-player");

        firstName.textContent = `First player: ${document.getElementById("name-one").value}`;
        secondName.textContent = `Second player: ${document.getElementById("name-two").value}`;
        Gameboard.gameBoard.forEach(element => {
            element.textContent = "";
            element.classList.remove("x");
            element.classList.remove("o");
        });
        announcement.textContent = "";
        backup.textContent = "";

        function game(item) {
            item.addEventListener("click", () => {
                if (item.textContent !== "x" && item.textContent !== "o" && announcement.textContent === "") {
                    if (playerOne.score === playerTwo.score) {
                        item.classList.add("x");
                        item.textContent = "x";
                        playerOne.score++;
                        console.log("playerOne.score ", playerOne.score);
                    } else {
                        item.classList.add("o");
                        item.textContent = "o";
                        playerTwo.score++;
                        console.log("playerTwo.score ", playerTwo.score);
                    }
                    for (let k = 0; k < Gameboard.lines.length; k++) {
                        if (Gameboard.lines[k][0].textContent === "x" && Gameboard.lines[k][1].textContent === "x" && Gameboard.lines[k][2].textContent === "x") {
                            backup.textContent = "First player won";
                            backup.classList.add("first-player");
                            announcement.textContent = `Congratulations, ${document.getElementById("name-one").value}! You won. Don't worry ${document.getElementById("name-two").value}, you'll win next time!`;
                            playerOne.score = 0;
                            playerTwo.score = 0;
                            document.querySelector("form").reset();

                        };
                        if (Gameboard.lines[k][0].textContent === "o" && Gameboard.lines[k][1].textContent === "o" && Gameboard.lines[k][2].textContent === "o") {
                            backup.textContent = "Second player won";
                            backup.classList.add("second-player");
                            announcement.textContent = `Congratulations, ${document.getElementById("name-two").value}! You won. Don't worry ${document.getElementById("name-one").value}, you'll win next time!`;
                            playerOne.score = 0;
                            playerTwo.score = 0;
                            document.querySelector("form").reset();
                        }
                    }
                    if (playerOne.score === 5 && playerTwo.score === 4) {
                        backup.textContent = "It's a tie!";
                        playerOne.score = 0;
                        playerTwo.score = 0;
                        document.querySelector("form").reset();
                    }
                }
            })
        }
        Gameboard.gameBoard.map(game);
    };
};

function openForm() {
    document.querySelector(".form-popup").style.display = "block";
};


function closeForm() {
    document.querySelector(".form-popup").style.display = "none";
};


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".start").addEventListener("click", play);
    document.querySelector(".cancel").addEventListener("click", closeForm);
    document.querySelector(".open").addEventListener("click", openForm);
});