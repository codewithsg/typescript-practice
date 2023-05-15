class Point {
  x: number;
  y: number;
  set valueX(value){
    this.x = value;
  }
  get valueX(){
    return this.x;
  }
  // constructor(x: number, y: number) {
  //   this.x = x;
  //   this.y = y;
  // }
}

const pt = new Point(/* 2, 3 */);
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
  public name:string;
  protected type: string;
  private age: number;

  constructor(name:string,type:string,age:number){
    this.name = name;
    this.type = type;
    this.age = age;
  }

  /* Public member can be accessed anywhere */
  public sayHello():void {
    console.log(`Hello, my name is ${this.name}`);
  }

  /* protected member are only visible to subclasses of the class they are declared in. */
  protected getType():string{
    return this.type;
  }


  /* can't access even from subclasses */
   private getAge():number {
    return this.age;
  }
}

class Dog extends Animal{
  public breed:string;

  constructor(name:string,age:number,breed:string){
    super(name,'dog',age);
    this.breed = breed;
  }

  public bark():void {
    console.log('Woof! Woof!!')
  }

  public sayHello(): void {
    console.log(`Hello, my name is ${this.name} and I am a ${this.getType()} (${this.breed})`);
  }

  /* this.getAge() cannnot be called because it is private */
  // public getAges():void{
  //   console.log(`I am ${this.getAge()} years old.`)
  // }

}

const myDog = new Dog('Kale',3,'Vote');
myDog.sayHello();
myDog.bark();
/* 
-> but private type can be used by using className['privateMethod']
-> to overcome this problem use # instead of private for hard private
*/
console.log('age:',myDog['getAge']());



/* Generic Classes */
class Box<T>{
  contents:T;
  constructor(value:T){
    this.contents = value;
  }
}

console.log(new Box('Hello!'))

/* Class Expressions */
const someClass= class<T>{
  content:T;
  constructor(value:T){
    this.content = value
  };
};

console.log(new someClass('Hello World!'));

/* Abstract Classes */
abstract class Base {
  abstract getName():string;

  printName(){
    console.log(`Hello ${this.getName()}`)
  }
}

// const b = new Base();
/* We cannot create new instance for base or for abstract classes and members */

class Derived extends Base {
  getName(): string {
    return 'World!'
  }
}

const d = new Derived();
d.printName();

/* If 2 classes are same, they can be used in place of each other because of their identical nature */
class Point1{
  x=0;
  y=0;
}

class Point2{
  x=0;
  y=0;
}

const p:Point1 = new Point2();
console.log('p',p);

/* Similarly, subtype relationships between classes exist even if there's no explicit inheritance */
class Person{
  name:string;
  age:number;
}

class Employee {
  name:string;
  age:number;
  salary:number;
}

const person:Person = new Employee();
console.log('person::',person);

/* Empty Classes have no members. When empty class is written, anything can be used in place of it: */
class Empty{}

function fn(x:Empty){

}
fn(window);
fn({});
fn(fn);