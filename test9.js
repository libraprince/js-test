//9-1工厂函数........................................................
//range.js: 实现一个能表示值的范围的类
// 这个工厂方法返回一个新的"范围对象"
/*function range(from, to) {
    // 使用inherit()函数来创建对象，这个对象继承自在下面定义的原型对象
    // 原型对象作为函数的一个属性存储，并定义所有"范围对象"所共享的方法（行为）
    var r = inherit(range.methods);
    // 存储新的"范围对象"的起始位置和结束位置（状态）
    // 这两个属性是不可继承的，每个对象都拥有唯一的属性
    r.from = from;
    r.to = to;
    // 返回这个新创建的对象
    return r;
}
// 原型对象定义方法，这些方法为每个范围对象所继承
range.methods = {
    // 如果x在范围内，则返回true；否则返回false
    // 这个方法可以比较数字范围，也可以比较字符串和日期范围
    includes: function(x) {
        return this.from <= x && x <= this.to;
    },
    // 对于范围内的每个整数都调用一次f
    // 这个方法只可用做数字范围
    foreach: function(f) {
        for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    // 返回表示这个范围的字符串
    toString: function() {
        return "(" + this.from + "..." + this.to + ")";
    }
};
// 这里是使用"范围对象"的一些例子
var r = range(1, 3); // 创建一个范围对象
r.includes(2); // => true: 2 在这个范围内
r.foreach(console.log); // 输出 1 2 3
console.log(r); // 输出 (1...3)*/

