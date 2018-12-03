/*var o = {
    x: 1,
    y: 2
};
console.log(o.x);
delete o.x;
console.log(o.x);
console.log(typeof o.x);
console.log(typeof(delete o.x));
var a = [1, 2, 3];
delete a[2];
console.log(a);

var geval = eval;
var x = "global",
    y = "global";

function f() {
    var x = "global";
    eval("x += 'changed'");
    return x;
}

function g() {
    var y = "local";
    geval("y+= 'changed'");
    return y;
}
console.log(f(), x);
console.log(g(), y);*/


//-----
var matrix = [0, null, 2, 3]; //随机数组
console.log(matrix);
var sum = 0,
    success = false;

compute_sum: if (matrix) { //判断数组是否为真
    for (var x = 0; x < matrix.length; x++) { //遍历
        var row = matrix[x]; //获取每个数组元素
        if (typeof(row) == "string" || isNaN(row) || row != null) {
            console.log('数组含非数字元素');
            break compute_sum;
        } //元素如果是非数字则终止compute_sum标签语句
        sum += row;
    }
    console.log(success = true);
    console.log(sum);
}
//-------

/*function fv(x) {
    var chen = 0,
        shucu = '';
    for (var i = 0; i < x; i++) {
        chen = x * (x - i);
        shucu += chen.toString() + '+';
        console.log(x+'*'+(x-i)+'='+chen);
    }
    shucu = shucu.substring(0,shucu.length-1);
    return shucu;
}
try {
    var n = Number(window.prompt("请输入一个数字"));
    console.log(fv(n));
} catch (ex) {
    console.log(ex);
}*/

console.log("-----------------存取器属性---------------------");
var p = { //x和y是普通的可读写的数据属性
    x: 1.0,
    y: 1.0,
    // r是可读写的存取器属性，它有getter和setter.
    // 函数体结束后不要忘记带上逗号
    get r() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    set r(newvalue) {
        var oldvalue = Math.sqrt(this.x * this.x + this.y * this.y);
        var ratio = newvalue / oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    }, //theta是只读存取器属性，它只有getter方法
    get theta() {
        return Math.atan2(this.y, this.x);
    }
};
p.r = 10;
console.log(p.x,p.r);
console.log(p.theta);


console.log("--------------------------------------");
var random = {
    get octet() {
        return Math.floor(Math.random() * 256);
    },
    get uint16() {
        return Math.floor(Math.random() * 65536);
    },
    get int16() {
        return Math.floor(Math.random() * 65536) - 32768;
    }
};

console.log(random.octet);
var desc1 =Object.getOwnPropertyDescriptor(random,"octet");
console.log(desc1);



var desc = Object.getOwnPropertyDescriptor({}, "toString");
console.log(desc);

//-------
console.log("--------------------------------------");
var o1 = {};
Object.defineProperty(o1, "x", {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
});
console.log(o1);
console.log(Object.keys(o1));
var p1 = Object.defineProperty(o1, "x", {
    get: function() {
        return 0;
    }
});
console.log(Object.getOwnPropertyDescriptor(p1, "x"));
console.log(Object.keys(p1));

console.log("--------------------------------------");
var p2 = Object.defineProperties(o1, {
    x: {
        value: 2,
        writable: true,
        enumerable: true,
        configurable: true
    },
    y: {
        value: 2,
        writable: true,
        enumerable: true,
        configurable: true
    },
    r: {
        get: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        enumerable: true,
        configurable: true
    }
});
console.log(p2.r);
console.log(Object.keys(p2));
console.log(p2.r);

console.log("------------------属性复制--------------------");


var p3 = Object.defineProperty(p2, "extend", // 定义 Object.prototype.extend  p3不能继承p2的属性
    {
        writable: true,
        enumerable: false, // 将其定义为不可枚举的
        configurable: true,
        value: function(o) { // 值就是这个函数
            // 得到所有的自有属性，包括不可枚举属性
            var names = Object.getOwnPropertyNames(o); // 遍历它们
            for (var i = 0; i < names.length; i++) { // 如果属性已经存在，则跳过
                if (names[i] in this) continue; // 获得o中的属性的描述符
                var desc1 = Object.getOwnPropertyDescriptor(o, names[i]); // 用它给this创建一个属性
                Object.defineProperty(this, names[i], desc1);
            }
        }
    });
console.log(p3.r);
console.log(Object.keys(p3));

var pandun= p2.isPrototypeOf(p3);
var pandun1= Object.prototype.isPrototypeOf(p3);
console.log(pandun,pandun1);

console.log("---------------对象类属性：查询tostring方法--------------------");

function classof(o) {
    //if(o === null) return "null";
    //if(o=== undefined) return "undefined";
    return Object.prototype.toString.call(o).slice(8, -1); //调用回调函数call
}
console.log(classof(p3));
console.log(classof(null));

console.log("---------------可扩展性：对象类封闭--------------------");
var o3 = Object.seal(Object.create(Object.freeze({ //seal函数不能给这个对象添加新属性，而且它已有的属性也不能删除或配置，不过它已有的可写属性依然可以设置。
    x: 1
    /*freeze除了将对象设置为不可扩展的和将其属性设置为不可配置的之外，还可以将它自有的所有数据属性设置为只读
           （如果对象的存取器属性具有setter方法，存取器属性将不受影响，仍可以通过给属性赋值调用它们)*/
}), {
    y: {
        value: 2,
        writable: true
    }
}));
o3.y = 5;
console.log(o3.y);

console.log("---------------序列化对象--------------------");
var o4 = {
    x: 1,
    y: {
        z: [false, null, ""]
    }
};
var s3 = JSON.stringify(o4);
var p4 = JSON.parse(s3);
console.log(s3);
console.log(p4);

var serialnum = {
    $n: 0,
    get next() {
        return this.$n++;
    },
    set next(n) {
        if (n >= this.$n) this.$n = n;
        else throw "序列号的之不能比当前的值小";
    }
};
serialnum.next = 10;
console.log(serialnum.next);