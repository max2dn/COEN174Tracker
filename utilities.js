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