esversion=6;
/*function oddsums(n) {
	let total = 0,
		result = []; // 在函数内都是有定义的
	for (let x = 1; x <= n; x++) { // x只在循环体内有定义
		let odd = 2 * x - 1; // odd只在循环体内有定义
		total += odd;
		result.push(total);
	}
	// 这里使用x或odd会导致一个引用错误
	return result;
}
console.log(oddsums(5));
let o = {x:1,y:2};
var suzu = [1,2];
for(let p in o) console.log(o[p]);*/

function oddsums(n) {
	var total = 0,
		result = []; // 在函数内都是有定义的
	for (var x = 1; x <= n; x++) {
		// x只在循环体内有定义
		var odd = 2 * x - 1; // odd只在循环体内有定义
		total += odd;1
		result.push(total);
	}
	// 这里使用x或odd会导致一个引用错误
	return result;
}
console.log(oddsums(5));
var o = {
	x: 1,
	y: 2
};
var suzu = [1, 2];
for (var p in o) {
	console.log(o[p]);
}
//2
var a = [];

var _loop = function _loop(i) {
	a[i] = function() {
		console.log(i);
	};
};

for (var i = 0; i < 10; i++) {
	_loop(i);
}
a[6]();

//3
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f();

//4


//5
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
constantize(o);
o.z=5;
console.log(o.z);

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
console.log(foo);

const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}

function fetch(url, { body = '', method = 'GET', headers = {} }={}) {
  console.log(method);
  console.log(url);
}
fetch('http://example.com',{method:'post'});

/*function foo2() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo2.call({id:42});*/


//
/*var hander ={
	id:'123456',
	init:function(){
		document.addEventListener('click', event => this.doSometing(event.type),false)
	},
	doSometing:function(type){
		console.log('Handling '+type+" for "+this.id++);
	}
}
window.hander.init();*/

//字符串

let s2 = '𠮷a';
for (let ch of s2) {
  console.log(ch.codePointAt(0).toString(10));
}
console.log(String.fromCodePoint(0x78, 0x1f680, 0x79));

let s3=[1,2,3,4];
for (let i of s3){
	console.log(i);
}
console.log('\u004F\u030C'.normalize('NFD'));
$('#result').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());

const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
const data1 = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' }
];
$('#result').append(tmpl(data1));

//
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
console.log(func('Jack'));;

//
console.log(`In Javascript '\n' is a line-feed`);
let name ='bob',time ='today';
console.log(`Hello ${name},how are you ${time}`);
console.log(`\`Yo\` World!`);
let fn=(x)=>{
	return `hello girl ${x}`;
}
console.log(`nihao ${fn('!')}`);

//如果需要引用模板字符串本身，在需要时执行，可以像下面这样写
let str5 ='(name)=>`hello ${name}!`';
let func1=eval.call(null,str5);
console.log(func1('jack'));

//
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
function compile(template) {
	const evalExpr = /<%=(.+?)%>/g;
	const expr = /<%([\s\S]+?)%>/g;

	template = template
		.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
		.replace(expr, '`); \n $1 \n  echo(`');

	template = 'echo(`' + template + '`);';

	let script =
		`(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

	return script;
}

//
let name1 = '“a”, “b”';
console.log(name1.replace(/“([^“]*)”/g, "'$1'"));

//
function tag(s,v1,v2){
	console.log(s[0]);
	console.log(s[1]);
	console.log(s[2]);
	console.log(v1);
	console.log(v2);
}
let a1=5,b1=10;
tag`hello ${a1+b1} world ${a1*b1}`;

//
let total=30;
let msg = passthru`The total is ${total} (${total*1.5}) with tax`;
/*function passthru(literals) {
	let result = '';
	let i =0;
	while (i<literals.length) {
		console.log(literals);
		result+= literals[i++];
		if(i<arguments.length){
			result +=arguments[i];
			console.log(arguments);
		}
	}
	return result;
}*/
//passthru函数采用 rest 参数的写法如下
function passthru(literals, ...values) {
	let output = '';
	let i;
	for (i = 0; i < values.length; i++) {
		output += literals[i] + values[i];
	}
	output += literals[i];
	return output;
}
console.log(msg);

//“标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
//let message=SagerHtml`<p>${sender} has sent you a message.</p>`;
function SagerHtml(templateDate) {
	let s = templateDate[0];
	for (let i = 1; i < arguments.length; i++) {
		let arg = String(arguments[i]);

		s += arg.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');

		s += templateDate[i];

	}
	return s;
}
let sender = '<script>alert("&jfkdjf")</script>';
let message = SagerHtml `<p>${sender} has sent you a message.</p>`;

console.log(message);

//
console.log(String.raw`Hi\n${2+3}!`); //Hi\n5!
/*String.raw方法也可以作为正常的函数使用。这时，它的第一个参数，
应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。*/
console.log(String.raw({ raw: 'testtest' }, 0, 1, 2)); //t0e1s2t
console.log(String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2,3));//t0e1s2t

