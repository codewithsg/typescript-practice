/* Declaration Merging */

/* Introduction */
/* Some of the unique concepts in TypeScript describe the shape of JavaScript object at the type level. */
/* One Example that is especially unique to TypeScript is the concept of 'declaration merging'. */
/* Understanding this concept will give us an advantage when working with existing JavaScript. It also opens the door to more advanced abstraction concepts. */
/* For the purpose of this article, 'declaration merging' means that the compiler merges two seperate declarations declared with the same name into a single definition. */
/* This merged definition has the deatures of both of the original declarations. */
/* Any number of declarations can be merged: its not limited to just two declaratios. */


/* Merging Interfaces */
/* The simplest and perhaps most common, type of declaration merging is interface merging.*/
/* At most basic level, the merge mechanically joins the members of both declarations into a single interface with the same name. */

interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

let box: Box = { height: 7, width: 3, scale: 5 };

/* Non-function members of the interfaces should be unique. */
/* If they are not unique, they must be of the same type. */
/* The compiler will issue an error if the interfaces both declare a non-functionmember of the same name, but of different types. */
/* For function members, each function member of the same name is treated as describing an overload of the same function. */
/* Of note, too, is that in the case of interface A merging with later interface A, the second interface will have a higher precedence than the first. */

// interface Cloner{
//   clone(animal:Animal):Animal;
// }

// interface Cloner {
//   clone(animal:sheep):ShadowRootEventMap;
// }

// interface Cloner {
//   clone (animal:Dog) : Dog;
//   clone (animal:Cat) : Cat;
// }

/* The three interfaces will merge to create a single declaration as so: */
// interface Cloner {
//   clone(animal:Dog):Dog;
//   clone(animal:Cat):Cat;
//   clone(animal:Sheep):Sheep;
//   clone(animal:Animal):Animal;
// }




/* Merging Namespaces */
/* Similar to interfaces, namespaces of the same name will also merge their members. */
/* Since namespaces create both a namespace and a value, we need to understand how both merge. */
/* To merge the namespaces, type definitions from exported interfaces declared in each namespace are themselves merged, forming a single namespace with merged interface definitions inside. */
/* To merge the namespace value, at each declaration site, if a namespace already exists with the given name, it is further extended by taking the existing namespace and adding the exported members of the second namespace to the first. */
/* The declaration merge of Animals */

namespace Animals {
  export class Zebra { }
}

namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Dog { }
}
/* is equivalent to: */
// console.log(Animals);
// namespace Animals {
//   export interface Legged {
//     numberOfLegs: number;
//   }
//   export class Zebra { }
//   export class Dog { }
// }

/* This model of namespace merging is a helpful starting place, but we also need to understand what happens with on-exported members.*/
/* Non-exported members are only visible in the original (un-merged) namespace. */
/* This means that after merging, merged members that came from other declarations cannot see non-exported members. */



/* Merging Namespaces with Classes, Functions, and Enums */
/* Namespaces are flexible enough to also merge with other type of declarations. */
/* To do so, the namespace declaration must follow the declaration it will merge with. */
/* The resulting declaration has properties of both declaration types. */
/* TypeScript uses this capability to model some of the patterns in JavaScript as well as other programming languages. */

/* Merging Namespaces with  Classes */
/* This gives the user a way of describing inner classes */

class Album {
  label: Album.AlbumLabel;
}
namespace Album {
  export class AlbumLabel { }
}

/* The visibility rules for merged members s the same as describes in the Merging Namespaces section, so we must export the AlbumLabel class for the merged class to see it. */
/* The end result is a class managed inside of another class. */
/* We can also use namespaces to add more statuc members to an existing class. */
/* In addition to the pattern of our inner classes, we may also be familiar with the JavaScript practice of creating a function and then extending the funtion further by adding properties onto the function. */
/* TypeScript uses declaration merging to build up definitions like this in a type-safe way. */

function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel {
  export let suffix = '';
  export let prefix = 'Hello, ';
}
console.log(buildLabel('Sam Smith'));

/* Similarly, namespaces can be used to extend enums with statis members: */
enum Color {
  red = 1,
  green = 2,
  blue = 4
}

namespace Color {
  export function mixColor(colorName: string) {
    if (colorName == 'yellow') {
      return Color.red + Color.green;
    } else if (colorName == 'white') {
      return Color.red + Color.green + Color.blue;
    } else if (colorName == 'magneta') {
      return Color.red + Color.blue;
    } else if (colorName == 'cyan') {
      return Color.green + Color.blue;
    }
  }
}



/* Disallowed Merges */
/* Not all merges are allowed in TypeScript, classes can not merge with other classes or with variables. */


/* Module Augmentation */
/* Although JavaScript modules do not support merging, we can patch existing objects by importing and then updating them. */
/* Let's look at a toy Observable example: */

// observable.ts
/* export class Observable<T>{
  // do something
}

// map.ts
import {Observable} from './observable';
Observable.prototypr.map = function (f){
  // do something
} */


/* Global augmentation */
/* We can add declarations to the global scope from inside a module: */
// observable.ts
/* 
  export class Observable<T>{
    // do something
  }

  declare global {
    interface Array<T>{ 
      toObservable(): Observable<T>;
    }
  }

  Array.prototype.toObservable = function(){
    
  }
*/