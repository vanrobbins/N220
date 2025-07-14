//Dating
let ticketNum = 3;
let ticketCost = 14.0;
let ttCost = ticketCost * ticketNum;
const ticketNumElem = document.getElementById("ticketNum");
const ticketCostElem = document.getElementById("ticketCost");
const ttCostElem = document.getElementById("ttCost");
ticketNumElem.textContent += ` ${ticketNum}`;
ticketCostElem.textContent += `${ticketCost.toFixed(2)}`;
ttCostElem.textContent += `${ttCost.toFixed(2)}`;

//Shopping
let money = 235.87;
let neededItems = ["Shirt", "Pants", "Shoes"];
// Document Elements
const shoppingListElem = document.getElementById("shoppingList");
const itemsElem = shoppingListElem.getElementsByTagName("li");
const bankElem = document.getElementById("bank");
const affordJackElem = document.getElementById("addJacket");
// Create a dictionary/object from the shopping list
const shoppingItems = {};

// Loop through each list item and extract name and price
for (let i = 0; i < itemsElem.length; i++) {
	const itemText = itemsElem[i].textContent; // e.g., "Jacket: $70"
	const [name, priceString] = itemText.split(": $"); // Split at ": $"
	const price = parseFloat(priceString); // Convert string to number
	shoppingItems[name] = price; // Add to dictionary
}
//Loop through needed items and subtract item value from money
for (const item of neededItems) {
	// Checks if key is needed
	if (shoppingItems.hasOwnProperty(item)) {
		money -= shoppingItems[item]; // If item needed remove item value from total money
	}
}

bankElem.textContent = `After Outfit: $${money}`;
// Update afford Jacket element to results of expression (true / false)
affordJackElem.textContent = `Add Jacket: ${money >= shoppingItems["Jacket"]}`;

//Pizza
let pizzaNum = 5;
let pizzaSlice = 8;
let studentEat = 2.5;
const totalSlice = pizzaNum * pizzaSlice;
const studentsFed = Math.floor(totalSlice / studentEat);
console.log(studentsFed);
const profPizza = totalSlice - studentEat * studentsFed;
const studentsFedElem = document.getElementById("studentsFed");
const profPizzaElem = document.getElementById("profPizza");
studentsFedElem.textContent = `${studentsFed} students will be fed`;
profPizzaElem.textContent = `${profPizza} pieces are left for the prof`;

//Monty's Mega Bar
let montyTotal = 0;
const montyElem = document.getElementById("Monty");
const montysPrices = {
	Adult: 12.0,
	Child: 6.0,
	Drink: 1.5,
};
const order = {
	Adult: 2,
	Child: 1,
	Drink: 3,
};
for (const item in order) {
	montyTotal += montysPrices[item] * order[item];
}
montyElem.textContent = `Total: $${montyTotal.toFixed(2)}`;

//Avg Tips
let tipSum = 0;
let avgTips = 0;
// Document Elements
const weeklyTipsElem = document.getElementById("weeklyTips");
const tipItemsElem = weeklyTipsElem.getElementsByTagName("li");
const avgResultElem = document.getElementById("tips");
const weeks = tipItemsElem.length;
//Extract weekly tip value and add to sum
for (let i = 0; i < weeks; i++) {
	const tipText = tipItemsElem[i].textContent;
	const tipAmount = parseFloat(tipText.split(": ")[1]);
	tipSum += tipAmount;
}
avgTips = tipSum / weeks;
avgResultElem.textContent = `Average tips: $${avgTips.toFixed(2)}`;
