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

//Start with an empty list, with each click add a list element with the Dept and Number
function dropdown(id){

	var parent;
	var text;
	var node = document.createElement("LI");
	var nodeId;

	if(id.id == "otherButton"){
		parent = document.getElementById("otherList");
		text = document.createTextNode(document.getElementById("otherDropdown").value+' '+pad(document.getElementById("otherNumber").value));
		nodeId = document.getElementById("otherDropdown").value+pad(document.getElementById("otherNumber").value);
		if(!inputCheck(document.getElementById("otherNumber").value)){
			document.getElementById("otherNumber").focus();
			return;
		}
		checkAndUpdate('otherList', document.getElementById("otherDropdown").value+pad(document.getElementById("otherNumber").value));

	}
	else if(id.id == "futureButton"){
		parent = document.getElementById("futureList");
		text = document.createTextNode(document.getElementById("futureDropdown").value+' '+pad(document.getElementById("futureNumber").value));
		nodeId = document.getElementById("futureDropdown").value+pad(document.getElementById("futureNumber").value);
		node.setAttribute("class", "fCourse");
		if(!inputCheck(document.getElementById("futureNumber").value)){
			document.getElementById("futureNumber").focus();
			return;
		}
		checkAndUpdate('futureList', document.getElementById("futureDropdown").value+pad(document.getElementById("futureNumber").value));
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
	if(typeof(Storage) !== 'undefined'){
		var parent = id.parentElement;
		var list = localStorage.getItem(parent.id);
		
		var startLoc = list.search(id.id);
		if (startLoc == -1)
			console.log("Item Does Not Exist");
		
		var newList = list.substr(0,startLoc);
		var secondList = list.substr(startLoc+8);
		newList = newList + secondList;
		
		localStorage.setItem(parent.id,newList);
		checkAndDelete(id.id);
		parent.removeChild(id);
	}
}
function loadListenter(){
	document.querySelector("#otherForm").addEventListener("keypress", function(e){
		var key = e.which || e.keyCode;
	    if (key === 13)
			dropdown(document.querySelector("#otherButton"));
		else
			return;
	}, false);

	document.querySelector("#futureForm").addEventListener("keypress", function(e){
		const keyName = e.key;
		if(keyName == 'Enter')
			dropdown(document.querySelector("#futureButton"));
		else
			return;
	}, false);
}