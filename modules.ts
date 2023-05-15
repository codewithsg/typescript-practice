/* Modules */
/* In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module. */
/* Conversely, a file without any top level import or export declarations is treated as a script whose contents are available in the global scope(and therefore to modules as well) */
/* Modules are ececuted within their own scope, not in global sope. */
/* Variables,functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. */
/* To consume a variable function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms. */



/* Non-modules */
/* JavaScript specification declares that any JavaScript files without an export or top-level await should be considered a script and not a module. */
/* Inside a script file variables and types are declared to be in the shared global scope, and it's assumed that we will either use the outFile compiler option to join multiple files into one output file, or use multiple <script> tags in our HTML to load these files (in the correct order!). */
/* If we have a file that does not currently have anu imports or exports but we want to treat it as a module, then we have to add the line: */
/* export {} */
/* this will change the file to be module exporting nothing. This syntax works regardless of our module target. */



/* Modules in TypeScript */
/* There are three main things to consider when writing module-based code in TypeScript */
/* Sytax: What syntax do I want to use to import and export things? */
/* Module Resolution: What is the relationship between module name and files on disk? */
/* Moudle Output Target: What should my emitted JavaScript module look like? */



/* ES Module Syntax */
/* A file can declare a ain export via export default */
// @filename: hello.ts
/* 
  export default function helloWorld(){
    console.log('Hello World');
  }
*/

/* Then helloWorld() is imported via:*/
/* 
  import helloWorld from './hello.ts';
  helloWorld()
*/

/* In addition to the default export, we can have more than one export of variables and functions via the export by omitting default: */
/* 
  // @filename:maths.ts
  export var pi = 3.14;
  export let squareTwo = 1.41;
  export const phi = 1.61;

  export class RandomNumberGenerator {}

  export function absolute(num:number){
    if(num<0) return num * -1;
    return num;
  }
*/

/* These can be used in another file via import syntax like:*/
/* 
  import {pi , phi, absolute} from './math.ts';

  console.log(pi);
  const absPhi = absolute(phi);
*/




/* Additional Import Syntax */
/* An import can be renamed using a format like import {old as new} */
/* 
  import {pi,phi,absolute as calculateAbsolute} from './math.ts';
*/

/* We can take all the exported objects and put them into a single namespace using * as name: */
/* 
// filename:app.ts
import * as math from './math.ts';

console.log(math.pi);
const positivePhi = math.absolute(math.phi);
*/

/* We can import a file and not include any variables into your current module via import './file' */
/* 
// @filename: app.ts
import './math.ts';
console.log('3.14');
*/
/* In this case, the import does nothing. However, all of the code in maths.ts was evaliated, which could trigger side-effects which affect other objects. */





/* TypeScript Specifies ES Module Syntax */
/* Types can be exported and imported using the same syntax as JavaScript values: */
/* 
// @filename: animal.ts
export type TCat = {
  breed:string;
  yearOfBirth:number
};

export interface IDog{
  breeds:string[];
  yearOfBirth:number;
};

// @filename: app.ts
import {TCat,IDog} from './animal.ts'
type TAnimals = TCat | IDog;
*/

/* Typescript has extended the import syntax with two concepts for declaring an import of a type: `import type`,  which is an import statement that only import types:*/
/* 
// @filename: animal.ts
export type TCat = {
  breed:string;
  yearOfBirth:number;
};

export type TDog = {
  breeds:string[];
  yearOfBirth:number;
};

export const createCatName = ()=> 'fluffy';

// @filename:valid.ts
import type {TCat, TDog} from './animal.ts';
export type TAnimals = TCat | TDog

// @filename: app.ts
import type {createCatName} from './animal.ts'
const name = createCatName();
// Here createCatName cannot be used as a value because it was imported using 'import type'

*/

/* Typescript 4.5 also allows for individual imports to be prefixed with type to indicate that the imported reference is a type: */
/* 
// filename:app.ts
import {createCatName, type TCat, type TDog} from './animal.ts';
export type Tanimals = Cat | Dog;
const name = createCatName();
*/
/* Together these allow a non-TypeScript transpiler like Babel, sec or esbuild to know what imports can be safelt removed. */





