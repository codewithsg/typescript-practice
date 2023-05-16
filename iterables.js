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
var array1 = [1, 'string', false];
for (var _i = 0, array1_1 = array1; _i < array1_1.length; _i++) {
    var entry = array1_1[_i];
    console.log(entry);
}
/* for ... in statements */
/* Both for..of and for..in statements iterate over list: the values iterated on are different though, for...in returns a list of keys on the object being iterated, whereas for...of returns a list of values of the numeric properties of the object being iterated. */
var list = [1, 2, 3, 4, 5];
for (var i in list) {
    console.log(i);
}
for (var _a = 0, list_1 = list; _a < list_1.length; _a++) {
    var i = list_1[_a];
    console.log(i);
}
