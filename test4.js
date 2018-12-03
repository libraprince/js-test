//9-19：属性描述符工具函数........................................................
// 将o的指定名字（或所有）的属性设置为不可写的和不可配置的
function freezeProps(o) {
    var props = (arguments.length == 1) // 如果只有一个参数
        ?
        Object.getOwnPropertyNames(o) // 使用所有的属性
        :
        Array.prototype.splice.call(arguments, 1); // 否则传入了指定名字的属性
    props.forEach(function(v) { // 将它们都设置为只读的和不可变的
        // 忽略不可配置的属性
        if (!Object.getOwnPropertyDescriptor(o, v).configurable) return;
        Object.defineProperty(o, v, {
            writable: false,
            configurable: true,
            //enumerable:false
        });
    });
    return o; // 所以我们可以继续使用它
}
// 将o的指定名字（或所有）的属性设置为不可枚举的和可配置的
function hideProps(o) {
    var props = (arguments.length == 1) // 如果只有一个参数
        ?
        Object.getOwnPropertyNames(o) // 使用所有的属性
        :
        Array.prototype.splice.call(arguments, 1); // 否则传入了指定名字的属性
    props.forEach(function(v) {
        // 将它们设置为不可枚举的
        // 忽略不可配置的属性
        if (!Object.getOwnPropertyDescriptor(o, v).configurable) return;
        Object.defineProperty(o, v, {
            enumerable: false
        });
    });
    return o;
}
//9-20：一个简单的不可变的类........................................................
console.log('9-20：一个简单的不可变的类.......................');
function Range3(from, to) { // 不可变的类Range的构造函数
    this.from = from;
    this.to = to;
    freezeProps(this); // 将属性设置为不可变的
}
Range3.prototype = hideProps({ // 使用不可枚举的属性来定义原型
    constructor: Range3,
    includes: function(x) {
        return this.from <= x && x <= this.to;
    },
    foreach: function(f) {
        for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    toString: function() {
        return "(" + this.from + "..." + this.to + ")";
    }
});
var rr9 =new Range3(2,5);
console.log(rr9);
rr9.from=1;
console.log(rr9);
var rr10 = new Range3(2,3);
//Object.freeze(rr10);
Object.defineProperties(rr10, {from:{writable:true},to:{writable:true}});//属性描述writable重新配置为true，未变的配置保持不变
var ll=Object.getOwnPropertyDescriptor(rr10, Object.getOwnPropertyNames(rr10)[0]);//获取from属性描述
console.log(ll);
rr10.from=1; //属性重新赋值
console.log(rr10);
console.log(rr10.propertyIsEnumerable()); //属性默认是false
console.log(Object.isFrozen(rr10)); //false 对象默认为非冻结状态
console.log(Object.isExtensible(rr10)); //true 对象是否可拓展新属性，默认为true
console.log(Object.keys(rr10));//返回可枚举属性，Object.getOwnPropertyNames()返回一切非继承属性，两者有区别
console.log(Object.getOwnPropertyNames(rr10)); //返回一切非继承属性，两者有区别
Object.freeze(rr10); //冻结对象
var ll2=Object.getOwnPropertyDescriptor(rr10, Object.getOwnPropertyNames(rr10)[0]);//获取from属性描述
console.log(ll2); //只有enumerable为 true，即该对象为只读对象
/*对象冻结有三个方法
*Object.freeze(obj)
*Object.preventExtensions(obj)
*Object.defineProperties(obj, props)所有属性设置设置为只读*/
console.log(rr10.propertyIsEnumerable('toString')); //false 判定对象的属性是否可枚举
console.log(Object.propertyIsEnumerable('toString')); //false
console.log(Object.toLocaleString(rr10));//本地化字符串
console.log(Object.toString(rr10));//表示该对象的字符串
console.log(rr10.toString());//使用自定义tostring方法
var rr11 = 'dfdfd';
console.log(rr11);
console.log(Object.valueOf(1));
console.log(Object.valueOf(rr10)); //与指定对象关联的原始值，如果存在这样一个值的话。如果没有与该对象关联的值，则返回对象本身。