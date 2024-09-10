const spot = document.querySelectorAll("div.spot");
let team = "X";
const circleSpots = [];
const xSpots = [];
const WINNING_COMBINATIONS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
const winningMessageElement = document.getElementById("winningMessage");
const playagainBtn = document.getElementById("playagainBtn");


let clickCounts = 0; //clickCounts is integer
spot.forEach((element) => element.addEventListener("click", function placeItem() {

    clickCounts++;

    switch (team) {
        case "circle":
            this.children[0].style.display = "block";
            this.removeEventListener("click", placeItem);
            team = "X";

            // store spot number to the team spots array
            circleSpots.push(getSpotNumber(this.id));
            console.log(circleSpots);

            // check if circle wins
            if (checkWin(WINNING_COMBINATIONS, circleSpots)) {
                console.log("Ghost Wins!")

                // add wining effects
                winningMessageElement.children[0].innerText = "Ghost Wins!"
                winningMessageElement.classList.add('show');

                // trigger re-start button
                playagainBtn.addEventListener('click', function(){
                    this.style.display = "none";
                    location.reload();
                })
            }
            break;
        case "X":
            this.children[1].style.display = "block";
            this.removeEventListener("click", placeItem);
            team = "circle";

            // store spot number to the team spots array
            xSpots.push(getSpotNumber(this.id));
            console.log(xSpots);

            // Need a function to check if X wins
            if (checkWin(WINNING_COMBINATIONS, xSpots)) {
                console.log("Pumpkin Wins!")

                // add wining effects
                winningMessageElement.children[0].innerText = "Pumpkin Wins!"
                winningMessageElement.classList.add('show')
                // trigger re-start button
                playagainBtn.addEventListener('click', function(){
                    this.style.display = "none";
                    location.reload();
                })
            }
            break;
    }

    // check if the game draws
    // check clickCounts == 9 & !checkWin(Ghost) & !checkWin(Pumpkin)
    if (clickCounts == 9 && !checkWin(WINNING_COMBINATIONS, circleSpots) && !checkWin(WINNING_COMBINATIONS, xSpots)) {

        winningMessageElement.children[0].innerText = "Draw!"
        winningMessageElement.classList.add('show')

        // trigger re-start button
        playagainBtn.addEventListener('click', function(){
            this.style.display = "none";
            location.reload();
        })
    }

}));

// transfer the html ID to number
function getSpotNumber(ID) {
    return Number(ID[4]);
}

function checkWin(WinCases, TeamSpotList) {  
    // WinCases is Input1, TeamSpotList is Input2
    let sum = 0;
    let ifWin = false;
    for (let j = 0; j < WinCases.length; j++) {
        // console.log(WinCases[j]);
        // WinCases[j] is a three-element array
        sum = 0;
        for (let i = 0; i < TeamSpotList.length; i++) {
            // console.log(i);
            //TeamSpotList will be circleSpots or xSpots
            if (WinCases[j][0] == TeamSpotList[i]) {
                sum++;
            }
            if (WinCases[j][1] == TeamSpotList[i]) {
                sum++;
            }
            if (WinCases[j][2] == TeamSpotList[i]) {
                sum++;
            }
        }

        if (sum == 3) {
            // console.log("Win!")
            ifWin = true;
        }
    }

    return ifWin;
}