//File:		logic.js
//Project:	COEN 174 Degree Tracker
//By:		Brett Harrison (@Architex)
//Checkboxes and dropdowns for department.
//Events are checkbox clicks and dropdown add clicks.
//Dropdown will contain checkbox info--any classes satisfied by a dropdown
//	will be checked off. 
//Mouse-over option to delete nodes
//

function addClass(){

}

function delClass(){

}

function colorUpdate(){

}

function checkbox(id){
	//updateArray(this.value);
	if(id.style.color == "green")
		id.style.color = "black";
	else
		id.style.color = "green";
}

function updateArray(item){
	if(greenClasses.find(item))
		return;

}

//Start with an empty list, with each click add a list element with the Dept and Number
function dropdown(id){
	document.getElementById("testdiv").innerHTML = document.getElementById("otherDropdown").value+document.getElementById("otherNumber").value;
}