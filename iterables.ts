/* Iterables */
/* An object is deemed iterable if it has an implementaion for the Symbol.iterator property. */
/* Some built-in types like Array, Map, Set, String, Int32Array, etc. have their Symbol.iterator property already implemented. */
/* Symbol.iterator function on an object is respoinsible for returning the list of values to iterate on. */

/* Iterable interface */
/* Iterable is a type we can use if we want to take in types listed above which are iterable. */
// function toArray<X>(xs:Iterable<X>):X[]{
//   return [...xs]
// }

/* for...of statements */
/* for...of loops over an iterable object, invoking the Symbol.iterator property on the object. */
let array1 = [1,'string',false];

for(let entry of array1){
  console.log(entry)
}

/* for ... in statements */
/* Both for..of and for..in statements iterate over list: the values iterated on are different though, for...in returns a list of keys on the object being iterated, whereas for...of returns a list of values of the numeric properties of the object being iterated. */

let list = [1,2,3,4,5];
for(let i in list){
  console.log(i);
}

for(let i of list){
  console.log(i);
}