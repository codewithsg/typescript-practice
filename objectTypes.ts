/* In JavaScript, the fundamental way that we group and pass around data is through objects. We can name them using interface or Type */
/* we can use ? for optional property temporaryAddress?:string */
/* We can use readonly role:sting for read only properties */



/* We can extends types of an object and we can extend as much as we like by using extends BasicAddress,AddressWithUnit*/
interface IBasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface IAddressWithUnit extends IBasicAddress {
  unit: string;
}

/* Intersection types */
/* Intersection type id defined using the & operator */
interface IColorful {
  color: string;
}

interface ICircle {
  radius: number;
}

type ColorfulCircle = IColorful & ICircle;

function draw(circle: ColorfulCircle) {
  console.log(circle.color, circle.radius);
}

draw({ color: 'blue', radius: 30 });


/* Generic Object Types */
interface IBox {
  contents: unknown;
}

let x: IBox = {
  contents: 'hello world'
}

/* We could check 'x,contents */
if (typeof x.contents === 'string') {
  console.log(x.contents.toUpperCase());
}

/* Or we can use a type assertion */
console.log((x.contents as string).toUpperCase());

interface IBox1<T> {
  contents: T
}

let box: IBox1<string> = {
  contents: 'hello world'
}

/* We can use generic function for generic type */
function setContents<T>(box: IBox1<T>, newContents: T) {
  box.contents = newContents;
}

/* We can also use generic type on type alias*/
type OrNull<T> = T | null;
type OneOrMany<T> = T | T[];
type OneOrManyOrNull<T> = OrNull<OneOrMany<T>>;

/* Array Type */
function doSomething(value: Array<string>) {
  console.log(value)
}

let myArray: string[] = ["hello", "world!"];

doSomething(myArray);
doSomething(new Array("hello", "world"));

/* We can also use ReadOnlyArray instead of Array, if we want our array to be ReasOnly  */
let x1: ReadonlyArray<string> = ['hello'];
let y1: string[] = ['world', 'hello'];

x1 = y1;
console.log(x1); /* Here because of string in ReadOnlyArray string is mutable */
// y1 = x1;

/* Tuple Types */
/* Tuple type is another sort of array type that knows exactly how many elements it contains, and exactle which types it contains at specific positions */
type TStringNumberPair = [string, number];
function momoReady(data: TStringNumberPair){
  console.log(`Hello ${data[0]}, your momo is ready for home delivery. And your price is ${data[1]}`)
}

momoReady(['Ram',155]) // Here we cannot send third arguments, cause it can only accept 2

/* We can also destructure tuples like: const [name,price] = data*/

