//file: 	cookies.js

function saveList(parent){
    if (typeof(Storage) !== "undefined") {
        var i;
        value = '';
        for(i = 0; i < parent.children.length; i++)
            value += parent.children[i].innerHTML+',';
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

function fillLists(){
    if(typeof(Storage) !== 'undefined'){
        var l1 = document.getElementById('otherList');
        var l2 = document.getElementById('futureList');
        var text = localStorage.getItem('otherList').split(',');
        for(var i = 0; i < text.length - 1; i++){
            var node = document.createElement("LI");
            node.setAttribute("onmouseenter", "delHoverOn(this)");
            node.setAttribute("onmouseleave", "delHoverOff(this)");
            node.setAttribute("onclick", "clickChild(this)");      
            node.innerHTML = text[i];
            console.log(text[i]);
            l1.appendChild(node);
        }
        text = localStorage.getItem('futureList').split(',');
        for(var i = 0; i < text.length - 1; i++){
            var node = document.createElement("LI");
            node.setAttribute("onmouseenter", "delHoverOn(this)");
            node.setAttribute("onmouseleave", "delHoverOff(this)");
            node.setAttribute("onclick", "clickChild(this)");      
            node.innerHTML = text[i];
            console.log(text[i]);
            l2.appendChild(node);
        }
    }
}

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
