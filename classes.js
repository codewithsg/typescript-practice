class Point {
    set valueX(value) {
        this.x = value;
    }
    get valueX() {
        return this.x;
    }
}
const pt = new Point( /* 2, 3 */);
// pt.x = 2;
// pt.y = 3;
console.log(pt);
class Coordinate extends Point {
    constructor() {
        super();
        /* Super is used to access x and y from Point class */
    }
}
class Animal {
    constructor(name, type, age) {
        this.name = name;
        this.type = type;
        this.age = age;
    }
    /* Public member can be accessed anywhere */
    sayHello() {
        console.log(`Hello, my name is ${this.name}`);
    }
    /* protected member are only visible to subclasses of the class they are declared in. */
    getType() {
        return this.type;
    }
    /* can't access even from subclasses */
    getAge() {
        return this.age;
    }
}
class Dog extends Animal {
    constructor(name, age, breed) {
        super(name, 'dog', age);
        this.breed = breed;
    }
    bark() {
        console.log('Woof! Woof!!');
    }
    sayHello() {
        console.log(`Hello, my name is ${this.name} and I am a ${this.getType()} (${this.breed})`);
    }
}
const myDog = new Dog('Kale', 3, 'Vote');
myDog.sayHello();
myDog.bark();
/*
-> but private type can be used by using className['privateMethod']
-> to overcome this problem use # instead of private for hard private
*/
console.log('age:', myDog['getAge']());
/* Generic Classes */
class Box {
    constructor(value) {
        this.contents = value;
    }
}
console.log(new Box('Hello!'));
/* Class Expressions */
const someClass = class {
    constructor(value) {
        this.content = value;
    }
    ;
};
console.log(new someClass('Hello World!'));
/* Abstract Classes */
class Base {
    printName() {
        console.log(`Hello ${this.getName()}`);
    }
}
// const b = new Base();
/* We cannot create new instance for base or for abstract classes and members */
class Derived extends Base {
    getName() {
        return 'World!';
    }
}
const d = new Derived();
d.printName();
/* If 2 classes are same, they can be used in place of each other because of their identical nature */
class Point1 {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
class Point2 {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
const p = new Point2();
console.log('p', p);
/* Similarly, subtype relationships between classes exist even if there's no explicit inheritance */
class Person {
}
class Employee {
}
const person = new Employee();
console.log('person::', person);
