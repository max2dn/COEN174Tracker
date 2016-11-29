
//file:     storage.js
// functions for handling updating the local storage, along with functions to check requirements and update the page

//Clears all the added nodes on the page
function clearLists(){
    // Remove all elements from other list
    var myNode = document.getElementById('otherList');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    // Remove all elements from future list
    myNode = document.getElementById('futureList');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    // Remove all elements from enrichment list
    myNode = document.getElementById('enrichList');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    // Remove all elements from Core Requirement List
    myNode = document.getElementById('coreField');
    for(var i = 0; i < myNode.children.length; i++){
        if(myNode.children[i].children[0] != null)
            myNode.children[i].removeChild(myNode.children[i].children[0]);
        myNode.children[i].style.color = 'black';
    }

    // Remove all elements from Major Requirements List
    myNode = document.getElementById('COENField');
    for(var i = 0; i < myNode.children.length; i++){
        if(myNode.children[i].children[0] != null)
            myNode.children[i].removeChild(myNode.children[i].children[0]);
        myNode.children[i].style.color = 'black';
    }

    // Remove all elements from COEN Elective List
    myNode = document.getElementById('nCOENELC');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

//Gets the lists from storage and fills out the page
function fillLists(){
    if(typeof(Storage) !== 'undefined'){
        clearLists();
        init();
        var l1 = document.getElementById('otherList');
        var l2 = document.getElementById('futureList');
        var text = localStorage.getItem('otherList').split(';');

        //Fill the current courses section
        for(var i = 0; i < text.length - 1; i++){
            var node = document.createElement("LI");
            node.setAttribute("onmouseenter", "delHoverOn(this)");
            node.setAttribute("onmouseleave", "delHoverOff(this)");
            node.setAttribute("onclick", "clickChild(this)");
            node.setAttribute("ondblclick", "setFlag(false)");
            node.setAttribute("id", text[i]);
            node.innerHTML = spacer(text[i]);
            l1.appendChild(node);
            checkAndUpdate('otherList', text[i]);
        }

        //Fill the future courses section
        text = localStorage.getItem('futureList').split(';');
        for(var i = 0; i < text.length - 1; i++){
            var node = document.createElement("LI");
            node.setAttribute("onmouseenter", "delHoverOn(this)");
            node.setAttribute("onmouseleave", "delHoverOff(this)");
            node.setAttribute("onclick", "clickChild(this)");
            node.setAttribute("ondblclick", "dblClickChild(this)");
            node.setAttribute("id", text[i]);
            node.innerHTML = spacer(text[i]);
            l2.appendChild(node);
            checkAndUpdate('futureList', text[i]);
        }
    }
}

//Determine what requirement "key" fulfills and update the page accordingly
function checkAndUpdate(caller, key){
    if(typeof(Storage) !== 'undefined'){

        //Check requirement
        var classMap = makeMap();
        var reqs = [];
        var str ='';
        //if the class fulfills requirements, add the reqs to the array
        if(classMap.has(key)){
            str = classMap.get(key);
            if(str.search(','))
                reqs = str.split(',');
            else
                reqs.push(str);
        }

        //if the class does not fulfill requirements, add the class to education enrichment
        else{
            var onPage = document.getElementById('enrichList');
            var node = document.createElement("LI");
            node.setAttribute("id", 'x'+key);
            node.innerHTML = key.substring(0,4) + " " + key.substring(4);
            onPage.appendChild(node);
            if(caller == 'otherList')
                document.getElementById('x'+key).style.color = 'green';
            else
                document.getElementById('x'+key).style.color  = 'blue';
            return;
        }

        //if the class is a COEN elective, call the elective handler
        if(classMap.get(key) == 'COENELC'){
            elcHandler(caller, key);
            return;
        }

        //Check if the class is a special case
        checkAndUpdateExceptions(caller, key);

        //Determine how many requirements the class fulfills that have already been fulfilled
        var reqCount = 0;
        for(var i = 0; i < reqs.length; i++){
            var onPage = document.getElementById('n'+reqs[i]);
            if (onPage.childNodes.length >= 2){
                reqCount++;
            }
        }

        //For each requirement, add to the class to the requirement it fulfills
        for(var i = 0; i < reqs.length; i++){
            var onPage = document.getElementById('n'+reqs[i]);

            //if the requirement is already fulfilled
            if (onPage.childNodes.length >= 2){
                onPage = document.getElementById('enrichList');
                var node = document.createElement("span");
                node.setAttribute("id", 'x'+key);
                node.innerHTML = "Contributed by "+spacer(key)+'<br>';
                //if the class fulfills only one requirement, or it is a double dip but both classes have been fulfilled
                if(reqCount == 2 && reqs.length > 1 || reqs.length == 1){
                    onPage.appendChild(node);
                    if(caller == 'otherList')
                        document.getElementById('x'+key).style.color = 'green';
                    else
                        document.getElementById('x'+key).style.color  = 'blue';
                    return;
                }
                continue;
            }

            //add the class to the requirement it fulfills
            var node = document.createElement("span");
            node.setAttribute("id", 'x'+key);
            node.innerHTML = " - Satisfied by "+spacer(key);
            onPage.appendChild(node);
            if(caller == 'otherList')
                onPage.style.color = "green";
            else if(caller == 'futureList')
                onPage.style.color = "blue";
        }
    }
}

//Find the class specified by key and remove it from the page
function checkAndDelete(key){
    checkAndDeleteExceptions(key);
    var classMap = makeMap();
    var reqs = [];
    if(classMap.has(key)){
        var str = classMap.get(key);
        if(str.search(','))
            reqs = str.split(',');
        else
            reqs.push(str);
    }
    else{
        var node = document.getElementById('x'+key);
        node.parentElement.removeChild(node);
        return;
    }
    if(classMap.get(key) == 'COENELC'){
        elcDeleteHandler(key);
        return;
    }
    for(var i = 0; i < reqs.length; i++){
        var onPage = document.getElementById('n'+reqs[i]);
        if(onPage.children.length > 0){
            onPage.removeChild(onPage.childNodes[1]);
            onPage.style.color = 'black';
        }
    }
    fillLists();
}

//Checks for STS,Arts,and Civic Engagement
function checkAndUpdateExceptions(caller, key) {
    var otherList = localStorage.getItem("otherList");
    var futureList = localStorage.getItem("futureList");
    var element;
    var element2;
    var green = false;
    var key2;
    var color = "blue";

    //Add the element onto the page, stating that it is satisfied by key and key2
    function updatePage(element, key, key2, color) {
        if (document.getElementById("n" + element).style.color == "green" || document.getElementById("n" + element).style.color == "blue")
            return;
        var onPage = document.getElementById("n" + element);
        var node = document.createElement("span");
        node.setAttribute("id", "x"+key+key2);
        node.innerHTML = " - Satisfied by "+key+" and "+key2;
        onPage.appendChild(node);
        onPage.style.color = color;
    }

    //Check if the class is one of the exceptions, and if it is, check if the other class has also been taken
    if (key == "ENGR001") {
        key2 = "COEN196";
        if (otherList != null && otherList.search("COEN196") != -1) {
            green = true;
            element = "CIVE";
        }
        else if (futureList != null && futureList.search("COEN196") != -1) {
            element = "CIVE";
        }
        else
            return;
    }
    else if (key == "ENGL181") {
        key2 = "COEN196";
        if (otherList != null && otherList.search("COEN196") != -1) {
            green = true;
            element = "ARTS";
            element2 = "STNS";
            if(caller == 'otherList')
                color = 'green';
            updatePage(element, key, key2, color);
            updatePage(element2, key, key2, color);
        }
        else if (futureList != null && futureList.search("COEN196") != -1) {
            element = "ARTS";
            element2 = "STNS";
            updatePage(element, key, key2, color);
            updatePage(element2, key, key2, color);
        }
        else
            return;
    }
    else if (key == "COEN196") {
        if (otherList != null && otherList.search("ENGL181") != -1) {
            element = "ARTS";
            element2 = "STNS";
            key2 = "ENGL181";
            if(caller == 'otherList')
                color = 'green';
            updatePage(element, key, key2, color);
            updatePage(element2, key, key2, color);
        }
        else if (futureList != null && futureList.search("ENGL181") != -1) {
            element = "ARTS";
            element2 = "STNS";
            key2 = "ENGL181";
            updatePage(element, key, key2, "blue");
            updatePage(element2, key, key2, "blue");
        }

        if (otherList != null && otherList.search("ENGR001") != -1) {
            element = "CIVE";
            key2 = "ENGR001";
            if(caller == 'otherList')
                color = 'green';
            updatePage(element, key, key2, color);
        }
        else if (futureList != null && futureList.search("ENGR001") != -1) {
            element = "CIVE";
            key2 = "ENGR001";
            updatePage(element, key, key2, "blue");
        }
        return;
    }
    else
        return;
    if (caller == "otherList" && green == true)
        color = "green";
    updatePage(element,key, key2, color);
}

//Delete exceptional classes ENGL181,ENGR001,or COEN196, which combine to fulfill a requirement
function checkAndDeleteExceptions(key){
    if(key == "ENGL181"){
        var onPage = document.getElementById("nARTS");
        if(onPage.childNodes.length > 1 && onPage.childNodes[1].innerHTML.search("ENGL181") != -1){
            onPage.removeChild(onPage.childNodes[1]);
            onPage.style.color = 'black';
        }
    } else if (key == "ENGR001"){
        var onPage = document.getElementById("nCIVE");
        if(onPage.childNodes.length > 1 && onPage.childNodes[1].innerHTML.search("ENGR001") != -1){
            onPage.removeChild(onPage.childNodes[1]);
            onPage.style.color = 'black';
        }
    } else if (key == "COEN196"){
        var onPage = document.getElementById("nARTS");
        if(onPage.childNodes.length > 1 && onPage.childNodes[1].innerHTML.search("COEN196") != -1){
            onPage.removeChild(onPage.childNodes[1]);
            onPage.style.color = 'black';
        }
        onPage = document.getElementById("nCIVE");
        if(onPage.childNodes.length > 1 && onPage.childNodes[1].innerHTML.search("COEN196") != -1){
            onPage.removeChild(onPage.childNodes[1]);
            onPage.style.color = 'black';
        }
    }
}

//Handler for adding COEN Electives
function elcHandler(caller, key){
    var node = document.createElement("LI");
    node.setAttribute('id', 'x'+key);
    node.innerHTML = key.substring(0,4) + " " + key.substring(4);
    document.getElementById('nCOENELC').appendChild(node);
    if(document.getElementById('nCOENELC').childNodes.length >= 4){
        document.getElementById('COENELCHeader').style.color = 'green';
    }
    if(caller == 'otherList')
        node.style.color = "green";
    else
        node.style.color = 'blue';
}


//Handler for deleting COEN Electives
function elcDeleteHandler(key){
    var node = document.getElementById('x'+key);
    node.parentElement.removeChild(node);
    if(document.getElementById('nCOENELC').childNodes.length < 4)
        document.getElementById('COENELCHeader').style.color = 'black';
}
