
function* helloWorld() {
	yield 'hello';
	yield 'world';
	return 'ending';
}

const hw = helloWorld();
console.log(hw.next());
console.log(hw.next());
//console.log(hw.next());
//console.log(hw.next());
console.log(hw);
console.log(Reflect.ownKeys(hw));

//
/*function* f(){
	console.log('done');
}
let generator = f();
setTimeout(()=>{generator.next()},1000);*/

//报错
/*let arr = [1,[[1,3],4],[5,6]];
const flat = function* (a){
	a.forEach(function(item){
		if(typeof item !== 'number'){
			yield* flat(item);
		}else {
			yield item;
		}
	});
};

for(let v of falt(arr)) console.log(v);*/

var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function*(a) {
    for (let i = 0; i < a.length; i++) {
        let item = a[i];
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item;
        }
    }
};

for (var f of flat(arr)) {
    console.log(f);
}

//
function* demo(){
	console.log('hello'+(yield 5));
	console.log('hello'+(yield 123));
}
let de =demo();
console.log(de);
console.log(de.next());
console.log(de.next());
console.log(de.next());

//
var myIterable = {};
myIterable[Symbol.iterator] = function*(){
	yield 1;
	yield 2;
	yield 3;
};
console.log([...myIterable]);

console.log(de[Symbol.iterator]()===de);

//
function* fn1() {
	for (let i = 0; true; i++) {
		let reset = yield i;
		if (reset) {
			i = -1;
		}
	}
}
let gg= fn1();
console.log(gg.next()); //0
console.log(gg.next()); //1
console.log(gg.next()); //2
console.log(gg.next(true)); //0
console.log(gg.next()); //1

//
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

//
function* objEntries(){
	let propKeys = Object.keys(this);
	for(let propKey of propKeys){
		yield [propKey,this[propKey]];
	}
}
let jane = {first:'jane',last:'Doe'};

jane[Symbol.iterator] = objEntries;

for(let [k,v] of jane){
	console.log(`${k},${v}`);
}

//
function* numbers(){
	yield 1;
	yield 2;
	yield 3;
	yield 4;
}
console.log([...numbers()]);
console.log(Array.from(numbers()));

//
const fn2 = function*(){
	try{
		yield;
	}catch(e){
		console.log('inside catch: ' + e);
	}
};
let ifn = fn2();
ifn.next();
try {
	ifn.throw('a');
	ifn.throw('b');
} catch(e) {
	// statements
	console.log('outside catch: '+e);
}

const fn3 = function *() {
	while(true){
		try {
			yield;
		} catch(e) {
			if (e !='a') {
				throw e;
			}
			console.log(e);
		}
	}
};

let ifn1 = fn2();
ifn1.next();

try {
	throw new Error('a');
} catch(e) {
	// statements
	console.log('outside catch: '+e);
}

//
const fn4 = function*(x,y){
	let result = yield x+y;
	return result;
};
const gen = fn4(1,3);
console.log(gen.next());
console.log(gen.next(1));
//console.log(gen.throw(new Error('make a error')));
console.log(gen.return(2));

//
function* foo(){
	yield 'a';
	yield 'b';
	return 'nihao';
}
function* bar(){
	yield 'x';
	yield* foo();
	yield 'y';
}
for(let v of bar()) console.log(v);

//
function* inner(){
	yield 'hello';
}
function* outer1(){
	yield 'open';
	yield inner();
	yield 'close';
}
var gen1 = outer1();
console.log(gen1.next().value); //'open'
console.log(gen1.next().value); //iterator obj
console.log(gen1.next().value); //'close'

//
function* foo1(){
	yield 2;
	yield 3;
	return 'foo';
}
function* bar1(){
	yield 1;
	let v= yield* foo1();
	console.log('v: '+v);
	yield 4;
}
for(let v of bar1()) console.log(v);
console.log([...bar1()]);

//
function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  yield result;
}

var arr1 = [...logReturned(genFuncWithReturn())];
console.log(arr1); // The result // 值为 [ 'a', 'b' ]

//*****************树结构思维
function* iterTree(arr) {
	if(Array.isArray(arr)){ //判断是否是数组
		for(let v of arr){
			yield* iterTree(v); //得到的数据重新传入函数进行判断
		}
	}else { //非数组的元素直接yield
		yield arr;
	}
}
const tree = [[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]];
for(let x of iterTree(tree)) console.log(x);

console.log(tree.flat(Infinity));


//
function* gen2(){
	this.a =1;
	yield this.b =2;
	yield this.c =3;
}

function Fn(){
	return gen2.call(gen2.prototype);
}

var ff = new Fn();
console.log(ff);
console.log(ff.next());
console.log(ff.next());
console.log(ff.next());
console.log(`${ff.a} : ${ff.b} : ${ff.c}`);

//
var clock = function*(){
	while(true){
		console.log('Tick!');
		yield;
		console.log('TTT');
		yield;
	}
};
const gen3 = clock();

console.log(gen3.next());
console.log(gen3.next());
console.log(gen3.next());
console.log(gen3.next());
