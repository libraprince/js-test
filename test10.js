var pattern = 'javascript  is good javascript,java';
var patternTurn = pattern.replace(/java\w?/ig, "Java");
console.log(patternTurn);



var rr = 'javascript  is good "javascript",java.';
var quote = /"([^"]\w*)"/g;
console.log(rr.replace(quote, '“$1”')); //$1应用第一次匹配引用的文本

var rr1 ='11r 2rer 3';
var patt =/\d+/g;
console.log(rr1.match(patt));

var str1="Visit W3School454";
var patt2=/[a-z]\w*(\d{1,4})/ig;
console.log(str1.match(pattern));

var str="Visit W3School454";
var patt1=/[a-z]\w*(\d{1,4})/ig;
console.log(patt1.exec(str));

var str2="Visit W3School454W3";
var patt3=/([W3])\w*\d*\1\d+/ig;//\1引用第一次匹配的文本
console.log(str2.match(patt3));

var patt4 = /Java/g;
var str3 = "JavaScript is more Java fun than Java!";
var result;
while ((result = patt4.exec(str3)) != null) {
	console.log("Matched '" + result[0] +
		"'" + " at position " + result.index +
		"; next search begins at " + patt4.lastIndex);
}