//9-2类和构造函数........................................................
// range2.js: 表示值的范围的类的另一种实现
// 这是一个构造函数，用以初始化新创建的"范围对象"
// 注意，这里并没有创建并返回一个对象，仅仅是初始化
function Range(from, to) {
    // 存储"范围对象"的起始位置和结束位置（状态）
    // 这两个属性是不可继承的，每个对象都拥有唯一的属性
    this.from = from;
    this.to = to;
}
// 所有的"范围对象"都继承自这个对象
// 注意，属性的名字必须是"prototype"
Range.prototype = {
    constructor:Range,
    // 如果x在范围内，则返回true；否则返回false
    // 这个方法可以比较数字范围，也可以比较字符串和日期范围
    includes: function(x) { return this.from <= x && x <= this.to; },
    //对于范围内的每个整数都调用一次f
    // 这个方法只可用于数字范围
    foreach: function(f) {
        for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    // 返回表示这个范围的字符串
    toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};

// 根据下边界来对Range对象排序，如果下边界相等则比较上边界
// 如果传入非Range值，则抛出异常
// 当且仅当this.equals(that)时，才返回0
Range.prototype.compareTo = function(that) {
    if (!(that instanceof Range))
        throw new Error("Can't compare a Range with " + that);
    var diff = this.from - that.from; // 比较下边界
    if (diff == 0) diff = this.to - that.to; // 如果相等，比较上边界
    return diff;
};
Range.byLowerBound = function(a,b) { return a.compareTo(b); };
//ranges.sort(Range.byLowerBound);

// 这里是使用"范围对象"的一些例子
var r = new Range(1, 3); // 创建一个范围对象
var r1 = new Range(1, 4); // 创建一个范围对象
var r2 = new Range(3, 6); // 创建一个范围对象
var ranges =[r,r1,r2];
var resules=ranges.sort(Range.byLowerBound);
console.log(resules);

console.log(r.includes(2)); // => true: 2 在这个范围内
r.foreach(console.log); // 输出 1 2 3
console.log(r); // 输出 (1...3)


//9-3类的继承........................................................
// 一个用以定义简单类的函数
function defineClass(constructor, // 用以设置实例的属性的函数
    methods, // 实例的方法，复制至原型中
    statics) // 类属性，复制至构造函数中
{
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    return constructor;
}
// 这是Range类的另一个实现
var SimpleRange = defineClass(function(f, t) {
    this.f = f;
    this.t = t;
}, {
    includes: function(x) {
        return this.f <= x && x <= this.t;
    },
    toString: function() {
        return this.f + "..." + this.t;
    }
}, {
    upto: function(t) {
        return new SimpleRange(0, t);
    }
});
console.log(new SimpleRange(2,6));

//9-4判断类型,获取函数名........................................................
/** * 以字符串形式返回o的类型:
 * -如果o是null, 返回 "null"；如果o是 NaN, 返回 "nan"
 * -如果typeof所返回的值不是"object"，则返回这个值
 * (注意，有一些JavaScript的实现将正则表达式识别为函数)
 * -如果o的类不是"Object"，则返回这个值
 * -如果o包含构造函数并且这个构造函数具有名称, 则返回这个名称
 * -否则，一律返回"Object" **/
function type(o) {
	var t, c, n;
	// type, class, name
	//处理null值的特殊情形
	if (o === null) return "null";

	// 另外一种特殊情形: NaN和它自身不相等
	if (o !== o) return "nan";

	// 如果typeof的值不是"object"，则使用这个值
	// 这可以识别出原始值的类型和函数
	if ((t = typeof o) !== "object") return t;

	// 返回对象的类名，除非值为"Object"
	// 这种方式可以识别出大多数的内置对象
	if ((c = classof(o)) !== "Object") return c;

	// 如果对象构造函数的名字存在的话，则返回它
	if (o.constructor && typeof o.constructor === "function" &&
		(n = o.constructor.getName())) return n;

	// 其他的类型都无法判别，一律返回"Object"
	return "Object";
}
// 返回对象的类
function classof(o) {
	return Object.prototype.toString.call(o).slice(8, -1);
}
// 返回函数的名字（可能是空字符串），不是函数的话返回null
Function.prototype.getName = function() {
	if ("name" in this) return this.name;
	return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
};
console.log(type(r)); //输出Object ，类型
console.log(classof(r)); //输出Object ，原型类
console.log(classof.getName()); //输出 classof ，返回classof函数名字

var mm=['0gfg','1dd','2fgfg','3ytyy','4cdf'];
for(var i in mm){
    console.log(mm[i]);
}

//9-5鸭式辩型的理念定义了quacks()函数........................................................
/*quacks()用以检查一个对象（第一个实参）是否实现了剩下的参数所表示的方法。
对于除第一个参数外的每个参数，如果是字符串的话则直接检查是否存在以它命名的
方法；如果是对象的话则检查第一个对象中的方法是否在这个对象中也具有同名的方
法；如果参数是函数，则假定它是构造函数，函数将检查第一个对象实现的方法是否
在构造函数的原型对象中也具有同名的方法。
*/
// 如果o实现了除第一个参数之外的参数所表示的方法，则返回true
function quacks(o /*, ... */ ) {
    for (var i = 1; i < arguments.length; i++) {
        // 遍历o之后的所有参数
        var arg = arguments[i];
        switch (typeof arg) {
            // 如果参数是：
            case 'string':
                // string: 直接用名字做检查
                if (typeof o[arg] !== "function") return false;
                continue;
            case 'function':
                // function: 检查函数的原型对象上的方法
                // 如果实参是函数, 则使用它的原型
                arg = arg.prototype;
                // 进入下一个case
            case 'object':
                // object: 检查匹配的方法
                for (var m in arg) {
                    // 遍历对象的每个属性
                    if (typeof arg[m] !== "function") continue;
                    // 跳过不是方法的属性
                    if (typeof o[m] !== "function") return false;
                }
        }
    }
    // 如果程序能执行到这里，说明o实现了所有的方法
    return true;
}


//9-6唯一值的任意集合........................................................
function Set() { // 这是一个构造函数
    this.values = {}; // 集合数据保存在对象的属性里
    this.n = 0; // 集合中值的个数
    this.add.apply(this, arguments); // 把所有参数都添加进这个集合
}

// 将每个参数都添加至集合中
Set.prototype.add = function() {
    for (var i = 0; i < arguments.length; i++) { // 遍历每个参数
        var val = arguments[i]; // 待添加到集合中的值
        var str = Set._v2s(val); // 把它转换为字符串
        if (!this.values.hasOwnProperty(str)) { // 如果不在集合中
            this.values[str] = val; // 将字符串和值对应起来
            this.n++; // 集合中值的计数加一
        }
    }
    return this; // 支持链式方法调用
};

// 从集合删除元素，这些元素由参数指定
Set.prototype.remove = function() {
    for (var i = 0; i < arguments.length; i++) { // 遍历每个参数
        var str = Set._v2s(arguments[i]); // 将字符串和值对应起来
        if (this.values.hasOwnProperty(str)) { // 如果它在集合中
            delete this.values[str]; // 删除它
            this.n--; //集合中值的计数减一
        }
    }
    return this; // 支持链式方法调用
};

// 如果集合包含这个值，则返回true；否则，返回false
Set.prototype.contains = function(value) {
    return this.values.hasOwnProperty(Set._v2s(value));
};

// 返回集合的大小
Set.prototype.size = function() {
    return this.n;
};

// 遍历集合中的所有元素，在指定的上下文中调用f
Set.prototype.foreach = function(f, context) {
    for (var s in this.values) // 遍历集合中的所有字符串
        if (this.values.hasOwnProperty(s)) // 忽略继承的属性
            f.call(context, this.values[s]); // 调用f，传入value
};

// 这是一个内部函数，用以将任意JavaScript值和唯一的字符串对应起来
Set._v2s = function(val) {
    switch (val) {
        case undefined:
            return 'u'; //特殊的原始值
        case null:
            return 'n'; //值只有一个字母
        case true:
            return 't'; // 代码
        case false:
            return 'f';
        default:
            switch (typeof val) {
                case 'number':
                    return '#' + val; // 数字都带有 # 前缀
                case 'string':
                    return '"' + val; // 字符串都带有" 前缀
                default:
                    return '@' + objectId(val); // Objs and funcs get @
            }
    }
    // 对任意对象来说，都会返回一个字符串
    // 针对不同的对象，这个函数会返回不同的字符串
    // 对于同一个对象的多次调用，总是返回相同的字符串
    // 为了做到这一点，它给o创建了一个属性，在ES5中，这个属性是不可枚举且是只读的
    function objectId(o) {
        var prop = "|**objectid**|"; //私有属性，用以存放id
        if (!o.hasOwnProperty(prop)) //如果对象没有id
            o[prop] = Set._v2s.next++; //将下一个值赋给它，即添加id
        return o[prop]; // 返回这个id
    }
};

// 9.6.3将这些方法添加至Set类的原型对象中
function extend(o, p) {
    for (var prop in p) {
        o[prop] = p[prop];
    }
    return o;
}
extend(Set.prototype, { // 将集合转换为字符串
    toString: function() {
        var s = "{",
            i = 0;
        this.foreach(function(v) {
            s += ((i++ > 0) ? ", " : "") + v;
        });
        return s + "}";
    }, // 类似 toString, 但是对于所有的值都将调用toLocaleString()
    toLocaleString: function() {
        var s = "{",
            i = 0;
        this.foreach(function(v) {
            if (i++ > 0) s += ", ";
            if (v == null) s += v; // null 和 undefined
            else s += v.toLocaleString(); // 其他情况
        });
        return s + "}";
    }, // 将集合转换为值数组
    toArray: function() {
        var a = [];
        this.foreach(function(v) {
            a.push(v);
        });
        return a;
    }
});
// 对于要从JSON转换为字符串的集合都被当做数组来对待
Set.prototype.toJSON = Set.prototype.toArray;



Set._v2s.next = 100; // 设置初始id的值

var newSet1 = new Set([1,2],'tr',5,6,6,{x:1,y:2},function(){console.log('hello set');});
console.log(newSet1);
var newSet2 = new Set(1,2,'fdf',true,null);
console.log(newSet2);
newSet1.foreach(function(s) {
    var type = Object.prototype.toString.call(s).slice(8, -1);
    console.log(type.toString+'.............');
}, this.arguments);


//9-7 JavaScript中的枚举类型........................................................
// inherit() 返回了一个继承自原型对象p的属性的新对象
// 这里使用ECMAScript 5中的Object.create()函数（如果存在的话）
// 如果不存在Object.create()，则退化使用其他方法
function inherit(p) {
    if (p == null) throw TypeError(); // p是一个对象，但不能是null
    if (Object.create) // 如果Object.create()存在
        return Object.create(p); // 直接使用它
    var t = typeof p; // 否则进行进一步检测
    if (t !== "object" && t !== "function") throw TypeError();

    function f() {} // 定义一个空构造函数
    f.prototype = p; //将其原型属性设置为p
    return new f(); //使用f()创建p的继承对象
}

// 这个函数创建一个新的枚举类型，实参对象表示类的每个实例的名字和值
// 返回值是一个构造函数，它标识这个新类
// 注意，这个构造函数也会抛出异常：不能使用它来创建该类型的新实例
// 返回的构造函数包含名/值对的映射表
// 包括由值组成的数组，以及一个foreach()迭代器函数
function enumeration(namesToValues) { // 这个虚拟的构造函数是返回值
    var enumeration = function() {
        throw "Can't Instantiate Enumerations";
    }; // 枚举值继承自这个对象
    var proto = enumeration.prototype = {
        constructor: enumeration, // 标识类型
        toString: function() {
            return this.name;
        }, // 返回名字
        valueOf: function() {
            return this.value;
        }, //返回值
        toJSON: function() {
            return this.name;
        } // 转换为JSON
    };
    enumeration.values = []; // 用以存放枚举对象的数组[x:{name:x,value:1},y{name:y,value:2}]
    // 现在创建新类型的实例
    for (var name in namesToValues) { // 遍历每个值
        var e = inherit(proto); // 创建一个代表它的对象
        e.name = name; // 给它一个名字
        e.value = namesToValues[name]; // 给它一个值
        enumeration[name] = e; // 将它设置为构造函数的属性
        enumeration.values.push(e); // 将它存储到值数组中
    } // 一个类方法，用来对类的实例进行迭代
    enumeration.foreach = function(f, c) {
        for (var i = 0; i < this.values.length; i++)
            f.call(c, this.values[i]);
    }; // 返回标识这个新类型的构造函数
    return enumeration;
}
var enumer = enumeration({x:1,y:2});//enumer = {x:{name:x,value:1},y{name:y,value:2}}
console.log(enumer.x);
enumer.foreach(function(s){
    console.log(s.name.toString());
});
/*var enumer1 ={z:3,v:4};
for(var jindex in enumer1){
    console.log(enumer1[jindex]);
}*/

//9-8 使用枚举类型来表示一副扑克牌........................................................
// 定义一个表示"玩牌"的类
function Card(suit, rank) {
    this.suit = suit; // 每张牌都有花色
    this.rank = rank; // 以及点数
}

// 使用枚举类型定义花色和点数
Card.Suit = enumeration({
    Clubs: 1,
    Diamonds: 2,
    Hearts: 3,
    Spades: 4
});
Card.Rank = enumeration({
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Jack: 11,
    Queen: 12,
    King: 13,
    Ace: 14
});

// 定义用以描述牌面的文本
Card.prototype.toString = function() {
    return this.rank.toString() +
        " of " + this.suit.toString();
};

// 比较扑克牌中两张牌的大小
Card.prototype.compareTo = function(that) {
    if (this.rank < that.rank) return -1;
    if (this.rank > that.rank) return 1;
    return 0;
};

// 以扑克牌的玩法规则对牌进行排序的函数
Card.orderByRank = function(a, b) {
    return a.compareTo(b);
};

// 以桥牌的玩法规则对扑牌进行排序的函数
Card.orderBySuit = function(a, b) {
    if (a.suit < b.suit) return -1;
    if (a.suit > b.suit) return 1;
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
};

// 定义用以表示一副标准扑克牌的类
function Deck() {
    var cards = this.cards = []; // 一副牌就是由牌组成的数组
    Card.Suit.foreach(function(s) { // 初始化这个数组

        Card.Rank.foreach(function(r) {
            cards.push(new Card(s, r));
        });
    });
}
// 洗牌的方法: 重新洗牌并返回洗好的牌
Deck.prototype.shuffle = function() {
// 遍历数组中的每个元素，随机找出牌面最小的元素，并与之（当前遍历的元素）交换
    var deck = this.cards,
        len = deck.length;
    for (var i = len - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1)),
            temp; // 随机数
        temp = deck[i], deck[i] = deck[r], deck[r] = temp; // 交换
    }
    return this;
};

