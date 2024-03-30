function play(playerSelection) {
    const computerSelection = Math.floor(Math.random() * 3); // pick 0 - 2 randomly

    // define winner
    if(playerSelection === computerSelection) {
        draw();
    } else if((playerSelection + 1)%3 == computerSelection) {
        score("computer");
    } else {
        score("player");
    }

    moves(playerSelection, computerSelection);
}

function moves(playerSelection, computerSelection) {
    const possibility = ["rock", "paper", "scissor"];
    const container = document.getElementById("moves");

    // create "moves" images
    const imgPlayer = new Image();
    const imgComputer = new Image();
    imgPlayer.src = `./assets/images/${possibility[playerSelection]}.png`;
    imgComputer.src = `./assets/images/${possibility[computerSelection]}.png`;

    // create "vs" text
    const text = document.createElement("h1");
    text.appendChild(document.createTextNode("VS"));

    // print last moves
    container.innerHTML = "";   
    container.appendChild(imgPlayer); 
    container.appendChild(text);
    container.appendChild(imgComputer);
}

function score(participant) {
    let score = +document.getElementById(participant).innerHTML;
    document.getElementById(participant).innerHTML = score + 1;
    won(participant)
}

function draw() { console.log("draw") }

function won(participant) {
    const round = 5 // FIRST TO $round

    if(document.getElementById(participant).innerHTML >= round) {
        const text = document.createElement("h1");
        const champion = participant.toUpperCase();

        // show modal
        document.querySelector(".modal").classList.toggle("show-modal");

        // show winner
        text.appendChild(document.createTextNode(champion));
        document.getElementById("winner").appendChild(text);
    }
}

function restart() {
    // resetting state
    document.querySelector(".modal").classList.toggle("show-modal");
    document.getElementById("computer").innerHTML = 0;
    document.getElementById("player").innerHTML = 0;
    document.getElementById("moves").innerHTML = "";
    document.getElementById("winner").innerHTML = "";
}