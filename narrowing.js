function printAll(strs) {
    if (typeof strs === "object" && strs) { /* here use of && strs is truthful narrowing*/
        for (var _i = 0, strs_1 = strs; _i < strs_1.length; _i++) {
            var s = strs_1[_i];
            console.log(s);
        }
    }
    else if (typeof strs === "string") {
        console.log(strs);
    }
    else {
        console.log('No data provided');
    }
}
// printAll(null);
// printAll('Hello');
printAll(['hello', 'world']);
function equalityNarrowing(x, y) {
    if (x === y) { /* strict equality whereas == is called looser equality */
        console.log(x.toUpperCase());
        console.log(y.toLowerCase());
    }
    else {
        console.log(x, y);
    }
}
// equalityNarrowing('hello','hello');
// equalityNarrowing(1,false);
equalityNarrowing('hello', 'world');
function multiplyValue(container, factor) {
    /* Removes both null and undefined from type */
    if (container.value != null) {
        container.value *= factor;
        console.log('container value:', container.value);
    }
}
// multiplyValue({value:undefined},12);
multiplyValue({ value: 2 }, 12);
function animalMovement(animal) {
    if ("swim" in animal) {
        return animal.swim(); /* Here animal type is fish */
    }
    return animal.crawl(); /* Here animal type is bird */
}
/*
  instanceOf checks hether or not a value is an 'instance' of another value
*/
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}
logValue(new Date(1683872508607));
logValue('Fri, 12 May 2023 06:21:48 GMT');
function isSquare(shape) {
    return shape.kind === 'square';
}
function getArea(shape) {
    if (isSquare(shape)) {
        return Math.pow(shape.size, 2);
    }
    else {
        return shape.width * shape.height;
    }
}
var square = { kind: 'square', size: 5 };
var rectangle = { kind: 'rectangle', width: 10, height: 5 };
console.log(getArea(square));
console.log(getArea(rectangle));
function makeSound(animal) {
    switch (animal.type) {
        case "mammal":
            console.log("This mammal with ".concat(animal.legs, " legs says ").concat(animal.sound));
            break;
        case "bird":
            console.log("This bird with a wingspan of ".concat(animal.wingspan, " says ").concat(animal.sound));
            break;
        default:
            throw new Error("Unknown animal: ".concat(JSON.stringify(animal)));
    }
}
var dog = { type: "mammal", sound: "woof", legs: 4 };
var eagle = { type: "bird", sound: "screech", wingspan: 2 };
makeSound(dog);
makeSound(eagle);