// 发牌的方法: 返回牌的数组
Deck.prototype.deal = function(n) {
    if (this.cards.length < n) throw "Out of cards";
    return this.cards.splice(this.cards.length - n, n);
};

// 创建一副新扑克牌，洗牌并发牌
var deck = (new Deck()).shuffle();
console.log(deck);
var hand = deck.deal(13).sort(Card.orderBySuit);


//9-10 类的私有状态........................................................
function Range1(from,to){
    //不要将端点保存为对象的属性，相反
    //定义存取器函数来返回端点的值
    //这些值都保存在闭包中
    this.from = function(){
        return from;
    };
    this.to=function(){
        return to;
    };
}
Range1.prototype = {
    constructor: Range1,
    //原型上无法直接操作端点
    //他们必须调用存取器方法
    includes: function(x) {
        return this.from() <= x && x <= this.to();
    },
    foreach: function(f) {
        for (var x = Math.ceil(this.from()), max = this.to(); x <= max; x++) {
            f(x);
        }
    },
    toString: function() {
        return "(" + this.from() + "...." + this.to();
    }
};
var rr =new Range1(1,5);
console.log(rr.from());
//9-10.1 构造函数的重载和工厂方法........................................................
//重载
/*function Set() {
    this.values = {}; //用这个对象的属性来保存这个集合
    this.n = 0; //集合中的个数

    //如果传入一个类数组的对象，将这个元素添加至集合中
    //否则，将所有的参数都添加至集合中
    if (arguments.length == 1 && isArrayLike(arguments[0]))
        this.add.apply(this, arguments[0]);
    else if (arguments.length > 0)
        this.add.apply(this, arguments);
}*/
//工厂方法
Set.fromArray=function(a){
    s =new Set(); //创建集合
    s.add.apply(s,a); //将数组a的成员作为参数传入add（）方法
    return s; //
};

