var a = new Array(5, 4, 3, 2, 1, 'rerer', null, undefined);

a[-1.23] = true;
a[1.23] = 'qqqqqq';
console.log(a);
console.log(a[1.23]);
console.log(a[-1.23]);
console.log(a[8]);
console.log(a[a.length - 1]);


console.log("--------------------------------------");
var a1 = [1, , 3]; //索引依然存在，没有元素，为empty,但查询是反回undefined
var a2 = [1, undefined, 3]; //索引存在 ，值为undefined
var a3 = [, , ]; // 长度为2
var a4 = new Array(4); // 长度为4
console.log(a1[1]);
console.log(a2);
console.log(a3);
console.log(a4);
console.log(0 in a3);
console.log(0 in a4);

console.log("--------------------------------------"); //设置length属性为一个小于当前长度的非负整数n时，当前数组中那些索引值大于或等于n的元素将从中删除：
var a5 = [1, 2, 3, 4, 5];
a5.length = 6;
console.log(a5);
var a6 = a5;
a6.length = 2;
console.log(a6);

a7 = [1, 2, 3]; // 从3个元素的数组开始
Object.defineProperty(a7, "length", // 让length属性只读
	{
		writable: false
	});
a7.length = 0; // a不会改变
console.log(a7);

console.log("--------------------------------------");
// 创建一个多维数组
var table = new Array(10); // 表格有10行
for (var i = 0; i < table.length; i++)
	table[i] = new Array(10); // 每行有10列// 初始化数组
for (var row = 0; row < table.length; row++) {
	for (col = 0; col < table[row].length; col++) {
		table[row][col] = row * col;
	}
} // 使用多维数组来计算（查询）5 * 7
var product = table[5][7]; // 35
console.log(product);

console.log("--------------------------------------");

var data = [1, 2, 3, 4, 5]; // 这是需要遍历的数组
var sumOfSquares = 0; // 要得到数据的平方和
data.forEach(function(x) { // 把每个元素传递给此函数
	sumOfSquares += x * x; // 平方相加
});
console.log(sumOfSquares);


console.log("---------------数组遍历--------------------");
var b = [5, 4, 3, 2, 1, 'rerer', , null, undefined, [1, 2]];
var sum = sum1 = sum2 = '';
for (var i = 0, len = b.length; i < len; i++) { //数组的长度应该只查询一次而非每次循环都要查询
	if (!b[i]) continue; // 跳过null、undefined和不存在的元素
	sum += b[i];
}
console.log(sum);


console.log("----------------");
for (var i = 0, len = b.length; i < len; i++) {
	if (b[i] === undefined) continue; // 跳过undefined+不存在的元素
	sum1 += b[i];
}
console.log(sum1);

console.log("---------------");
for (var i = 0, len = b.length; i < len; i++) {
	if (!(i in b)) continue; // 跳过不存在的元素
	sum2 += b[i];
}
console.log(sum2);

console.log("---------------数组排序--------------------");
var c = [33, 44, 111, 222];
console.log(c.reverse()); //reverse数组中的元素颠倒顺序，返回逆序的数组
console.log(c.sort()); //sort数组中的元素排序并返回排序后的数组
var d = c.sort(function(a, b) { //比较函数
	return a - b; // 根据顺序，返回负数、0、正数
});
console.log(d);

e = ['ant', 'Bug', 'cat', 'Dog'];
e.sort(); // 区分大小写的排序：['Bug','Dog','ant',cat']
var f = e.sort(function(s, t) { // 不区分大小写的排序
	var a = s.toLowerCase();
	var b = t.toLowerCase();
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}); // => ['ant','Bug','cat','Dog']
console.log(f.join('--'));

console.log("----------1-----------");
var stack = [1, 2, 3];
stack.push(123, 456); //push()方法在数组的尾部添加一个或多个元素，并返回数组新的长度
console.log(stack);
stack.pop(); //它删除数组的最后一个元素，减小数组长度并返回它删除的值
//console.log(stack.pop());
console.log(stack);

