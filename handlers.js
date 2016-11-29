//File:		handlers.js
//Project:	COEN 174 Degree Tracker
//Checkboxes and dropdowns for department.
//Events are dropdown add clicks.
//Any classes satisfied by a dropdown will be checked off.
//Mouse-over option to delete nodes
//

//Global flag to handle double clicks
var clickFlag = true;

//Clear the form, called by the "Clear All" button
function clearAll(){
    var clear = confirm("Are you sure you want to clear the form?");
    if(!clear)
        return;
    clearLists();
    localStorage.setItem('otherList',"");
    localStorage.setItem('futureList',"");
}

//Process the dropdown menus from Other or Future courses
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

                //Reset page
                fillLists();
                return;
            }
        }

        //Check that the input is a number
        if(!inputCheck(document.getElementById("otherNumber").value)){
            document.getElementById("otherNumber").focus();
            return;
        }
        document.getElementById('otherForm').reset();
        document.getElementById('otherDropdown').focus();

        var old = localStorage.getItem('otherList');
        // If it is a double dip, append to list at front (for priority), if not, append at end
        if(isDblDip(nodeId)){
            var newList = nodeId+";"+old;
        } else {
            var newList = old+nodeId+';';
        }
        localStorage.setItem('otherList', newList);
    }

    else if(id.id == "futureButton"){
        //Check that the fields are filled out
        if(document.getElementById('futureDropdown').value == 'null' || '' == document.getElementById('futureNumber').value){
            document.getElementById("futureDropdown").focus();
            return;
        }
        parent = document.getElementById("futureList");
        text = document.createTextNode(document.getElementById("futureDropdown").value+' '+pad(document.getElementById("futureNumber").value));
        nodeId = document.getElementById("futureDropdown").value+pad(document.getElementById("futureNumber").value);

        //Check for duplicates in future list and return if there is one
        for(var j = 0; j < document.getElementById("futureList").children.length; j++){
            if(nodeId == document.getElementById("futureList").children[j].id)
                return;
        }

        //Check for duplicates in other list and warn the user that they cannot do add the class
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
        document.getElementById('futureForm').reset();
        document.getElementById('futureDropdown').focus();

        var old = localStorage.getItem('futureList');
        // If it is a double dip, append to list at front (for priority), if not, append at end
        if(isDblDip(nodeId)){
            var newList = nodeId+";"+old;
        } else {
            var newList = old+nodeId+';';
        }
        localStorage.setItem('futureList', newList);
    }
    fillLists();
}

//Check if the class is a double dip
function isDblDip(key){
    var classMap = makeMap();
    var reqs = [];
    var str ='';
    if(classMap.has(key)){
        str = classMap.get(key);
        if(str.search(','))
            reqs = str.split(',');
        else
            reqs.push(str);
    }
    if (reqs.length > 1){
        return true;
    }
    return false
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

//Function for if a class is clicked to delte the class
function clickChild(id){
    var timer;
    timer = setTimeout(function() {
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

//Function to move a class from future to current on double click
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
