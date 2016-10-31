//File:		handlers.js
//Project:	COEN 174 Degree Tracker
//By:		Brett Harrison (@Architex)
//Checkboxes and dropdowns for department.
//Events are checkbox clicks and dropdown add clicks.
//Dropdown will contain checkbox info--any classes satisfied by a dropdown
//	will be checked off. 
//Mouse-over option to delete nodes
//

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

	var parent;
	var text;
	var node = document.createElement("LI");
	var nodeId;

	if(id.id == "otherButton"){
		parent = document.getElementById("otherList");
		text = document.createTextNode(document.getElementById("otherDropdown").value+' '+pad(document.getElementById("otherNumber").value));
		nodeId = document.getElementById("otherDropdown").value+' '+pad(document.getElementById("otherNumber").value);
		if(!inputCheck(document.getElementById("otherNumber").value)){
			document.getElementById("otherNumber").focus();
			return;
		}
	}
	else if(id.id == "futureButton"){
		parent = document.getElementById("futureList");
		text = document.createTextNode(document.getElementById("futureDropdown").value+' '+pad(document.getElementById("futureNumber").value));
		nodeId = document.getElementById("futureDropdown").value+' '+pad(document.getElementById("futureNumber").value);
		node.setAttribute("class", "fCourse");
		if(!inputCheck(document.getElementById("otherNumber").value)){
			document.getElementById("futureNumber").focus();
			return;
		}
	}

	for(var i = 0; i < document.getElementById("otherList").children.length; i++){
		if(nodeId == document.getElementById("otherList").children[i].id)
			return;
	}
	for(var j = 0; j < document.getElementById("futureList").children.length; j++){
		if(nodeId == document.getElementById("futureList").children[j].id)
			return;
	}
	node.appendChild(text);
	node.id = nodeId;
	node.setAttribute("onmouseenter", "delHoverOn(this)");
	node.setAttribute("onmouseleave", "delHoverOff(this)");
	node.setAttribute("onclick", "clickChild(this)");
	parent.appendChild(node);

	saveList(parent);
}

function delHoverOn(id){
	id.style.color = "red";
}

function delHoverOff(id){
	id.style.color = "black";
}

function clickChild(id){
	var parent = id.parentElement;
	parent.removeChild(id);

	cutCookie(id);
}

function clickSearch(id){

}