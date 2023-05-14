
/* Union Types */
type TIsBool = true | false;
type TWindowStates = "open" | "closed" | "minimized";
type TLockStates = "locked" | "unlocked";
type TPositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

const isPositiveOddNumbers: TPositiveOddNumbersUnderTen = 5;
const isAvailable: TIsBool = true;
const currentWindowState: TWindowStates = 'open';
const currentWindowLockState: TLockStates = 'locked';

console.log('here:::', typeof isPositiveOddNumbers === 'number', isAvailable, currentWindowLockState, currentWindowState);

/* Generic Types */
type TStringArray = Array<string>;
type TNumberArray = Array<number>;

const stringArray: TStringArray = ['hello', 'world'];
const numberArray: TNumberArray = [1, 2, 3, -1, 0, 1.23, 90.78];

interface IBackpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

const backpack: IBackpack<string>/* Here we have defined backpack type as string */ = {
  add: (obj: string) => console.log(`Adding ${obj}`),
  get: () => 'The backpack contain items'
};

backpack.add('adding');

console.log(backpack.get());


/* Structural Type System */
interface IPoint {
  x: number;
  y: number;
}

function logPoint(p: IPoint) {
  console.log(`${p.x}, ${p.y}`);
}

logPoint({ x: 1, y: 2 })
// logPoint({x:'1',y:'2'})

class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVpoint = new VirtualPoint(50, 25);
logPoint(newVpoint);

interface IUser {
  name: string;
  age: number;
  location?: string;
}

const user: IUser = {
  name: 'Ram',
  age: 12
}

console.log('users location', user?.location)

const uppercaseTest = 'HELLO WORLD';
console.log(uppercaseTest.toLocaleLowerCase());

const welcomePeople = (x: string[] | string) => {
  if (Array.isArray(x)) {
    console.log('Hello, ' + x.join(" and ") + x.slice(0, 3));
  } else {
    console.log('Welcome lone traveler ' + x + x.slice(0, 3));
  }
}

const people = ['Sandesh', 'Tikaram', 'Vikrant', 'Sagun', 'Binaya'];

welcomePeople(people);

const oneHundred: bigint = BigInt(100);
const anotherHundred: bigint = 10000n;

console.log('one:::', oneHundred, anotherHundred);

const myObject = {};
const mySymbol = Symbol('description');

myObject[mySymbol] = 'my value';

console.log('symbol::', myObject[mySymbol]);



