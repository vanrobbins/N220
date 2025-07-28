//============================================================================
// PROBLEM 1: Generation Classification Based on Birth Year
//============================================================================

const currentYear = new Date().getFullYear();
function validateYear(value, fieldName, min = 1, max = currentYear) {
	const errors = [];
	const cleanValue = value.trim(); // Remove whitespace

	// Check if empty
	if (!cleanValue || cleanValue === "") {
		errors.push(`${fieldName} is required`);
		return errors;
	}

	// Convert to number
	const num = parseInt(cleanValue);

	// Check if it's a valid number
	if (isNaN(num)) {
		errors.push(`${fieldName} must be a valid number`);
		return errors;
	}

	// Check for decimals (if original value contains a decimal)
	if (cleanValue.includes(".")) {
		errors.push(`${fieldName} cannot have decimals`);
	}

	// Check minimum value
	if (num < min) {
		errors.push(`${fieldName} must be at least ${min}`);
	}

	// Check maximum value
	if (num > max) {
		errors.push(`${fieldName} cannot exceed ${max}`);
	}

	return errors;
}
function clearErrors(resultId, inputId) {
	if (!resultId) return;
	resultId.textContent = "";
	if (inputId && inputId.classList) {
		inputId.classList.remove("error");
	}
}

// Event listener for generation classification
document.getElementById("submit-btn1").addEventListener("click", generation);

/**
 * Determines generation based on birth year and displays result
 */
function generation() {
	let message; // Final output message
	const result1 = document.getElementById("results1");
	const inputField1 = document.getElementById("birth-year");
	const yearEntry = inputField1.value; // Get user input

	// Clear any previous errors
	clearErrors(result1, inputField1);

	// Validate the entered year
	const errors = validateYear(yearEntry, "Birth Year", 1900, currentYear);

	// If there are validation errors, display them and exit
	if (errors.length > 0) {
		message = errors.join("<br>");
		result1.innerHTML = message;
		return;
	}

	// Process valid year and determine generation
	const birthYear = parseInt(yearEntry);
	switch (
		true // Switch on true to evaluate ranges
	) {
		case birthYear >= 1946 && birthYear <= 1964:
			message = "You are a member of the Baby Boomer Generation!";
			break;
		case birthYear >= 1965 && birthYear <= 1980:
			message = "You are part of Generation X!";
			break;
		case birthYear >= 1981 && birthYear <= 1996:
			message = "You belong in the Y Generation!";
			break;
		case birthYear >= 1997 && birthYear <= 2012:
			message = "Generation Z is your generation!";
			break;
		case birthYear >= 2013 && birthYear <= 2025:
			message = "You are part of Generation Alpha.";
			break;
		default:
			message = "Sorry - your generation is not listed.";
	}

	result1.textContent = message;
}

//============================================================================
// PROBLEM 2: Class Grade Analysis
//============================================================================

const result2 = document.getElementById("results2");
function average(arrayNum) {
	let sum = 0;
	// Sum all values in the array
	for (item of arrayNum) {
		sum += item;
	}
	return sum / arrayNum.length;
}
function genRandScores(numScores) {
	let scores = [];
	for (let i = 0; i < numScores; i++) {
		// Generate random score between 51-100
		scores.push(Math.floor(Math.random() * 50) + 51);
	}
	return scores;
}
function classRank(scores, outputElement) {
	const avgScore = average(scores);

	// Build output message with scores and average
	let message = `Scores: [${scores.join(", ")}]<br>Average: ${avgScore.toFixed(2)}<br><br>`;

	// Determine class ranking based on average
	if (avgScore > 75) {
		message += "You are in the top 25% of the class!";
	} else if (avgScore >= 60) {
		message += "You passed the class!";
	} else {
		message += "Sorry - you did not pass the class. Better luck next time!";
	}

	outputElement.innerHTML = message;
}

// Event listener for given scores analysis
document.getElementById("submit-btn2-given").addEventListener("click", function () {
	const givenScores = [87, 56, 92, 77]; // Predefined test scores
	classRank(givenScores, result2);
});

// Event listener for random scores analysis
document.getElementById("submit-btn2-rand").addEventListener("click", function () {
	const randomScores = genRandScores(4); // Generate 4 random scores
	classRank(randomScores, result2);
});

//============================================================================
// PROBLEM 3: Random Number Generator (1-5)
//============================================================================

const result3 = document.getElementById("results3");
function oneToFive(output) {
	const num = Math.floor(Math.random() * 5) + 1; // Random number 1-5

	// Display message based on generated number
	switch (num) {
		case 1:
			output.textContent = "The lowest number you can get";
			break;
		case 2:
			output.textContent = "This is the lowest even number you can get";
			break;
		case 3:
			output.textContent = "Right smack in the middle";
			break;
		case 4:
			output.textContent = "Good number!";
			break;
		default: // Case 5
			output.textContent = "Way to roll!";
			break;
	}
}

// Event listener for random number generation
document.getElementById("submit-btn3").addEventListener("click", function () {
	oneToFive(result3);
});

//============================================================================
// PROBLEM 4: Day Calculator (5 Days Later)
//============================================================================

const result4 = document.getElementById("results4");
const inputId4 = document.getElementById("weekday");
const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
function fiveDaysLater(input, output) {
	const day = input.value.toLowerCase(); // Convert to lowercase for comparison
	console.log(day);
	console.log(days.includes(day));

	// Check if entered day is valid
	if (days.includes(day)) {
		// Calculate index of day 5 days later (using modulo for week wraparound)
		let newDayI = (days.indexOf(day) + 5) % 7;
		// Capitalize first letter and display result
		output.textContent =
			"It will be " + days[newDayI].charAt(0).toUpperCase() + days[newDayI].slice(1) + " in five days.";
		return;
	}

	// Display error for invalid day
	output.textContent = "Error: invalid day entered";
	return;
}

// Event listener for day calculation
document.getElementById("submit-btn4").addEventListener("click", function () {
	fiveDaysLater(inputId4, result4);
});

//============================================================================
// PROBLEM 5: Favorite Color Display
//============================================================================

const result5 = document.getElementById("results5");
// Array of color objects using String constructor
const colors = [
	new String("Red"),
	new String("Orange"),
	new String("Blue"),
	new String("Green"),
	new String("Purple"),
	new String("Yellow"),
];

// Event listener to display favorite color (yellow - index 5)
document.getElementById("submit-btn5").addEventListener("click", function () {
	result5.textContent = `My favorite color is ${colors[5].toLowerCase()}.`;
});
