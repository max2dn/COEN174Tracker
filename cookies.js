
//file:     cookies.js

function saveList(parent){
    if (typeof(Storage) !== "undefined") {
        var i;
        value = '';
        for(i = 0; i < parent.children.length; i++)
            value += parent.children[i].id+';';
        localStorage.setItem(parent.id, value);
    } else {
        // Sorry! No Web Storage support..
    }
}

function checkStorage(storageName){
    if(typeof(Storage) !== 'undefined'){
        var item = localStorage.storageName;
        if(item)
            return item;
    }
}

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

function fillLists(){
    if(typeof(Storage) !== 'undefined'){
        clearLists();
        init();
        var l1 = document.getElementById('otherList');
        var l2 = document.getElementById('futureList');
        var text = localStorage.getItem('otherList').split(';');
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

function checkAndUpdate(caller, key){
    if(typeof(Storage) !== 'undefined'){
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
        else{
            var onPage = document.getElementById('enrichList');
            var node = document.createElement("span");
            node.setAttribute("id", 'x'+key);
            node.innerHTML = "Contributed by "+spacer(key)+'<br>';
            onPage.appendChild(node);
        if(caller == 'otherList')
            document.getElementById('x'+key).style.color = 'green';
        else
            document.getElementById('x'+key).style.color  = 'blue';
            return;
        }
        if(classMap.get(key) == 'COENELC'){
            elcHandler(caller, key);
            return;
        }
        checkAndUpdateExceptions(caller, key);

    var reqCount = 0;
    for(var i = 0; i < reqs.length; i++){
        var onPage = document.getElementById('n'+reqs[i]);
                if (onPage.childNodes.length >= 2){
            reqCount++; 
        }
    }

        for(var i = 0; i < reqs.length; i++){
            var onPage = document.getElementById('n'+reqs[i]);
            if (onPage.childNodes.length >= 2){
            onPage = document.getElementById('enrichList');
            var node = document.createElement("span");
                    node.setAttribute("id", 'x'+key);
                    node.innerHTML = "Contributed by "+spacer(key)+'<br>';
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

    var onPage = document.getElementById('enrichList');
    
    fillLists();    
}

function checkAndUpdateExceptions(caller, key) {
    var otherList = localStorage.getItem("otherList");
    var futureList = localStorage.getItem("futureList");
    var element;
    var green = false;
    var key2;
    var color = "blue";

    function updatePage(element, key, key2, color) {
        console.log(color);
        if (document.getElementById("n" + element).style.color == "green" || document.getElementById("n" + element).style.color == "blue")
            return;
        var onPage = document.getElementById("n" + element);
        var node = document.createElement("span");
        node.setAttribute("id", "x"+key+key2);
        node.innerHTML = " - Satisfied by "+key+" and "+key2;
        onPage.appendChild(node);
        onPage.style.color = color;
    }

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
        }
        else if (futureList != null && futureList.search("COEN196") != -1) {
            element = "ARTS";
        }
        else
            return;
    }
    else if (key == "COEN196") {
        if (otherList != null && otherList.search("ENGL181") != -1) {
            element = "ARTS";
            key2 = "ENGL181";
            if(caller == 'otherList')
                color = 'green';
            updatePage(element, key, key2, color);
        }
        else if (futureList != null && futureList.search("ENGL181") != -1) {
            element = "ARTS";
            key2 = "ENGL181";
            updatePage(element, key, key2, "blue");
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

function elcHandler(caller, key){
    var node = document.createElement("LI");
    node.setAttribute('id', 'x'+key);
    node.innerHTML = key;
    document.getElementById('nCOENELC').appendChild(node);
    if(document.getElementById('nCOENELC').childNodes.length >= 4){
        document.getElementById('COENELCHeader').style.color = 'green';
    }
    if(caller == 'otherList')
        node.style.color = "green";
    else
        node.style.color = 'blue';
}

function elcDeleteHandler(key){
    var node = document.getElementById('x'+key);
    node.parentElement.removeChild(node);
    if(document.getElementById('nCOENELC').childNodes.length < 4)
        document.getElementById('COENELCHeader').style.color = 'black';
}
/*\
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function checkCookie() {
    var username=getCookie("username");
    if (username!="") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}

function bakeCookie(parent, exdays){
    var cValue = parent.children.toString();
    setCookie(parent.id, cValue, exdays);
}

function cutCookie(nodeId){
    var list = getCookie(nodeId.parentElement);
    var pos = list.search(nodeId.id);
    list = list.substring(0, pos-1)+list.substring(pos+9);
    setCookie(nodeId.parentElement, list, 30);
}

function eatCookie(){
    var otherCookie = getCookie("otherList");
    var futureCookie = getCookie("futureList");

    var otherList = getElementById('otherList');
    var futureList = getElementById('futureList');

    var node;
    node.setAttribute("onmouseenter", "delHoverOn(this)");
    node.setAttribute("onmouseleave", "delHoverOff(this)");
    node.setAttribute("onclick", "clickChild(this)");

    var i, j;

    for(i = 0; i <= otherCookie.length - 8; i+=9){
        node.appendChild(otherCookie.substring(i, i + 7));
        otherList.appendChild(node);
    }
    for(j = 0; j <= futureCookie.length - 8; i+=9){
        node.appendChild(futureCookie.substring(i, i + 7));
        futureList.appendChild(node);
    }
}
\*/
