// Get DOM element references
const title = document.getElementById("title");
const container = document.getElementById("container");
const list = document.querySelector("ul");
const newLi7 = document.createElement("li");
const newLi8 = document.createElement("li");
const button = document.getElementById("btn");
const italicElement = document.createElement("i");

// Change the page title
title.innerHTML = "DOM Manipulation";

// Set container background color to light blue
container.style.backgroundColor = "lightblue";

// Create and add the 7th list item
newLi7.textContent = "Item 7";
list.appendChild(newLi7);

// Style existing list items with different colors
list.children[0].style.color = "crimson"; // First item - crimson text
list.children[2].style.backgroundColor = "pink"; // Third item - pink background
list.children[4].style.backgroundColor = "yellow"; // Fifth item - yellow background
list.children[6].style.backgroundColor = "lightGray"; // Seventh item - light gray background
list.children[6].style.color = "royalBlue"; // Seventh item - royal blue text

// Create and add the 8th list item with student name
newLi8.textContent = "Van Robbins";
list.appendChild(newLi8);

// Remove the 4th list item (Item 4)
list.children[3].remove();

// Create italic styling for button text
italicElement.textContent = button.textContent; // Copy button's current text to italic element
button.textContent = ""; // Clear button's text content
button.appendChild(italicElement); // Add italic element as child of button

// Style the button with rebeccapurple background, white text and border
button.style.backgroundColor = "rebeccapurple";
button.style.color = "white";
button.style.border = "2px solid white";
