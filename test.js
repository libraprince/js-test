//事件绑定
var biaoqian = document.getElementById('dianji');
biaoqian.onclick = function(e) {
	alert('today is a good day!');
	console.log('yes');
};

var num10 = false;
    var str3 = Number(num10);
console.log(typeof(num10));
console.log(str3);
console.log(typeof(str3));

console.log('--------------------------------------------');
var now = new Date();
console.log(now);
console.log(now + 1);
console.log(now - 1);
console.log(now == now.toString());
var str4 = now.valueOf();
console.log(typeof(str4));
console.log(parseInt("077", 10));


/*var myVar = setInterval(function(){myTime()},1000);
function myTime(){
	var d = new Date();
	var t = d.toLocaleString();
	document.getElementById('time').innerHTML = t;
}
function stopTime(){
	clearInterval(myVar);
}
document.getElementById('stop').onclick = function(){stopTime();};*/

	var herff = window.location.href;
	console.log(typeof(herff));

/*跳转按钮*/
// var tzhuan = document.getElementById('tiaozhuan');
// tzhuan.onclick = function(){
// 	//window.location = '#top';
// 	window.history.back();
// };


/*对话框
do{
	var name1 =  prompt('what is your name?');//请求用户输入
	var correct = confirm("your entered'" + name1 +
    "'\n" + "click ok to proceed or cancel to re-enter .");//用户逻辑判断
}while(!correct);//直到为真
alert('hello  ' + name1);
*/
var scope = "global scope"; // 全局变量
function checkscope() {
	var scope = "local scope"; //局部变量
	function nested() {
		var scope = "nested scope"; // 嵌套作用域内的局部变量
		return scope; // 返回当前作用域内的值
	}
	return nested();
}
console.log(checkscope()); // => "嵌套作用域"

console.log('--------------------------------------------');

function ffr() {
	console.log(scope);
	var scope = 'sdfddfdfdf';
	console.log(scope);
}
ffr();

//-----------------
//
/* 1* 把p中的可枚举属性复制到o中，并返回o
* 如果o和p中含有同名属性，则覆盖o中的属性 * 这个函数并不处理getter和setter以及复制属性 */
var prop;
function extend(o, p) { //+extend拓展 同名属性被覆盖
    for (prop in p) { // 遍历p中的所有属性
        o[prop] = p[prop]; // 将属性添加至o中
    }
    return o;
}

/* 2* 将p中的可枚举属性复制至o中，并返回o
* 如果o和p中有同名的属性，o中的属性将不受影响 * 这个函数并不处理getter和setter以及复制属性 */
function merge(o, p) { //+merge合并 把p的属性合到o中 并并跳过已存在的属性
    for (prop in p) {
        if (o.hasOwnProperty[prop]) continue; // 过滤掉已经在o中存在的属性
        o[prop] = p[prop];
    }
    return o;
}

/* 3* 如果o中的属性在p中没有同名属性，则从o中删除这个属性 * 返回o */
//求o与p的交集
function restrict(o, p) { //restrict限制  把不存在p中的属性剔除
    for (prop in o) {
        if (!(prop in p)) delete o[prop]; // 如果在p中不存在，则删除ta
    }
    return o;
}

/* 4* 如果o中的属性在p中存在同名属性，则从o中删除这个属性 * 返回o */
function subtract(o, p) { //subtract减去  把存在p中的属性剔除
    for (prop in p) { // 遍历p中的所有属性
        delete o[prop]; // 从o中删除（删除一个不存在的属性不会报错）
    }
    return o;
}

/* 5* 返回一个新对象，这个对象同时拥有o的属性和p的属性 * 如果o和p中有重名属性，使用p中的属性值 */
function union(o, p) { //union联合
    return extend(extend({}, o), p);
}

/* 6* 返回一个新对象，这个对象拥有同时在o和p中出现的属性 * 很像求o和p的交集，但p中属性的值被忽略 */
function intersection(o, p) { //交集
    return restrict(extend({}, o), p);
}

/* 7* 返回一个数组，这个数组包含的是o中可枚举的自有属性的名字 */
function keys(o) {
    if (typeof o !== "object") throw TypeError(); // 参数必须是对象
    var result = []; // 将要返回的数组
    for (var prop in o) { // 遍历所有可枚举的属性
        if (o.hasOwnProperty(prop)) // 判断是否是自有属性
            result.push(prop); // 将属性名添加至数组中
    }
    return result; // 返回这个数组
}