console.log("-----------2----------");
var ar1 = [1, 2, 3, ];
ar1.unshift(123, 456); //在数组最前添一个或多个加元素，并返回数组的长度
console.log(ar1);
ar1.shift(); //删除第一个元素，并返回删除的元素
console.log(ar1);

console.log("------------3---------");
var ar2 = [1, 2, [3, 4, 5]];
console.log(ar2.toString()); //该方法将其每个元素转化为字符串,并且输出用逗号分隔的字符串列表。
console.log(ar2.join()); // 这里与不使用任何参数调用join()方法返回的字符串是一样的。
console.log(ar2.toLocaleString());

console.log("------------forEach方法---------");
var data1 = [undefined, 2, 3, 4, 5, undefined];
var sum3 = 0;
/*data1.forEach(function(value) { //如果只关心数组元素的值，可以编写只有一个参数的函数——额外的参数将忽略：
	sum3 += value;
});
console.log(sum3);*/

function foreach(a) {
	try {
		a.forEach(function(v, i) { // forEach()使用三个参数调用该函数：数组元素、元素的索引和数组本身。
			a[i] = v + 1;
		}); // 如果要提前终止，必须把forEach()方法放在一个try块中，并能抛出一个异常。
	} catch (e) {
		if (e === foreach.break) return;
		else throw e;
	}
	return a;
}
foreach.break = new Error("StopIteration"); //错误对象
console.log(foreach(data1));


console.log("------------map方法---------");
var data2 = [1, 2, , 3];
b = data2.map(function(a) { //将调用的数组的每个元素传递给指定的函数，并返回一个数组，它包含该函数的返回值
	//如果是稀疏数组，返回的也是相同方式的稀疏数组
	return a * a;
});
console.log(data2);
console.log(b);
console.log(typeof b);


console.log("------------filter过滤---------");
var data3 = [null, 2, 3, 4, 5, , undefined];
data4 = data3.filter(function(x) { //返回符合逻辑判断的子子集数组,而且过滤稀疏数组不存在的元素
	return x !== undefined && x != null;
});
smallvalues = data3.filter(function(x) {
	return x < 3;
});
everyother = data3.filter(function(x, i) {
	return i % 2 == 0;
});
console.log(data4);
console.log(smallvalues);
console.log(everyother);

console.log("------------every some 检测---------");
var data5 = [1, 2, 3, 4];
var bollen1 = data5.every(function(x, i) { //没个元素符合条件才返回true
	return i % 2 == 0;
});
console.log(bollen1);

var bollen2 = data5.some(function(x) {
	return x % 2 == 0;
});
console.log(bollen2);

console.log("------------reduce()和reduceRight()简化---------------");
var data6 = [1, 2, 4, 5, ];
var sum = data6.reduce(function(x, y) { //reduce 第一参数为初始值，或初始值被函数调用后返回的值，第二参数为数组元素
	return x + y;
}, 0); // 数组求和
console.log(sum);

var product = data6.reduce(function(x, y) {
	return Math.pow(y, x);
}); // 数组乘方。无初始值时，数组的第一和第二元素为reduce的第一第二参数
console.log(product);

var max = data6.reduce(function(x, y) {
	return (x > y) ? x : y;
}); // 求最大值
console.log(max);

console.log("------------union()函数数组对象的合并---------------"); //它计算两个对象的“并集”，并返回另一个新对象，新对象具有二者的属性
var objects = [{
	x: 1
}, {
	y: 2
}, {
	z: 3
}, 44];
//var merged = objects.reduce();
//console.log(objects.union());

var data7 = [1, 2, 3, 4, 5, 1, 2, 1, 2, 1, 2];

function findall(a, x) {
	var results = [],
		len1 = a.length,
		pos = 0;
	while (pos < len1) {
		pos = a.indexOf(x, pos);
		if (pos === -1) break;
		results.push(pos);
		pos += 1;
	}
	return results;
}

console.log(findall(data7, 1));

