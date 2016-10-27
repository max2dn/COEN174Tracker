//file: 	cookies.js

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
	var i;
	var cValue = "";
	for(i = 0; i < parent.children.length; i++){
		cValue = cValue+'_'+parent.children[i].innerHTML;
	}
	setCookie(parent, cValue, exdays);
}

function cutCookie(node){
	var list = getCookie(node.parentElement);
	var pos = list.search(node.id);
	list = list.substring(0, pos-1)+list.substring(pos+9);
	setCookie(node.parentElement, list, 30);
}