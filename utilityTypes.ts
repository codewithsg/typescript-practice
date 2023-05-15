/* TypeScript provides several utility types to facilitate common type transformations. These utilities are available globally. */

/* Awaited<Type> */
/* This type is meant to model operations like await in async functions, or the .then() method on Promises specifically, the wat that ther recursivelt unwrap Promises. */
/* Example */
type A = Awaited<Promise<string>>;
// type A = string

type B = Awaited<Promise<Promise<number>>>;
// type B = number

type C = Awaited<boolean | Promise<number>>;
// type C = number | boolean




/* Partial<Type> */
/* Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type. */
/* Example */
interface ITodo {
  title: string;
  description: string;
}

function updateTodo(todo: ITodo, fieldsToUpdate: Partial<ITodo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: 'organize desk',
  description: 'Clear clutter'
};

const todo2 = updateTodo(todo1, {
  description: 'throw out trash'
})

console.log(todo1, todo2);




/* Required<Type> */
/* Even if types properties are optional after use of Required<Type> properies change their behaviour from optional to required */
interface IProps {
  a?: number;
  b?: string;
}

const obj: IProps = { a: 5 };

/* const obj2:Required<IProps> = {a:5}; */
// Property 'b' is missing in type '{ a: number; }' but required in type 'Required<IProps>'.ts(2741)

const obj3: Required<IProps> = { a: 5, b: 'Hello World!' }




/* Readonly<Type> */
/* Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned. */

const todo3: Readonly<ITodo> = {
  title: 'Reapir Cycle',
  description: 'Repair Brake, Chain Spocket, Rear Wheel Bearing'
};

/* todo3.description = 'repair handle'; */
// Cannot assign to 'description' because it is a read-only property.ts(2540)

/* This utility is useful for representing assignment expressions that will fail at runtime (i.e. when attempting to reassign properties of a frozen object) */
// function freeze<T>(obj:T):Readonly<T>;



/* Record<Keys, Type> */
/* Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type. */
interface ICatInfo{
  age:number;
  breed:string;
}

type TCatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<TCatName, ICatInfo> = {
  miffy:{age:10,breed:'Persian'},
  boris: {age:5,breed:'Maine Coon'},
  mordred: {age:7,breed:'British Shorthair'},
  // kale:{age:7,breed:'British Shorthair'}  
  // Type '{ miffy: { age: number; breed: string; }; boris: { age: number; breed: string; }; mordred: { age: number; breed: string; }; kale: { age: number; breed: string; }; }' is not assignable to type 'Record<TCatName, ICatInfo>'.
  // Object literal may only specify known properties, and 'kale' does not exist in type 'Record<TCatName, ICatInfo>'.ts(2322)
}

console.log(cats.boris);
console.log(cats.mordred);



/* Pick<Type, Keys> */
/* Constructs a type by picking the set of properties Keys(string literal or union of string literals) from Type */
interface ITodoComplete {
  title:string;
  description:string;
  completed:boolean;
}

type TTodoPreview = Pick<ITodoComplete, 'title' | 'completed'>;

const todo4:TTodoPreview = {
  title:'Clean room',
  completed:false
}



/* Omit<Type, Keys> */
/* Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals) */
interface ITodo2{
  title:string;
  description:string;
  completed:boolean;
  createdAt:number;
}

type TTodoPreview2 = Omit<ITodo2,'description'>;
const todo5:TTodoPreview2 = {
  title:'Clean Room',
  completed:false,
  createdAt:1234567890
}

type TTodoInfo2 = Omit<ITodo2,'createdAt'|'completed'>;
const todoInfo2:TTodoInfo2 = {
  title:'Pick up kids',
  description:'Kindergarten closes at 3pm'
}

console.log(todoInfo2);