console.log("------------数组类型检测---------------");
var isArray = Function.isArray || function(o) { //ECMAscript3 的写法
	return typeof o === "object" && Object.prototype.toString.call(o) === "[object Array]";
};
console.log(Array.isArray(data7)); // ECMAscript5的写法
console.log(Object.prototype.toString.call(data7));

console.log("------------类数组型对象---------------");
var data8 = {};
var i = 0;
while (i < 10) {
	data8[i] = i * i;
	i++;
}

function isArrayLike(o) {
	if (o &&
		isFinite(o.length) && // o.length是有限数值
		typeof o === "object" &&
		o.length >= 0 &&
		o.length === Math.floor(o.length) && //o.length是整数
		o.length < Math.pow(2, 32))
		return true;
	else
		return false;
}
console.log(data8);
console.log(Object.prototype.toString.call(data8).slice(8, -1) === "Array"); //最快的判定方法
console.log(data8.length);
console.log(isArrayLike(data8));

console.log("------------类数组型对象间接调用function.call 技术---------------");
var ar3 = {
	"0": "a",
	"1": "b",
	"2": "c",
	length: 3
};
var sum4 = Array.prototype.join.call(ar3, "+");
var sum5 = Array.prototype.slice.call(ar3, 0);
var sum6 = Array.prototype.map.call(ar3, function(x) {
	return x.toUpperCase();
});
var sum7 = Array.prototype.sort.call(ar3, function(s, t) { //类数组使用if判断语句
	var a = s.toLowerCase();
	var b = t.toLowerCase();
	if (a < b) return 1;
	if (a > b) return -1;
	return 0;
});

console.log(sum4);
console.log(sum5);
console.log(sum6);
console.log(sum7);

console.log("------------8.1函数表达式---------------");
// 计算阶乘的递归函数（调用自身的函数）
// // x!的值是从x到x递减（步长为1）的值的累乘
var antherghh = (function(x) {
	if (x <= 1) return 1;
	return x * arguments.callee(x - 1);
});

console.log(antherghh(6));


console.log("------------函数argument对象---------------"); // 标识符argument是参数对象的引用，非严格模式下为关键字

function maxvalue( /* ... */ ) {
	var max1 = Number.NEGATIVE_INFINITY; // 遍历实参，查找并记住最大值
	for (var i = 0; i < arguments.length; i++)
		if (arguments[i] > max1) max1 = arguments[i]; // 返回最大值（存储当前的值，并在循环中逐渐比较大小）
	return max1;
}
var largest = maxvalue(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6);
console.log(largest);


console.log("------------函数argument对象的callee和caller属性---------------");

var factorial_1 = function(x) { //callee指代执行当前函数的本身,caller 调用当前函数的调用者
	if (x <= 1) return 1;
	return x * arguments.callee(x - 1);
};
console.log(factorial_1(5));
console.log("------------函数:将对象属性用做实参---------------");

function arraycopy(from, from_start, to, to_start, length) {
	to.length = from.length; //from数组的长度为to的数组长度
	for (var i = from_start, j = to_start, len = from.length; i < len, j < len; i++, j++) {
		var keyvalue = from[i]; //keyvalue为中间变量
		to[j] = keyvalue; //复制给数组to
	}
	return to; //返回结果
}

function easycopy(args) { //利用了函数嵌套
	return arraycopy( //返回结果
		args.from,
		args.from_start || 0, // 注意这里设置了默认值
		args.to,
		args.to_start || 0,
		args.length);
}
var aa1 = [1, 2, 3, 4],
	bb1 = [5, 6];
var newto = easycopy({
	from: aa1,
	to: bb1,
	length: 4
});
console.log(newto);

console.log("------------函数:8.3.4实参类型检测---------------");

function flexisum(a) {
	var total = 0;
	for (i = 0; i < arguments.length; i++) {
		var element = arguments[i], //获取是从实参的值
			n;
		if (element == null) continue; // 忽略null和undefined实参
		if (isArray(element)) // 如果实参是数组
			n = flexisum.apply(this, element); // 递归地计算累加和
		else if (typeof element === "function") // 否则，如果是函数...
			n = Number(element()); // 调用它并做类型转换
		else
			n = Number(element); // 否则直接做类型转换
		if (isNaN(n)) //转化后的参数不是数字，则抛出异常
			throw Error("flexisum(): can't convert " + element + " to number");
		total += n;
	}
	return total;
}
var suzu = [1, 2, 3];
console.log(flexisum(suzu));



