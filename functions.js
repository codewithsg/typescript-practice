/* Function types expression */
function greeter(fn) {
    fn('Hello World');
}
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);
function doSomething(fn) {
    console.log(fn.description + " returned " + fn(6));
}
function myFunc(someArg) {
    return someArg > 3;
}
myFunc.description = "do something function just";
doSomething(myFunc);
/* Generic Function */
function firstElement(arr) {
    return arr[0];
}
var strType = firstElement(['a', 'b', 'c']);
var numType = firstElement([1, 2, 3]);
var undType = firstElement([]);
console.log('generic:::', strType, numType, undType);
/* Inference */
function map(array, func) {
    return array.map(func);
}
console.log(map(['1', '2', '3'], function (n) { return parseInt(n); }));
/* Constraints */
/* In this function length is constraints */
function longest(a, b) {
    if (a.length >= b.length) {
        return a;
    }
    else {
        return b;
    }
}
console.log(longest([3, 7, 37, 73], [1, 2, 3]));
console.log(longest('Sandesh', 'Tikaram'));
// console.log(longest(10,20))
/* Specifying type arguments */
function combine(array1, array2) {
    return array1.concat(array2);
}
console.log(combine([1, 2, 3], [4, 5, 6]));
console.log(combine(['Sandesh'], ['Tikaram']));
/* Guidelines for writing good generic functions */
/* Good */
function firstElement1(arr) {
    return arr[0];
}
/* Bad */
function firstElement2(arr) {
    return arr[0];
}
// good
console.log(firstElement1([1, 2, 3]));
// bad
console.log(firstElement2([1, 2, 3]));
/* Use fewer type parameters */
/* Good */
function filter1(arr, func) {
    return arr.filter(func);
}
/* Bad */
function filter2(arr, func) {
    return arr.filter(func);
}
console.log(filter1([3, 4, 5, 6], function (arg) { return arg % 2 === 0; }));
console.log(filter2([7, 8, 9, 10], function (arg) { return arg % 2 === 0; }));
/* Good */
function greet(s) {
    console.log('Hello ', s);
}
/* Bad */
function greet1(s) {
    console.log('Hello ', s);
}
greet('World');
greet1('World');
/* Optional Parameters  use ?*/
function eatMomo(isMoney, plate) {
    if (isMoney) {
        console.log('Hello, I will have ' + plate + ' plate of momo please');
    }
    else {
        console.log('I will try when I have money, bye bye momo.');
    }
}
eatMomo(true, 2);
eatMomo(false);
function makeDate(mOrTimestamp, d, y) {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}
var d1 = makeDate(1234567890);
var d2 = makeDate(5, 1, 5);
console.log(d1 + '  ,,,, ' + d2);
// const d3 = makeDate(1, 3);
/* never */
/* The never type represents values which are never absorved. In a return type, this means that the function throws an exception or terminates execution of the program.*/
function fail(msg) {
    throw new Error(msg);
}
/* Spread Operator */
/* Rest Parameters */
function multiply(m) {
    var n = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        n[_i - 1] = arguments[_i];
    }
    return n.map(function (x) { return m * x; });
}
console.log(multiply(7, 1, 2, 3, 4, 5));
/* Rest Arguments */
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
arr1.push.apply(arr1, arr2);
console.log(arr1);
/* Parameter Destructuring */
function sum(_a) {
    var a = _a.a, b = _a.b, c = _a.c;
    console.log(a + b + c);
}
sum({ a: 10, b: 20, c: 30 });
