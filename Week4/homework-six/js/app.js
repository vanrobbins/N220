// Array of possible computer choices for Rock Paper Scissors
let compArray = ["Rock", "Paper", "Scissors"];

// Variable to track the player's score throughout the game
let innerScore = 0;

// Get reference to the score display element in the HTML
let score = document.getElementById("score");

// Get reference to the result display element in the HTML
let resultDecision = document.getElementById("result-decision");

// Get all elements with class "choice" (player's choice buttons)
const choices = document.getElementsByClassName("choice");

// Style the choice elements
for (let choice of choices) {
	choice.style.cursor = "pointer";
	choice.style.color = "blue";
	choice.style.textDecoration = "underline";
}

// Main Rock Paper Scissors game function
function RPS(numb) {
	// Generate random computer choice from the array
	let compDecision = compArray[Math.floor(Math.random() * compArray.length)];

	// Display the computer's choice to the player
	resultDecision.innerHTML = "The computer chose: " + compDecision;

	// Log computer's choice for debugging
	console.log(compDecision);

	// Log player's choice number for debugging
	console.log(numb);

	// Handle player choice: Rock (0)
	if (numb == 0) {
		if (compDecision == "Paper") {
			// Paper beats Rock - player loses
			innerScore -= 1;
		} else if (compDecision == "Scissors") {
			// Rock beats Scissors - player wins
			innerScore += 1;
		} else {
			// Rock vs Rock - tie (subtract 0.5 as per game rules)
			innerScore -= 0.5;
		}
	}

	// Handle player choice: Paper (1)
	if (numb == 1) {
		if (compDecision == "Rock") {
			// Paper beats Rock - player wins
			innerScore += 1;
		} else if (compDecision == "Scissors") {
			// Scissors beats Paper - player loses
			innerScore -= 1;
		} else {
			// Paper vs Paper - tie (subtract 0.5 as per game rules)
			innerScore -= 0.5;
		}
	}

	// Handle player choice: Scissors (2)
	if (numb == 2) {
		if (compDecision == "Rock") {
			// Rock beats Scissors - player loses
			innerScore -= 1;
		} else if (compDecision == "Paper") {
			// Scissors beats Paper - player wins
			innerScore += 1;
		} else {
			// Scissors vs Scissors - tie (subtract 0.5 as per game rules)
			innerScore -= 0.5;
		}
	}
    
	// Update the score display on the webpage
	score.innerHTML = "Score: " + innerScore;
}
