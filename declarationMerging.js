/* Declaration Merging */
var box = { height: 7, width: 3, scale: 5 };
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
var Animals;
(function (Animals) {
    var Zebra = /** @class */ (function () {
        function Zebra() {
        }
        return Zebra;
    }());
    Animals.Zebra = Zebra;
})(Animals || (Animals = {}));
(function (Animals) {
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        return Dog;
    }());
    Animals.Dog = Dog;
})(Animals || (Animals = {}));
/* is equivalent to: */
console.log(Animals);
// namespace Animals {
//   export interface Legged {
//     numberOfLegs: number;
//   }
//   export class Zebra { }
//   export class Dog { }
// }
