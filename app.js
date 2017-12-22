/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, regularScore, activePlayer, gamePlaying;


setIntialState();


//document.querySelector("#current-" + activePlayer).textContent = dice;



document.querySelector(".btn-roll").addEventListener("click", function() {
	if(gamePlaying == true){
			var dice = Math.floor(Math.random() * 6) + 1; // Generating Random Number 
	    var diceDOM = document.querySelector(".dice");
	    diceDOM.style.display = "block"; // displaying dice result
	    diceDOM.src = "dice-" + dice + ".png";

    // Updating scores
    if (dice !== 1) 
    {
        //when player doesn't role 1
        regularScore += dice; //Adding scores to regular Score
        document.querySelector("#current-" + activePlayer).textContent = regularScore; // updating score 
    } 
    else 
	    {
	    	nextPlayer(); //Changing Player
		}
	}
});

document.querySelector(".btn-hold").addEventListener("click", function(){
	if(gamePlaying){
		scores[activePlayer] += regularScore; // adding current score to global score on pressing hold button
	document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]; // Updating Global score and UI
	var setScore = document.querySelector(".winning-score").value;
	var winningScore;
	if(setScore){
		winningScore = setScore;
	}
	else{
		winningScore =100;
	}
	if(scores[activePlayer] >= winningScore){
		document.querySelector("#name-" + activePlayer).textContent = "WINNER";
		document.querySelector(".dice").style.display = "none"; // Removing dice when player roles 1
		document.querySelector(".player-"+activePlayer+"-panel").classList.toggle("winner");
		document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
		document.getElementById("current-0").textContent = 0;
		document.getElementById("current-1").textContent = 0;
		gamePlaying = false;
	}
	else{
		nextPlayer(); //Changing player
	}
	}		
});

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // changing player
        regularScore = 0; // again updating current score to zero bz palyer rolled 1
        document.getElementById("current-0").textContent = "0";
        document.getElementById("current-1").textContent = "0";
        document.querySelector(".player-0-panel").classList.toggle("active"); //changing css of current player 
        document.querySelector(".player-1-panel").classList.toggle("active");
        document.querySelector(".dice").style.display = "none"; // Removing dice when player roles 1
 
}

document.querySelector(".btn-new").addEventListener("click", setIntialState);


function setIntialState(){
	scores = [0,0];
	regularScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.querySelector(".dice").style.display = "none";
	document.getElementById("score-0").textContent = 0;
	document.getElementById("score-1").textContent = 0;
	document.getElementById("current-0").textContent = 0;
	document.getElementById("current-1").textContent = 0;
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active"); //changing css of current player 
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}