console.log("---------------------------");
// 计算阶乘，并将结果缓存至函数的属性中
function gh(n) {
	if (isFinite(n) && n > 0 && n == Math.round(n)) { // 有限的正整数
		if (!(n in gh)) // 如果没有缓存结果
			gh[n] = n * gh(n - 1); // 计算结果并缓存之
		return gh[n]; // 返回缓存结果
	} else return NaN; // 如果输入有误
}
gh[1] = 1; // 初始化缓存以保存这种基本情况


console.log("------------8.6闭包---------------");
var uniqueInteger = (function() { // 定义函数并立即调用
	var counter = 0; // 函数内置变量参数来保存私有状态
	return function() {
		return counter++;
	};
}());

console.log(uniqueInteger()); // 0
console.log(uniqueInteger()); // 1
console.log(uniqueInteger()); // 2

function counter(n) { //参数来保存私有状态
	return {
		get count() {
			return n++;
		},
		set count(m) {
			if (m >= n) n = m;
			else throw Error("count can only be set to a larger value");
		}
	};
}
var cc = counter(100);
console.log(cc.count);
console.log(cc.count);
console.log(cc.count);
cc.count = 200;
console.log(cc.count);
console.log(cc.count);
console.log("------------8.6利用闭包实现的私有属性存取器方法---------------");
// 这个函数给对象o增加了属性存取器方法
// 方法名称为get<name>和set<name>。如果提供了一个判定函数
// // setter方法就会用它来检测参数的合法性，然后在存储它
// // 如果判定函数返回false，setter方法抛出一个异常//
// // 这个函数有一个非同寻常之处，就是getter和setter函数
// // 所操作的属性值并没有存储在对象o中
// // 相反，这个值仅仅是保存在函数中的局部变量中
// // getter和setter方法同样是局部函数，因此可以访问这个局部变量
// // 也就是说，对于两个存取器方法来说这个变量是私有的
// // 没有办法绕过存取器方法来设置或修改这个值
function addPrivateProperty(o, name, predicate) {
	var value; // 这是一个属性值    // getter方法简单地将其返回
	o["get" + name] = function() {
		return value;
	}; // setter方法首先检查值是否合法，若不合法就抛出异常    // 否则就将其存储起来
	o["set" + name] = function(v) {
		if (predicate && !predicate(v))
			throw Error("set" + name + ": invalid value " + v);
		else value = v;
	};
} // 下面的代码展示了addPrivateProperty()方法
var o = {}; // 设置一个空对象// 增加属性存取器方法getName()和setName()// 确保只允许字符串值
addPrivateProperty(o, "Name", function(x) {
	return typeof x == "string";
});
o.setName("Frank"); // 设置属性值
console.log(o.getName()); // 得到属性值

console.log("------------8.6闭包共享变量是活动的---------------");

function constfunc(x) {
	return function() {
		return x;
	};
}
var funcs = [];
for (var i = 0; i < 10; i++) {
	funcs[i] = constfunc(i);
}
console.log(funcs[5]());

function constfun() {
	var funcss = [];
	for (var i = 9; i >= 0; i--) {
		funcss[i] = function() {
			return i;
		};
	}
	return funcss;
}
var funcss = constfun();
var value_f = funcss[5]();
console.log(value_f);

console.log("------------8.7.1函数的length属性---------------");
//函数的arguments.length 变量指的是函数参数长度，
//函数的length即argumnets.callee.length 指的是函数实参的数量，该变量是只读的。

function check(args) {
	var actual = args.length;
	var expected = args.callee.length;
	if (actual !== expected) {
		throw Error("Expecten" + expected + "args:got" + actual);
	}
}

function fc(x, y, z) {
	check(arguments);
	return x + y + z;
}
console.log(fc(1, 3, 8));

