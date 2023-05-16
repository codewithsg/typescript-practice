/* With introduction of Classes in TypeScript and ES6, there now exist certain scenarios that require additional features to support annoting or modifying classes and class members. */
/* Decorators  provide a way to add both annotations and a meta-programming syntax for class declarations and members. Decoratoes are a stage 2 proposal for JavaScript and are available as an experimental feature of TypeScript*/
/* to enable experimental support for decorators, we must enable the experimentalDecorators compiler option either on the command line or in our tsconfig.json */
/* Command Line */
/* tsc --target ES5 --experimentalDecorators */
/* tsConfig.json */
/* {
  "compilerOptions" : {
    "target" : "ES5",
      "experimentalDecorators" : true
  }
} */

/* Decorators */
/* A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. */
/* Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration. */
/* For example, given the decoratoe @sealed we might write the sealed function as follows: */
/* 
  function sealed(targer){
    // do somethign with 'target' ...
  }
*/



/* Decorator Factories */
/* If we want to customize how a decorator is applied to a declarations, we write a decorator factory. */
/* A Decorator Factory is simply a function that returns the expression that will be called by the decoratoe at runtime. */
/* We can write a decorator factory in the following fashion: */
/* 
  function color(value:string){
    // this is the decoratoe factory, it sets up
    // the returned decorator function
    return  function(target){
      // this is the decorator
      // do something with 'target' and 'value' ...
    }
  }
*/



/* Decorator Composition */
/* Multiple decorators can be applied to a declaration, for example on a single line: */
/* @f @g x */
/* On multiple lines: */
/* 
  @f
  @g
  x
*/
/* When multiple decorators apply to a single declaration, their evaluation is similar to function composition in mathematics. */
/* In this model, when composing funtions f and g, the resulting composite (f O g)(x) is equivalent to f(g(x)). */
/* As such, the following steps are performed when evaluating multiple decorators on a single declaration in TypeScript: */
/* 
  1. The expressions for each decorator are evaluated from top-to-bottm.
  2. The results are then called as functions from bottom-to-top.
*/
/* If we were to use decorator factories, we can observe this evaluation order with the following example: */

