/* In JavaScript, the fundamental way that we group and pass around data is through objects. We can name them using interface or Type */
/* we can use ? for optional property temporaryAddress?:string */
/* We can use readonly role:sting for read only properties */
function draw(circle) {
    console.log(circle.color, circle.radius);
}
draw({ color: 'blue', radius: 30 });
var x = {
    contents: 'hello world'
};
/* We could check 'x,contents */
if (typeof x.contents === 'string') {
    console.log(x.contents.toUpperCase());
}
/* Or we can use a type assertion */
console.log(x.contents.toUpperCase());
var box = {
    contents: 'hello world'
};
/* We can use generic function for generic type */
function setContents(box, newContents) {
    box.contents = newContents;
}
/* Array Type */
function doSomething(value) {
    console.log(value);
}
var myArray = ["hello", "world!"];
doSomething(myArray);
doSomething(new Array("hello", "world"));
/* We can also use ReadOnlyArray instead of Array, if we want our array to be ReasOnly  */
var x1 = ['hello'];
var y1 = ['world', 'hello'];
x1 = y1;
console.log(x1); /* Here because of string in ReadOnlyArray string is mutable */
function momoReady(data) {
    console.log("Hello ".concat(data[0], ", your momo is ready for home delivery. And your price is ").concat(data[1]));
}
momoReady(['Ram', 155]);