console.log("------------8.7.2call() apply()---------------");
var kong = {
	x: 1
};
var jj = function(y) {
	return this.x + y;
};
var text1 = jj.call(kong, 1);
console.log(text1);

var bind_o = jj.apply(kong, [1, 2]);
console.log(bind_o);
console.log(jj.toString());

console.log("------------猴子补丁---------------");
// 将对象o中名为m()的方法替换为另一个方法
// // 可以在调用原始的方法之前和之后记录日志消息
function trace(o,m) {
	m=o.sum;
	var original_f = o.sum; //在闭包中保存原始方法
	o.sum = function() { // 定义新的方法
		console.log(new Date(), "Entering:", m); //输出日志消息
		var result = original_f.apply(this, arguments); // 调用原始函数
		console.log(new Date(), "Exiting:", o.sum); //输出日志消息
		return result; // 返回结
	};
}
var obj1 = {
	sum: function(x) {
		return x * x;
	}
};
trace(obj1);
console.log(obj1.sum(10));


console.log("------------8.8.1 使用函数处理数组---------------");
var data8 = [1, 1, 3, 3, 5, 5];
var total1 = 0,
	total2 = 0;
for (var i = 0; i < data8.length; i++) {
	total1 += data8[i];
}
var mean = total1 / data8.length;
console.log("数组平均值：" + mean);
for (var i = data8.length - 1; i >= 0; i--) {
	var deviation = data8[i] - mean;
	total2 += deviation * deviation;
}
var stddev = Math.sqrt(total2 / (data8.length - 1));
console.log("数组标准差" + stddev);

// 对于每个数组元素调用函数f()，并返回一个结果数组
// 如果Array.prototype.map定义了的话，就使用这个方法

var map = Array.prototype.map ? function(a, f) {
		return a.map(f);
	} // 如果已经存在map()方法，就直接使用它
	:
	function(a, f) { // 否则，自己实现一个
		var results = [];
		for (var i = 0, len = a.length; i < len; i++) {
			if (i in a) results[i] = f.call(null, a[i], i, a);
		}
		return results;
	}; // 使用函数f()和可选的初始值将数组a减至一个值

// 如果Array.prototype.reduce存在的话，就使用这个方法
var reduce = Array.prototype.reduce ? function(a, f, initial) { //如果reduce()方法存在的话
	if (arguments.length > 2) return a.reduce(f, initial); // 如果传入了一个初始值
	else return a.reduce(f); // 否则没有初始值
} : function(a, f, initial) { // 这个算法来自ES5规范
	var i = 0,
		len = a.length,
		accumulator; // 以特定的初始值开始，否则第一个值取自a
	if (arguments.length > 2) accumulator = initial;
	else { //找到数组中第一个已定义的索引
		if (len == 0) throw TypeError();
		while (i < len) {
			if (i in a) {
				accumulator = a[i++];
				break;
			} else i++;

		}
		if (i == len) throw TypeError();
	} // 对于数组中剩下的元素依次调用f()
	while (i < len) {
		if (i in a) accumulator = f.call(undefined, accumulator, a[i], i, a);
		i++;
	}
	return accumulator;
};

var suzu4 = [, 2, 3, "hhhj", 4];
for (i = 0; i < suzu4.length; i++) {
	console.log(i);
}
console.log(suzu4);
console.log(100 in suzu4);

console.log("------------8.8.2 高阶函数---------------");
// 这个高阶函数返回一个新的函数，这个新函数将它的实参传入f()
// 并返回f的返回值的逻辑非
function not(f) {
	return function() { //返回一个新的函数
		console.log(arguments);
		var result = f.apply(this, arguments); // 调用f()
		return !result; // 对结果求反
	};
}
var even = function(x) { // 判断a是否为偶数的函数
	console.log(x);
	return x % 2 === 0;
};
var odd = not(even); //一个新函数，所做的事情和even()相反
var sum11 = [1, 2, 3, 4, 5].every(odd);
console.log(sum11);