var rr1 =new Set();
//var rr2 =rr1.fromArray(1,2,'dfdf',3);
console.log(rr1);


//9-11 定义子类........................................................
// 用一个简单的函数创建简单的子类
function defineSubclass(superclass, // 父类的构造函数
    constructor, // 新的子类的构造函数
    methods, // 实例方法: 复制至原型中
    statics) // 类属性: 复制至构造函数中
{
    constructor.prototype = inherit(superclass.prototype);// 建立子类的原型对象
    constructor.prototype.constructor = constructor; //重载继承来的constructor属性
    // 像对常规类一样复制方法和类属性
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    // 返回这个类
    return constructor;
}

// 也可以通过父类构造函数的方法来做到这一点
Function.prototype.extend = function(constructor, methods, statics) {
    return defineSubclass(this, constructor, methods, statics);
};

//9-12 一个简单的子类........................................................
// 构造函数
function SingletonSet(member) {
    this.member = member; //记住集合中这个唯一的成员
}
// 创建一个原型对象，这个原型对象继承自Set的原型
SingletonSet.prototype = inherit(Set.prototype);
// 给原型添加属性
// 如果有同名的属性就覆盖Set.prototype中的同名属性
extend(SingletonSet.prototype, {
    // 设置合适的constructor属性
    constructor: SingletonSet,
    // 这个集合是只读的：调用add()和remove()都会报错
    add: function() {
        throw "read-only set";
    },
    remove: function() {
        throw "read-only set";
    },
    // SingletonSet的实例中永远只有一个元素
    size: function() {
        return 1;
    },
    // 这个方法只调用一次，传入这个集合的唯一成员
    foreach: function(f, context) {
        f.call(context, this.member);
    },
    // contains()方法非常简单：只须检查传入的值是否匹配这个集合唯一的成员即可
    contains: function(x) {
        return x === this.member;
    }
});
var rr3 = new SingletonSet(5);
rr3.foreach(function(x){console.log(x);});