function first() {
  console.log('first(): factory evaluated');
  return function (target: any, propertyKey: any) {
    console.log('first(): called', target);
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (target: any, propertyKey: any) {
    console.log('second(): called', propertyKey);
  }
}

class ExampleClass {
  @first()
  @second()
  method() { }
}




/* Decorator Evaluation */
/* There is a well defined order to how decorators applied to various declarations inside of call are applied: */
/* 
  1. Parameter Decorators, followed by Method, Accessor or Property Decorators are applied for each instance member.
  2. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for the constructor.
  3. Parameter Decorators are applied for the constructor.
  4. Class Decorators are applied for the class.
*/



/* Class Decorators */
/* A Class Decorator is declared just before a class declaration. */
/* The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition. */
/* A class decorator cannot be used in a declaration file, or in any ambient context (such as on a declare class). */
/* The expression for the class decorator will be called as a function at runtime, with the constructor of the decorated class as its only argument. */
/* If the class decorator returns a calue, it will replace the class declaration with the provided constructor function. */
/* NOTE::: Should we choose to return a new constructor function, we must take care to maintain the original prototype. The logic that applies decorators at runtime will not do this for us. */
/* The following is an example of class decorator @sealed appplied to a BugReport class: */
// @sealed
// class BugReport{
//   type = 'report';
//   title:string;
//   constructor(t:string){
//     this.title = t
//   }
// }

// /* We can define the @sealed decorator using the following function declaration: */
// function sealed(constructor:Function){
//   Object.seal(constructor);
//   Object.seal(constructor.prototype);
// }
/* When @sealed is executed, it will seal both the constructor and its prototype, and will therefore prevent any further functionality from being added to or removed from this class during runtime by accessing BugReport.prototype or by defining properties on BugReport itself (note that ES2015 classes are really just syntactic sugar to prototype-based constructor functions). This decoratoe does not prevent classes from sub-classing BugReport. */
/* Next we have an example of how to override the constructor to set new defaults. */
/* function reportableClassDecorator<T extends {new(...args:any[]):{}}>(constructor:T){
  return class extends constructor{
    reportingUrl = 'www.google.com';
  };
}

@reportableClassDecorator
class BugReport{
  type = 'report';
  title:string;

  constructor(t:string){
    this.title = t;
  }
}

const bug = new BugReport('Needs dark mode');
console.log(bug.title);
console.log(bug.type); */

// Note that the decorator does not change the TypeScript type ans so the new property 'reportingUrl is not known to the type system'
// bug.reportingUrl;
// Property 'reportingUrl' does not exist on type 'BugReport'.ts(2339)




/* Method Decorators */
/* A Method Decoratoe is declared just before a method declaration. */
/* The decoratoe is applied to the Property Descriptor for the method, and can be used to ovserve,modify, or replace a method definition. */
/* A method decoratoe cannot be used in a declaration, on an overload, or in any other ambient context (such as in a declare class). */
/* The expression for the method decorator c=will be called as a function at runtime, with the following three arguments: */
/* 
  1. Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
  2. The name of the member.
  3. The Property Descriptor for the member.
*/
/* NOTE::: The Property Descriptor will be undefined of our script target is less than ES5. */
/* If the method is an example of a method decorator (@enumerable) applied to a method on the Freeter class: */

/* class Greeter{
  greeting:string;
  constructor(message:string){
    this.greeting = message;
  }

  @enumerable(false)
  greet(){
    return 'Hello, '+ this.greeting;
  }
}

function enumerable(value:boolean){
  return function (target:any, propertyKey:string, descriptor:PropertyDescriptor){
    descriptor.enumerable = value;
  };
} */
/* The @enumerable(false) decoratoe here is a decorator factory. */
/* When the @enumerable(false) decorator is called, it modifie the enumerable property of the property descriptor. */




/* Accessor Decorators */
/* An Accessor Decorator is declared just before an accessor declaration. */
/* The accessor decorator is applied to the Property Descriptor for the accessor and can be used to observe, modify, or replace an accessor's definitions. */
/* An accessor decoratoes cannot be used in a declaration file, or in any other ambient context(such as in a declare class). */
/* NOTE::: TypeScript disallows decorating both the get and set accessor for a single member. Instead, all decoratoes for the member must be applied to the first accessor specified in document order. This is because decorators apply to a Property Descriptor, which combines both the get and set accessor, not each declaration seperately. */

/* The expression for the accessor decorator will be called as a function at runtime, with the following three arguments: */
/* 
  1. Either the constructor function of the class for a static member, or the prototype of the class fir an instance member.
  2. The name of the member.
  3. The Property Descriptor for the member.
*/
/* NOTE::: The Properry Descriptor will be undefined if our script target is less than ES5. */

/* If the accessor decorator returns a  value, it will be used as the Property Descriptor for the member.*/
/* NOTE::: The return value is ignored if our script is less than ES5. */
/* Following is the example of an accessor decorator (@configurable) applied to a member of the Point class: */

/* class Point {
  private xCoordinate: number;
  private yCoordinate: number;
  constructor(x: number, y: number) {
    this.xCoordinate = x;
    this.yCoordinate = y;
  }
  @configurable(false)
  get x(){
    return this.xCoordinate;
  }

  @configurable(false)
  get y(){
    return this.yCoordinate;
  }
}

function configurable(value:boolean){
  return function(target:any,propertyKey:string,descriptor:PropertyDescriptor){
    descriptor.configurable = value;
  }
} */




/* Property Decorators */
/* A Property Decoratoe is declared just beofre a property declaration. */
/* A property decorator cannot be used in a declaration file, or in any other ambient context (such as in a declare class). */
/* The expression for the property decorator will be called as a function at runtime, with the following two arguments: */
/* 
  1. Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
  2. The name of the member.
*/
/*
  NOTE:::
  A Property Descriptor is not provided as an argument ti a propert decoratoe due to how property decoratoes are initialized in TypeScript.
  This is because there is currently no mechanism to describe an instance property when defining members of a prototype, and no way to observe or modify the initializer for a property.
  The return value is ignored too. As suchh, a property decorator can only be used to observe that a property of a specific name has been declared for a class.
*/
/* We can use this information to record metadata about the property, as in the following example: */
// class Greeter {
//   @FormData('Hello, %s')
//   greeting: string;

//   constructor(message:string){
//     this.greeting = message;
//   }

//   greet(){
//     let formatString = getFormat(this, 'greetings');
//     return formatString.replace('%s',this.greeting);
//   }
// }

/* We can define the @format decrator and getFormat functions using the following function declarations: */
/* To use reflect-metadata we need to import library using npm i */
// import  'reflect-metadata';

// const formatMetadataKey = Symbol('format');

// function format(formatString:string){
//   return Reflect.metadata(formatMetadataKey,formatString);
// }

// function getFormat(target:any, propertyKey:string){
//   return Reflect.getMetaData(formatMetadataKey,target,propertyKey);
// }

/* The @format('Hello, %s') decorator here is a decorator factory. */
/* When @format('Hello, %s') is called, it adds a metadata entry for the property using the Reflect.metadata function from the reflect-metadata library */
/* When getFormat is called, it reads the metadata value for the format. */



/* Parameter Decorators */
/* A Parameter Decorator is declared just before a parameter declaration. */
/* The parameter decorator is applied to the function for a class constructor or method declaration. */
/* A parameter decorator cannot be used in a declaration file, an overload, or in any other ambient context (such as in a declare class). */
/* The expression for the parameter decorator will be called as a function at runtime, with the following three arguments: */
/* 
  1. Either the constructor function of the class for a static member, or the prototype of the class or an instance member.
  2. The name of the member.
  3. The ordinal index of the parameter is the functions's parameter list.
*/
/* NOTE::: A parameter can only be used to observe that a parameter has been declared on a method. */
/* The return value of the parameter decorator is ignored. */
/* The following example of a parameter decorator(@required) applied to parameter of a member of the BugReport class: */

// class BugReport {
//   type = 'report';
//   title:string;

//   constructor(t:string){
//     this.title = t;
//   }

//   @Validate
//   print(@required verbose:boolean){
//     if(verbose){
//       return `type: ${this.type}\ntitle:${this.title}`;
//     }else{
//       return this.title;
//     }
//   }
// }

// install reflect-metadata
// import 'reflect-metadata';
// const requiredMetadataKey = Symbol('required');

// function required(target:Object, propertyKey:string | symbol, parameterIndex:number){
//   let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey,target,propertyKey) || [];
//   existingRequiredParameters.push(parameterIndex);
//   Reflect.defineMetadata(requiredMetadataKey,existingRequiredParameters, target, propertyKey);
// }

// function validate(target:any, propertyName:string, descriptor:TypedPropertyDescriptor<Function>){
//   let method = descriptor.value!;

//   descriptor.value = function(){
//     let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target,propertyName);
//     if(requiredParameters){
//       for (let parameterIndex of requiredParameters){
//         if(parameterIndex >= arguments.length || arguments[parameterIndex] === undefined){
//           throw new Error('Missing required arguments.');
//         }
//       }
//     }
//     return method.apply(this,arguments);
//   }
// }

/* The @required decorator adds a metadata entry that marks the parameter as required. */
/* The @validate decorator then wraps the existing greet method in a function that validates the arguments before invoking the original method. */




/* Metadata */
/* Some examples use the reflect-metadata library which adds a polyfill for an experimental metadata API. */
/* This library is not yet part of the ECMAScript (JavaScript) standard. However, one decorators are officially adopted as part of the ECMAScript standard these extensions will be proposed for adoption. */
/* We can install this library via npm using: */
/* npm i reflect-metadata --save */

/* TypeScript includes experimental support for emitting certain types of metadata for declarations that have decorators. */
/* To enable this experimental support, we must set the emitDecoratorMetadata compiler option either on the command line or in our tsconfig.json: */
/* Command Line: */
/* tsc --target ES5 --experimentalDecorators --emitDecoratorMetadata */

/* tsconfig.json */
/* 
  {
    "compilerOptions": {
      "target": "ES5",
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true
    }
  }
*/

/* When enables, as long as the reflect-metadata library has been imported, additional design-time type information will be exposed at runtime. */

// import 'reflect-metadata';

// class Point{
//   constructor(public x:number,public y:number){}
// }

// class Line{
//   private _start:Point;
//   private _end:Point;

//   @validate
//   @Reflect.metadata('design:type',Point)
//   set start(value:Point){
//     this._start = value;
//   }

//   get start(){
//     return this._start;
//   }

//   @validate
//   @Reflect.metadata('design:type',Point)
//   set end(value:Point){
//     this._end = value;
//   }
  
//   get end(){
//     return this._end;
//   }
// }

// function validate<T>(target:any, propertyKey:string,descriptor:TypedPropertyDescriptor<T>){
//   let set = descriptor.set!;

//   descriptor.set = function(value:T){
//     let type = Reflect.getMetadata('design:type',target,propertyKey);

//     if(!(value instanceof type)){
//       throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
//     }

//     set.call(this,value);
//   };
// }

// const line = new Line()
// line.start = new Point(0,0)