// 所返回的函数的参数应当是一个实参数组，并对每个数组元素执行函数f()
// // 并返回所有计算结果组成的数组
// // 可以对比一下这个函数和上文提到的map()函数
function mapper(f) {
	return function(a) {
		console.log(arguments);
		return map(a, f);
	};
}
var increment = function(x) {
	return x + 1;
};
var incrementer = mapper(increment);
var sum12 = incrementer([1, 2, 3]);
console.log(sum12);


// 返回一个新的可以计算f(g(...))的函数
//  返回的函数h()将它所有的实参传入g()，然后将g()的返回值传入f()
//   调用f()和g()时的this值和调用h()时的this值是同一个this
function compose(f, g) {
	return function() {
		console.log(arguments);
		return f.call(this, g.apply(this, arguments));
	};
}
var square1 = function(x) {
	return x * x;
};
var sum13 = function(x, y) {
	return x + y;
};
var squareofsum = compose(square1, sum13);
console.log(squareofsum(2,3));

console.log("------------8.8.2 不完全函数---------------");
// 实现一个工具函数将类数组对象（或对象）转换为真正的数组
// 在后面的示例代码中用到了这个方法将arguments对象转换为真正的数组
function array(a, n) {
	console.log(arguments);
	return Array.prototype.slice.call(a, n || 0);
} // 这个函数的实参传递至左侧
function partialLeft(f /*, ...*/ ) {
	console.log(arguments);
	var args = arguments; //保存外部的实参数组
	return function() { // 并返回这个函数
		var a = array(args, 1); // 开始处理外部的第1个args
		console.log(a);
		console.log(array(arguments));
		a = a.concat(array(arguments)); // 然后增加所有的内部实参
		console.log(a);
		return f.apply(this, a); // 然后基于这个实参列表调用f()
	};
}

// 这个函数的实参传递至右侧
function partialRight(f /*, ...*/ ) {
	var args = arguments; // 保存外部实参数组
	return function() { // 返回这个函数
		var a = array(arguments); //从内部参数开始
		a = a.concat(array(args, 1)); //然后从外部第1个args开始添加
		return f.apply(this, a); // 最后基于这个实参列表调用f()
	};
}

// 这个函数的实参被用做模板
// 实参列表中的undefined值都被填充
function partial(f /*, ... */ ) {
	var args = arguments; //保存外部实参数组
	return function() {
		var a = array(args, 1); //从外部args开始
		var i = 0,
			j = 0; // 遍历args，从内部实参填充undefined值
		for (; i < a.length; i++)
			if (a[i] === undefined) a[i] = arguments[j++]; // 现在将剩下的内部实参都追加进去
		a = a.concat(array(arguments, j));
		return f.apply(this, a);
	};
}

// 这个函数带有三个实参
var fq = function(x, y, z) { return x * (y - z);};

// 注意这三个不完全调用之间的区别
var args_l = partialLeft(fq, 2)(3, 4); // => -2:绑定第一个实参: 2 * (3 - 4)
console.log(args_l);
//partialRight(f, 2)(3, 4); // => 6: 绑定最后一个实参:3 * (4 - 2)
//partial(f, undefined, 2)(3, 4); // => -6: 绑定中间的实参: 3 * (2 - 4)




console.log("--------------8.8.4记忆----------");
function memorize(f) {
	console.log(arguments);
	var cache = {}; //将值保存在闭包内
	console.log(cache);
	return function() { // 将实参转换为字符串形式，并将其用做缓存的键
		console.log(arguments);
		var key = arguments.length + Array.prototype.join.call(arguments, ",");
		console.log(key);
		if (key in cache) return cache[key];
		else return cache[key] = f.apply(this, arguments);
	};
}
// 注意，当我们写一个递归函数时，往往需要实现记忆功能
// 我们更希望调用实现了记忆功能的递归函数，而不是原递归函数
var factorial = memorize(function(n) {
	return (n <= 1) ? 1 : n * factorial(n - 1);
});
var sum14= factorial(5);
console.log(sum14);

//9zhang
var lei1 = {x:1,y:2};
var lei2 =lei1;
lei2.z =3;
console.log(lei2);