//9-13 ：在子类中调用父类的构造函数和方法........................................................
/* * NonNullSet 是Set的子类，它的成员不能是null 和undefined */
function NonNullSet() {
    //仅链接到父类
    //作为普通函数调用父类的构造函数来初始化通过该构造函数调用创建的对象
    Set.apply(this, arguments);
}
// 将NonNullSet设置为Set的子类
NonNullSet.prototype = inherit(Set.prototype);
NonNullSet.prototype.constructor = NonNullSet;
// 为了将null和undefined排除在外，只须..重写add()方法
NonNullSet.prototype.add = function() { //检查参数是不是null或undefined
    for (var i = 0; i < arguments.length; i++)
        if (arguments[i] == null)
            throw new Error("Can't add null or undefined to a NonNullSet");
    //调用父类的add()方法以执行实际插入操作
    return Set.prototype.add.apply(this, arguments);
};
var rr4=new NonNullSet(1,2,6,'gfgg');
console.log(rr4);
rr4.foreach(function(x){console.log(x);});
console.log(rr4.contains(2));

//9-14 ：类工厂和方法链........................................................
/*001
 * 这个函数返回具体Set类的子类
 * 并重写该类的add()方法用以对添加的元素做特殊的过滤 */
function filteredSetSubclass(superclass, filter) {
    var constructor = function() { // 子类构造函数
        superclass.apply(this, arguments); // 调用父类构造函数
    };
    var proto = constructor.prototype = inherit(superclass.prototype);
    proto.constructor = constructor;
    proto.add = function() {
    //在添加任何成员之前首先使用过滤器将所有参数进行过滤
        for (var i = 0; i < arguments.length; i++) {
            var v = arguments[i];
            if (!filter(v)) throw ("value " + v + " rejected by filter");
        }
        //调用父类的add()方法
        superclass.prototype.add.apply(this, arguments);
    };
    return constructor;
}
// 定义一个只能保存字符串的"集合"类
var StringSet = filteredSetSubclass(Set,
    function(x) {
        return typeof x === "string";
    });
