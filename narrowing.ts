function printAll(strs: string | string[] | null) {
  if (typeof strs === "object" && strs) { /* here use of && strs is truthful narrowing*/
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    console.log('No data provided');
  }
}

// printAll(null);
// printAll('Hello');
printAll(['hello', 'world']);

function equalityNarrowing(x: string | number, y: string | boolean) {
  if (x === y) { /* strict equality whereas == is called looser equality */
    console.log(x.toUpperCase());
    console.log(y.toLowerCase());
  } else {
    console.log(x, y);
  }
}

// equalityNarrowing('hello','hello');
// equalityNarrowing(1,false);
equalityNarrowing('hello', 'world');

/* 
  If the data can be null or undefined, we can use looser equality 
  so that we can checkonly once for either null or undefined
  because looser equality checks for both null and undefined
  if only compared with only one
*/
interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  /* Removes both null and undefined from type */
  if (container.value != null) {
    container.value *= factor;
    console.log('container value:', container.value);
  }
}

// multiplyValue({value:undefined},12);
multiplyValue({ value: 2 }, 12);


/* 
  in operator
  Thi operator is used to determine whether object has a property with a name.
*/
type Fish = { swim: () => void };
type Reptile = { crawl: () => void };

function animalMovement(animal: Fish | Reptile) {
  if ("swim" in animal) {
    return animal.swim(); /* Here animal type is fish */
  }

  return animal.crawl(); /* Here animal type is bird */
}


/* 
  instanceOf checks hether or not a value is an 'instance' of another value
*/

function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

logValue(new Date(1683872508607));
logValue('Fri, 12 May 2023 06:21:48 GMT');


/* 
  Type Predicates
*/

interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

type Shape = Square | Rectangle;

function isSquare(shape: Shape): shape is Square { /* here shape is Square is type predicate */
  return shape.kind === 'square';
}

function getArea(shape: Shape): number {
  if (isSquare(shape)) {
    return shape.size ** 2;
  } else {
    return shape.width * shape.height;
  }
}

const square: Square = { kind: 'square', size: 5 };
const rectangle: Rectangle = { kind: 'rectangle', width: 10, height: 5 };

console.log(getArea(square)); 
console.log(getArea(rectangle));


/* Discriminated Unions */
// interface Animal {
//   type: "mammal" | "bird";
//   sound: string;
//   legs?: number;
//   wingspan:number;
// }

interface Mammal  {
  type: "mammal";
  sound: string;
  legs: number;
}

interface Bird  {
  type: "bird";
  sound:string;
  wingspan: number;
}

type Animal  = Mammal | Bird;

function makeSound(animal: Animal) {
  switch (animal.type) {
    case "mammal":
      console.log(`This mammal with ${animal.legs} legs says ${animal.sound}`);
      break;
    case "bird":
      console.log(`This bird with a wingspan of ${animal.wingspan} says ${animal.sound}`);
      break;
    default:
      throw new Error(`Unknown animal: ${JSON.stringify(animal)}`);
  }
}

const dog: Mammal = { type: "mammal", sound: "woof", legs: 4 };
const eagle: Bird = { type: "bird", sound: "screech", wingspan: 2 };


makeSound(dog);
makeSound(eagle);