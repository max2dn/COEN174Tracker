//File:		handlers.js
//Project:	COEN 174 Degree Tracker
//By:		Brett Harrison (@Architex)
//Checkboxes and dropdowns for department.
//Events are checkbox clicks and dropdown add clicks.
//Dropdown will contain checkbox info--any classes satisfied by a dropdown
//	will be checked off. 
//Mouse-over option to delete nodes
//

var clickFlag = true;
/*
function checkbox(id){
	//updateArray(this.value);
	if(id.style.color == "green")
		id.style.color = "black";
	else
		id.style.color = "green";
}*/
//Clear All
function clearAll(){
	var clear = confirm("Are you sure you want to clear the form?");
	if(!clear)
		return;
	clearLists();
	localStorage.setItem('otherList',"");
	localStorage.setItem('futureList',"");
}

//Start with an empty list, with each click add a list element with the Dept and Number
function dropdown(id){

	var parent;
	var text;
	var node = document.createElement("LI");
	var nodeId;
	
	// If the input is from the "Current Courses Section"
	if(id.id == "otherButton"){
		//Check that fields are filled out
		if(document.getElementById('otherDropdown').value == 'null' || '' == document.getElementById('otherNumber').value){
			document.getElementById("otherDropdown").focus();
			return;
		}

		parent = document.getElementById("otherList");
		text = document.createTextNode(document.getElementById("otherDropdown").value+' '+pad(document.getElementById("otherNumber").value));
		nodeId = document.getElementById("otherDropdown").value+pad(document.getElementById("otherNumber").value);
		
		//Check for duplicates in current classes, if there is one, then return
		for(var i = 0; i < document.getElementById("otherList").children.length; i++){
        	if(nodeId == document.getElementById("otherList").children[i].id)
            	return;
        }

        //Check for duplicates in future classes, if there is one, then move it up to current
        for(var i = 0; i < document.getElementById("futureList").children.length; i++){
            if(nodeId == document.getElementById("futureList").children[i].id){
            	// Add element to "otherList"
            	var old = localStorage.getItem('otherList');
				old += nodeId+';';
				localStorage.setItem('otherList', old);

				// Remove element from "futureList"
            	var list = localStorage.getItem('futureList');
				var startLoc = list.search(nodeId);
				var newList = list.substr(0,startLoc);
				var secondList = list.substr(startLoc+8);
				newList = newList + secondList;	
				localStorage.setItem('futureList',newList);

				fillLists();
				return;
            }
        }

		if(!inputCheck(document.getElementById("otherNumber").value)){
			document.getElementById("otherNumber").focus();
			return;
		}
		checkAndUpdate('otherList', document.getElementById("otherDropdown").value+pad(document.getElementById("otherNumber").value));
		document.getElementById('otherForm').reset();
		document.getElementById('otherDropdown').focus();
		node.setAttribute("ondblclick", "setFlag(false)");
	}

	else if(id.id == "futureButton"){
		if(document.getElementById('futureDropdown').value == 'null' || '' == document.getElementById('futureNumber').value){
			document.getElementById("futureDropdown").focus();
			return;
		}
		parent = document.getElementById("futureList");
		text = document.createTextNode(document.getElementById("futureDropdown").value+' '+pad(document.getElementById("futureNumber").value));
		nodeId = document.getElementById("futureDropdown").value+pad(document.getElementById("futureNumber").value);
		node.setAttribute("class", "fCourse");


		for(var j = 0; j < document.getElementById("futureList").children.length; j++){
            if(nodeId == document.getElementById("futureList").children[j].id)
                return;
        }

        for(var i = 0; i < document.getElementById("otherList").children.length; i++){
            if(nodeId == document.getElementById("otherList").children[i].id){
            	alert('Class already entered in Current Courses List');
            	return;
            }
        }
		
		if(!inputCheck(document.getElementById("futureNumber").value)){
			document.getElementById("futureNumber").focus();
			return;
		}
		checkAndUpdate('futureList', document.getElementById("futureDropdown").value+pad(document.getElementById("futureNumber").value));
		document.getElementById('futureForm').reset();
		document.getElementById('futureDropdown').focus();
		node.setAttribute("ondblclick", "dblClickChild(this)");
	}

	node.appendChild(text);
	node.id = nodeId;
	node.setAttribute("onmouseenter", "delHoverOn(this)");
	node.setAttribute("onmouseleave", "delHoverOff(this)");
	node.setAttribute("onclick", "clickChild(this)");
	parent.appendChild(node);

	saveList(parent);
}

function setFlag () {
	clickFlag = false;
}

function delHoverOn(id){
	id.style.color = "red";
}

function delHoverOff(id){
	id.style.color = "black";
}

function clickChild(id){
	var timer;
	timer = setTimeout(function() {
		console.log(clickFlag)
		if(clickFlag == false){
			clickFlag = true;
			return;
		}
		if(typeof(Storage) !== 'undefined'){
			var parent = id.parentElement;
			var list = localStorage.getItem(parent.id);
			var startLoc = list.search(id.id);
			var newList = list.substr(0,startLoc);
			var secondList = list.substr(startLoc+8);
			newList = newList + secondList;	
			localStorage.setItem(parent.id,newList);
			fillLists();
		}
	}, 250);
}

function dblClickChild(id){
	clickFlag = false;
	var old = localStorage.getItem('otherList');
	old += id.id+';';
	localStorage.setItem('otherList', old);
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