console.log(new StringSet('hhh','666'));

// 这个集合类的成员不能是null、undefined或函数
var MySet = filteredSetSubclass(NonNullSet,
    function(x) {
        return typeof x !== "function";
    });

//002用包装函数和例9-11的Function.proto-type.extend()方法来重写NonNullSet：
var NonNullSet2 = (function() { // 定义并立即调用这个函数
    var superclass = Set; // 仅指定父类
    return superclass.extend(
        function() {
            superclass.apply(this, arguments);//调用构造函数
        }, // 构造函数
        { // 方法
            add: function() { // 检查参数是否是null或undefined
                for (var i = 0; i < arguments.length; i++)
                    if (arguments[i] == null)
                        throw new Error("Can't add null or undefined");
                //调用父类的add()方法以执行实际插入操作
                return superclass.prototype.add.apply(this, arguments);
            }
        });
}());

var rr5 =new NonNullSet2(5,6,'nbn');
console.log(rr5);

//9-15：使用组合代替继承的集合的实现........................................................
/* * 实现一个FilteredSet，它包装某个指定的"集合"对象，
 * 并对传入add()方法的值应用了某种指定的过滤器
 * "范围"类中其他所有的核心方法延续到包装后的实例中 */
var FilteredSet = Set.extend(
    function FilteredSet(set, filter) { // 构造函数
        this.set = set;
        this.filter = filter;
    }, { // 实例方法
        add: function() {
            // 如果已有过滤器，直接使用它
            if (this.filter) {
                for (var i = 0; i < arguments.length; i++) {
                    var v = arguments[i];
                    if (!this.filter(v))
                        throw new Error("FilteredSet: value " + v +
                            " rejected by filter");
                }
            }
            // 调用set中的add()方法
            this.set.add.apply(this.set, arguments);
            return this;
        },
        // 剩下的方法都保持不变
        remove: function() {
            this.set.remove.apply(this.set, arguments);
            return this;
        },
        contains: function(v) {
            return this.set.contains(v);
        },
        size: function() {
            return this.set.size();
        },
        foreach: function(f, c) {
            this.set.foreach(f, c);
        }
    });


