//utilities.js

function inputCheck(number) {
	if(number < 0 || number > 499)
		return false;
	else
		return true;
}

function pad(n) {
	n = parseInt(n, 10);
	if(n < 10)
		n = "00"+n;
	else if(n < 100)
		n = "0"+n;

    return n;
}

function listSearch(key){
	var l1 = document.getElementById('otherList').children;
	var l2 = document.getElementById('futureList').children;

	for(var i = 0; i < l1.length; i++){
		if(l1[i].id == key)
			return 0;
	}
	for(var i = 0; i < l2.length; i++){
		if(l2[i].id == key)
			return 1;
	}
}

function updatePage(element, key){
	var onPage = document.getElementById(element);
	var node = document.createElement("span");
	node.setAttribute("id", "n"+key);
	node.setAttribute("onclick", "clickChild(this)");
	node.innerHTML = " - Satisfied by "+key;
	onPage.appendChild(node);
	if(listSearch(key) == 0)
		onPage.style.color = "green";
	else if(listSearch(key) == 1)
		onPage.style.color = "blue";
}

function spacer(string){
	var left, right;
	left = string.substr(0, 4);
	right = string.substr(4);
	return left+' '+right;
}

function showProgress(section){
	var bar = document.createElement("PROGRESS");
	var max = 0, current = 0;
	for(var i = 1; i < section.childNodes.length; i++){
		max++;
		if(section.childNodes[i].style.color !== 'black')
			current++;
	}
	bar.setAttribute('max', max);
	bar.setAttribute('value', current);
	section.insertBefore(bar, section.childNodes[0]);
}