/* Function types expression */
function greeter(fn: (a: string) => void) {
  fn('Hello World');
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

/* Call Signatures */
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething1(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "do something function just";
doSomething1(myFunc);

/* Generic Function */
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const strType = firstElement(['a', 'b', 'c']);
const numType = firstElement([1, 2, 3]);
const undType = firstElement([]);

console.log('generic:::', strType, numType, undType)

/* Inference */

function map<M, N>(array: M[], func: (arg: M) => N): N[] {
  return array.map(func);
}

console.log(map(['1', '2', '3'], (n) => parseInt(n)));

/* Constraints */
/* In this function length is constraints */
function longest<T extends { length: number }>(a: T, b: T) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

console.log(longest([3, 7, 37, 73], [1, 2, 3]));
console.log(longest('Sandesh', 'Tikaram'));
// console.log(longest(10,20))

/* Specifying type arguments */
function combine<T>(array1: T[], array2: T[]): T[] {
  return array1.concat(array2);
}

console.log(combine([1, 2, 3], [4, 5, 6]));
console.log(combine(['Sandesh'], ['Tikaram']));

/* Guidelines for writing good generic functions */
/* Good */
function firstElement1<T>(arr: T[]) {
  return arr[0];
}

/* Bad */
function firstElement2<T extends any[]>(arr: T) {
  return arr[0];
}

// good
console.log(firstElement1([1, 2, 3]));
// bad
console.log(firstElement2([1, 2, 3]));


/* Use fewer type parameters */
/* Good */
function filter1<T>(arr: T[], func: (arg: T) => boolean): T[] {
  return arr.filter(func);
}

/* Bad */
function filter2<T, Func extends (arg: T) => boolean>(arr: T[], func: Func): T[] {
  return arr.filter(func);
}

console.log(filter1([3, 4, 5, 6], (arg) => arg % 2 === 0));
console.log(filter2([7, 8, 9, 10], (arg) => arg % 2 === 0));


/* Good */
function greet(s: string) {
  console.log('Hello ', s);
}

/* Bad */
function greet1<T extends string>(s: T) {
  console.log('Hello ', s);
}

greet('World');
greet1('World');

/* Optional Parameters  use ?*/
function eatMomo(isMoney: Boolean, plate?: number) {
  if (isMoney) {
    console.log('Hello, I will have ' + plate + ' plate of momo please');
  } else {
    console.log('I will try when I have money, bye bye momo.')
  }
}

eatMomo(true, 2);
eatMomo(false);

/* Function Overloads */
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(1234567890);
const d2 = makeDate(5, 1, 5);
console.log(d1 + '  ,,,, ' + d2);
// const d3 = makeDate(1, 3);

/* never */
/* The never type represents values which are never absorved. In a return type, this means that the function throws an exception or terminates execution of the program.*/

function fail(msg: string): never {
  throw new Error(msg);
}

/* Spread Operator */
/* Rest Parameters */
function multiply(m: number, ...n: number[]) {
  return n.map((x) => m * x);
}

console.log(multiply(7,1,2,3,4,5));

/* Rest Arguments */
const arr1 = [1,2,3];
const arr2 = [4,5,6];
arr1.push(...arr2);
console.log(arr1);


/* Parameter Destructuring */
function sum({a,b,c}){
  console.log(a+b+c);
}

sum({a:10,b:20,c:30});