//9-16：抽象类和非抽象Set类的层次结构........................................................
// 这个函数可以用做任何抽象方法，非常方便
function abstractmethod() {
    throw new Error("abstract method");
}
/* * AbstractSet类定义了一个抽象方法：contains() */
function AbstractSet() {
    throw new Error("Can't instantiate abstract classes ");
}
AbstractSet.prototype.contains = abstractmethod;
/* * NotSet是AbstractSet的一个非抽象子类
 * 所有不在其他集合中的成员都在这个集合中
 * 因为它是在其他集合是不可写 的条件下定义的
 * 同时由于它的成员是无限个，因此它是不可枚举的
 * 我们只能用它来检测元素成员的归属情况
 * 注意，我们使用了Function.prototype.extend()方法来定义这个子类 */
var NotSet = AbstractSet.extend(
    function NotSet(set) {
        this.set = set;
    }, {
        contains: function(x) {
            return !this.set.contains(x);
        },
        toString: function(x) {
            return "~" + this.set.toString();
        },
        equals: function(that) {
            return that instanceof NotSet &&
                this.set.equals(that.set);
        }
    });
/* * AbstractEnumerableSet 是AbstractSet的一个抽象子类
 * 它定义了抽象方法size()和foreach()
 * 然后实现了非抽象方法isEmpty()、toArray()、to[Locale]String()和equals()方法
 * 子类实现了contains()、size()和foreach()，这三个方法可以很轻易地调用这5个非抽象方法 */
var AbstractEnumerableSet = AbstractSet.extend(function() {
    throw new Error("Can 't instantiate abstract classes");
}, {
    size: abstractmethod,
    foreach: abstractmethod,
    isEmpty: function() {
        return this.size() == 0;
    },
    toString: function() {
        var s = "{",
            i = 0;
        this.foreach(function(v) {
            if (i++ > 0) s += ", ";
            s += v;
        });
        return s + "}";
    },
    toLocaleString: function() {
        var s = "{",
            i = 0;
        this.foreach(function(v) {
            if (i++ > 0) s += ", ";
            if (v == null) s += v; // null和undefined
            else s += v.toLocaleString(); // 其他的情况
        });
        return s + "}";
    },
    toArray: function() {
        var a = [];
        this.foreach(function(v) {
            a.push(v);
        });
        return a;
    },
    equals: function(that) {
        if (!(that instanceof AbstractEnumerableSet)) return false;
        // 如果它们的大小不同，则它们不相等
        if (this.size() != that.size()) return false;
        //检查每一个元素是否也在that中
        try {
            this.foreach(function(v) {
                if (!that.contains(v)) throw false;
            });
            return true; // 所有的元素都匹配: 集合相等
        } catch (x) {
            if (x === false) return false; // 集合不相等
            throw x; //发生了其他的异常：重新抛出异常
        }
    }
});
/* * SingletonSet是AbstractEnumerableSet的非抽象子类
 * singleton集合是只读的，它只包含一个成员 */
var SingletonSet = AbstractEnumerableSet.extend(
    function SingletonSet(member) {
        this.member = member;
    }, {
        contains: function(x) {
            return x === this.member;
        },
        size: function() {
            return 1;
        },
        foreach: function(f, ctx) {
            f.call(ctx, this.member);
        }
    });
/* * AbstractWritableSet是AbstractEnumerableSet的抽象子类
 * 它定义了抽象方法add()和remove()
 * 然后实现了非抽象方法union()、intersection()和 difference() */
var AbstractWritableSet = AbstractEnumerableSet.extend(function() {
    throw new Error("Can'    t instantiate abstract classes ");
}, {
    add: abstractmethod,
    remove: abstractmethod,
    union: function(that) {
        var self = this;
        that.foreach(function(v) {
            self.add(v);
        });
        return this;
    },
    intersection: function(that) {
        var self = this;
        this.foreach(function(v) {
            if (!that.contains(v)) self.remove(v);
        });
        return this;
    },
    difference: function(that) {
        var self = this;
        that.foreach(function(v) {
            self.remove(v);
        });
        return this;
    }
});
/* * ArraySet是AbstractWritableSet的非抽象子类
 * 它以数组的形式表示集合中的元素
 * 对于它的contains()方法使用了数组的线性查找
 * 因为contains()方法的算法复杂度是O(n)而不是O(1)
 * 它非常适用于相对小型的集合，注意，这里的实现用到了ES5的数组方法indexOf()和forEach() */
