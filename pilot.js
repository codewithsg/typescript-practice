const isPositiveOddNumbers = 5;
const isAvailable = true;
const currentWindowState = 'open';
const currentWindowLockState = 'locked';
console.log('here:::', typeof isPositiveOddNumbers === 'number', isAvailable, currentWindowLockState, currentWindowState);
const stringArray = ['hello', 'world'];
const numberArray = [1, 2, 3, -1, 0, 1.23, 90.78];
const backpack /* Here we have defined backpack type as string */ = {
    add: (obj) => console.log(`Adding ${obj}`),
    get: () => 'The backpack contain items'
};
backpack.add('adding');
console.log(backpack.get());
function logPoint(p) {
    console.log(`${p.x}, ${p.y}`);
}
logPoint({ x: 1, y: 2 });
// logPoint({x:'1',y:'2'})
class VirtualPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
const newVpoint = new VirtualPoint(50, 25);
logPoint(newVpoint);
const user = {
    name: 'Ram',
    age: 12
};
console.log('users location', user?.location);
const uppercaseTest = 'HELLO WORLD';
console.log(uppercaseTest.toLocaleLowerCase());
const welcomePeople = (x) => {
    if (Array.isArray(x)) {
        console.log('Hello, ' + x.join(" and ") + x.slice(0, 3));
    }
    else {
        console.log('Welcome lone traveler ' + x + x.slice(0, 3));
    }
};
const people = ['Sandesh', 'Tikaram', 'Vikrant', 'Sagun', 'Binaya'];
welcomePeople(people);
const oneHundred = BigInt(100);
const anotherHundred = 10000n;
console.log('one:::', oneHundred, anotherHundred);
const myObject = {};
const mySymbol = Symbol('description');
myObject[mySymbol] = 'my value';
console.log('symbol::', myObject[mySymbol]);
function printAll(strs) {
    if (typeof strs === "object") {
        for (const s of strs) {
            console.log(s);
        }
    }
    else if (typeof strs === "string") {
        console.log(strs);
    }
    else {
        // do nothing
    }
}
printAll(['hello', 'world']);