/* ES Module Syntax with CommonJS Behaviour */
/* TypeScript has ES Module syntax which directly correlates to a CommonJS and AMD require. Imports using ES Moudle are for most cases the same as the require from those environments, but this syntax ensures we have a 1 to 1 match in our typescript file with CommonJS output: */
/* 
  import fs = require('fs');
  const code = fs.readFileSync('hello.ts','utf8');
*/



/* CommonJS Syntax */
/* CommonJS is the format which most modules o npm are delivered in.Even if we are writing using the ES Modules syntax above, having a brief understanding of how CommonJS syntax works will help us debug easier. */
/* Exporting */
/* Identifiers are exported via settings the exports property on a global called module. */

/* 
function absolute(num:number){
  if(num < 0) return num * -1;
  return num;
}

module.exports = {
  pi:3.14,
  squareTwo:1.41,
  phi:1.61,
  absolute
}

// then these files can be imported via a require statement::
const maths = require('maths');
math.pi;

// or we can simplify a bit using the destructuring feature in JavaScript:
const {squareTwo} = require('maths');
squareTwo;
*/

/* There is a mis-match in features between CommonJS and ES Moudles regarding the distinction between a defaulr import and a module namespace object import. Typescript has a compiler flag to reduce the friction between the two different sets of constraints with esModuleInterop. */





/* TypeScript's Module Resolution Options */
/* Module resolution is the process of taking a string from the import or require statement, and determining what file that string refers to.*/
/* TypeScript includes two resolution stratefies: Classic and Node.*/
/* Classic, the default when the compiler option module is not commonjs, is included for backward compatibility. */
/* The Node stratefy replicates how Node.js works in CommonJS mode, with additional checks for .ts and .d.ts */
/* There are many TSConfig flags which influence the module strategy within TypeScript: moduleResolution, baseUrl, paths, rootDirs. */
/* For the full details on how these strategies work, we can consult the Module Resolution. */




/* TypeScript's Module Output Options */
/* There are two options which affect the emitted JavaScript output: target and module */
/* Target which determines which JS features are downleveled (converted to run in older JavaScript runtimes) and which are left intact */
/* module which determines what code is used for modules to interact with each other */
/* Which target we use is determined by the features available in the JavaScript runtime we expect to run the TypeScript code in. That could be: the oldest web browser we support, the lowest version of Node.js we expect to run on or could come from unique constraints from our runtime - like Electron for example. */
/* All communication between modules happens via a module loader, the compiler option module determines which one is used. At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it. */
/* For example, here is a TypeScript file using ES Modules syntax, showcasing a few different options for module: */
/* 
  import {valueOfPi} from './constants.ts';
  export const twoPi = valueOfPi *2;

  // ES2020
  import {valueOfPi} from './constants.ts';
  export const twoPi = valueOfPi *2;

  // CommonJS
  'use strict';
  Object.deineProperty(exports,'__esModule',{value:true});
  exports.twoPi = void 0;
  const constants_js_1 = require('./constants.js');
  exports.twoPi = constants_js_1.valueOfPi * 2;


  // UMD
  (function (factory){
    if(typeof module === 'object' && typeof module.exports === 'object'){
      var v = factory(require,exports);
      if(v !== undefined) module.exports = v;
    }
    elseif(typeof define === 'function' && define.amd){
      define(['require','exports','./constants.js'], factory);
    }
  })(function (require,exports){
    'use strict';
    Object.defineProperty(exports, '__esmodule',{value: true});
    exports.twoPi = void 0;
    const constants_js_1 = require('./constants.js');
    exports.twoPi = constants_js_1.valueOfPi * 2;
  });
  */




/* TypeScript namespaces */
/* TypeScript has its own module format called namespaces which pre-dates the ES Modules standard. This syntax has a lot of useful features for creating complex definition files, and still sees active use in DefinitelyTypes. While not deprecated, the majority of the features in namespaces exist in ES Modules and we recommend you use that to align with JavaScript's direction. */