var ArraySet = AbstractWritableSet.extend(function ArraySet() {
    this.values = [];
    this.add.apply(this, arguments);
}, {
    contains: function(v) {
        return this.values.indexOf(v) != -1;
    },
    size: function() {
        return this.values.length;
    },
    foreach: function(f, c) {
        this.values.forEach(f, c);
    },
    add: function() {
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (!this.contains(arg)) this.values.push(arg);
        }
        return this;
    },
    remove: function() {
        for (var i = 0; i < arguments.length; i++) {
            var p = this.values.indexOf(arguments[i]);
            if (p == -1) continue;
            this.values.splice(p, 1);
        }
        return this;
    }
});


//9-17：定义不可枚举的属性........................................................
// 将代码包装在一个匿名函数中，这样定义的变量就在这个函数作用域内
(function() {
    //定义一个不可枚举的属性objectId，它可以被所有对象继承
    //当读取这个属性时调用getter函数
    //它没有定义setter，因此它是只读的
    //它是不可配置的，因此它是不能删除的
    Object.defineProperty(Object.prototype, "objectId", {
        get: idGetter, // 取值器
        enumerable: false, // 不可枚举的
        configurable: false // 不可删除的
    });

    //当读取objectId的时候直接调用这个getter函数
    function idGetter() { // getter函数返回该id
        if (!(idprop in this)) { // 如果对象中不存在id
            if (!Object.isExtensible(this)) // 并且可以增加属性
                throw Error("Can't define id for nonextensible objects");
            Object.defineProperty(this, idprop, { // 给它一个值
                value: nextid++, // 就是这个值
                writable: false, // 只读的
                enumerable: false, // 不可枚举的
                configurable: false // 不可删除的
            });
        }
        return this[idprop]; // 返回已有的或新的值
    }

    // idGetter()用到了这些变量，这些都属于私有变量
    var idprop = "|**objectId**|"; //假设这个属性没有用到
    var nextid = 1; // 给它设置初始值
}()); // 立即执行这个包装函数

//9-18：创建一个不可变的类，它的属性和方法都是只读的........................................................
// 这个方法可以使用new调用，也可以省略new，它可以用做构造函数也可以用做工厂函数
function Range2(from, to) { // 这些是对from和to只读属性的描述符
    var props = {
        from: {
            value: from,
            enumerable: true,
            writable: false,
            configurable: false
        },
        to: {
            value: to,
            enumerable: true,
            writable: false,
            configurable: false
        }
    };
    if (this instanceof Range2) { // 如果作为构造函数来调用
        Object.defineProperties(this, props);
    } // 定义属性
    else { // 否则，作为工厂方法来调用
        return Object.create(Range2.prototype, // 创建并返回这个新Range对象，
            props);
    } // 属性由props指定
}
// 如果用同样的方法给Range.prototype对象添加属性
// 那么我们需要给这些属性设置它们的特性
// 因为我们无法识别出它们的可枚举性、可写性或可配置性，这些属性特性默认都是false
Object.defineProperties(Range2.prototype, {
    includes: {
        value: function(x) {
            return this.from <= x && x <= this.to;
        }
    },
    foreach: {
        value: function(f) {
            for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
        }
    },
    toString: {
        value: function() {
            return "(" + this.from + "..." + this.to + ")";
        }
    }
});

var rr6 =new Range2(5,10);
var rr7 =new Range(2,6);
rr6.from = 1;
rr7.from = 1;
console.log(rr6); //(5,10)
console.log(rr7); //(1,6)

var rr8 = Range2(1,10);
console.log(rr8);
console.log(rr8 instanceof Range2); //true

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






