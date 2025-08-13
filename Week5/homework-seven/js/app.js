///--- Prof Code Start---///
function getTarget(e) {
	if (!e) {
		e = window.event;
	}
	return e.target || e.srcElement;
}

var viewInfo = document.querySelector("main");
viewInfo.addEventListener("click", displayInfo, false);

function displayInfo(e) {
	var target = getTarget(e);
	if (target.tagName == "H2") {
		var tParent = target.parentNode;
		var parentDiv = tParent.children;
		console.log(parentDiv[1]);
		if (parentDiv[1].style.display == "none") {
			parentDiv[1].style.display = "block";
		} else {
			parentDiv[1].style.display = "none";
		}
	}
}

var myList = document.querySelector("#codeList ul");
var addBtn = document.getElementsByTagName("input")[0];

addBtn.addEventListener("click", addItem, false);

function addItem() {
	var newItem = prompt("New Item:");
	var newLI = document.createElement("li");
	var newLIText = document.createTextNode(newItem);
	newLI.appendChild(newLIText);
	///--- Prof Code End ---///
	var trashIcon = document.createElement("img");
	trashIcon.setAttribute("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/27019/trashcanIcon.png");
	trashIcon.className = "listIcon";
	newLI.appendChild(trashIcon);
	myList.appendChild(newLI);
}

// Get all list items inside the codeList ul
var listItems = document.querySelectorAll("#codeList li");

// Loop through each list item
for (var i = 0; i < listItems.length; i++) {
	// Create an img element
	var trashIcon = document.createElement("img");
	// Set the src attribute to the trashcan image location
	trashIcon.setAttribute("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/27019/trashcanIcon.png");
	// Add the class name 'listIcon'
	trashIcon.className = "listIcon";
	// Append the image to the current list item
	listItems[i].appendChild(trashIcon);
}
// Add event listener to the list
myList.addEventListener("click", changeProp, false);

function changeProp(e) {
	var target = getTarget(e);
	var tParent = target.parentNode;

	// If the parent is a list item (LI), remove the list item (clicked the trashcan)
	if (tParent.tagName == "LI") {
		myList.removeChild(tParent);
	}
	// If the target is a list item (LI) and NOT an image, toggle the 'selected' class (gray out)
	else if (target.tagName == "LI") {
		target.classList.toggle("selected");
	}
}
