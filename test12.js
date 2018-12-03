function makerIterator(array){
    let nextIndex = 0;
    return{
        next(){
            return nextIndex < array.length ?
            {value:array[nextIndex++]} :
            {done:true}
        }
    }
}
let it = makerIterator(['a','b']);
console.log(it.next().value);

//
let arr = ['a','b','e','c'];
let iter = arr[Symbol.iterator]();
console.log(arr.constructor());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

//
class RangeIterator {
    constructor(star,stop){
        this.value = star;
        this.stop = stop;
    }
    [Symbol.iterator](){
        return this;
    }
    next(){
        let value = this.value;
        if(value < this.stop){
            this.value++;
            return {done:false,value:value};
        }
        return {done:true,value:undefined};
    }
}
function range(start,stop){
    return new RangeIterator(start,stop);
}
console.log(range(0,3));
for(let value of range(0,3)){
    console.log(value);
}

//
function Obj(value){
    this.value = value;
    this.next =null;
}
Obj.prototype[Symbol.iterator] = function(){
    let iterator ={next:next};
    let current = this;
    function next(){
        if(current){
            let value = current.value;
            current = current.next;
            return {done:false,value:value};
        }else {
            return {done:true};
        }
    }
    return iterator;
}
let one = new Obj(1);
let two = new Obj(2);
let three = new Obj(3);

one.next = two;
two.next = three;
console.log(one);

for(let i of one){
    console.log(i);
}

//
let obj1 ={
    data:['hello','world'],
    [Symbol.iterator](){
        const self = this;
        let index = 0;
        return {
            next(){
                if(index < self.data.length){
                    return{
                        value:self.data[index++],
                        done:false
                    };
                }else {
                    return{value:undefined,done:true};
                }
            }
        };
    }
}
let blq = obj1[Symbol.iterator]();
console.log(blq.next());
console.log(blq.next());
console.log(blq.next());

//
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
console.log([...document.querySelectorAll('div')]);

//
let obj2 = {
    0:'one',
    1:'b',
    2:'three',
    length:3,
    [Symbol.iterator]:Array.prototype[Symbol.iterator]
}
for(let i of obj2) console.log(i);

//
let ss1 = new Set(['a','b','c']);
let [x,y] = ss1;
console.log(x);
let [first,...rest] =ss1;
console.log(first , rest);

//
let ss2 = new Set([1,2,1,1,2,3]);
console.log(ss2);
console.log(ss2.keys());
console.log(ss2.values());
console.log(ss2.entries());
for(let i of ss2.entries()) console.log(i);

let obj3 = new Set([obj1,obj2]);
console.log(obj3);
for(let i of obj3) console.log(i);

//
const ws1 = new Set([{x:1,y:2},[1,2,3]]);
console.log(ws1.size);

//
const map1 = new Map()
    .set(1,'a')
    .set(2,'b')
    .set(3,'c');
const map2 = new Map([...map1].filter(([k,v]) => k<3));
console.log(map1);
console.log(map2);

const map3 = new Map([...map1].map(([k,v])=> [k*2,'_'+v]));
console.log(map3);

//
map3.forEach((v,k,m)=>console.log(`key:${k} , value:${v} ,map:${m}`));

//Map 转为对象
function strMapToObj(map) {
    let obj = Object.create(Object.prototype);
    for (let [k, v] of map) {
        obj[k] = v;
    }
    return obj;
}
const obj4 =  strMapToObj(map3);
console.log(obj4); //{2: "_a", 4: "_b", 6: "_c"}
console.log(Object.entries(obj4));

//对象转为Map
function objToMap(obj){
    let map = new Map();
    for(let [k,v] of Object.entries(obj)){
        map.set(k,v);
    }
    return map;
}
const map4 =  objToMap(obj4);
console.log(map4); //Map(3) {"2" => "_a", "4" => "_b", "6" => "_c"}

//map to json
function mapToJson(map){
    return JSON.stringify(strMapToObj(map));
}
let json1 = mapToJson(map4);
console.log(json1); //{"2":"_a","4":"_b","6":"_c"}

//map to array json
function mapToArrayJson(map){
    return JSON.stringify([...map]);
}
let myMap = new Map([[true,7],[{x:3},['abc']]]);
const json2 =  mapToArrayJson(myMap);
console.log(json2); //[[true,7],[{"x":3},["abc"]]]

//json to map
function jsonToMap(jsonStr){
    return objToMap(JSON.parse(jsonStr));
}
let map5 = jsonToMap('{"yes":true,"no":false}');
console.log(map5); //Map(2) {"yes" => true, "no" => false}

//array json to map
function arrJsonToMap(json){
    return new Map(JSON.parse(json));
}
const map6 =  arrJsonToMap(json2);
console.log(map6);  //Map(2) {true => 7, {…} => Array(1)}