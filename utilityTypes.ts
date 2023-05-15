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




/* Exclude<UnionType, ExcludeMembers> */
/* Constructs a type by execluding from UnionType all union members that are assignable to ExcludeMembers */

type T0 = Exclude<'a' | 'b' | 'c' ,'a'>
// type T0 = "b" | "c"

type T1 = Exclude<'a'|'b'|'c','a'|'c'>;
// type T1 = "b"




/* Extract<Type, Union> */
/* Constructs a type by extracting from Type all union members that are assignable to Union. */
type T2 = Extract<'a'|'b','a'|'c'>;
// type T2 = "a"

type T3 = Extract<string | number , boolean | number>;
// type T3 = number

type T4 = Extract<String | number | (()=>void),Function>
// type T4 = () => void






/* NonNullable<Type> */
/* Constructs a type by excluding null and undefined from Type */
type T5 = NonNullable<string | number | null>
// type T5 = string | number

type T6 = NonNullable<string[] | null | undefined>
// type T6 = string[]




/* Parameters<Type> */
/* Constructs a tuple type from the types used in the parameters of a function Type. */
declare function f1(arg:{a:number,b:string});

type TP0 = Parameters<()=>string>;
// type TP0 = []

type TP1 = Parameters<(s:string)=>void>;
// type TP1 = [s: string]

type TP2 = Parameters<<T>(arg:T)=>void>
// type TP2 = [arg: unknown]

type TP3 = Parameters<typeof f1>;
/* type TP3 = [arg: {
  a: number;
  b: string;
}] */

type TP4 = Parameters<any>;
// type TP4 = unknown[]

type TP5 = Parameters<never>;
// type TP5 = never

// type TP6 = Parameters<unknown>
// type string, number, ... does not satisfy the constraint '(...args:any)=>any'
// type TP6 = never




/* ConstructorParameters<Type> */
/* Constructs a tuple or array type from the types of a constructor function type. It produces a tuple type with all the parameter types (or the type never if Type is not a function). */
type TC0 = ConstructorParameters<ErrorConstructor>;
// type TC0 = [message?: string | undefined]

type TC1 = ConstructorParameters<FunctionConstructor>;
// type TC1 = string[]

type TC2 = ConstructorParameters<RegExpConstructor>;
// type TC2 = [pattern: string | RegExp, flags?: string | undefined]

type TC3 = ConstructorParameters<any>;
// type TC3 = unknown[]

type TC4 = ConstructorParameters<DateConstructor>;
// type TC4 = [value: string | number | Date]

type TC5 = ConstructorParameters<ArrayConstructor>;
// type TC5 = unknown[]

// type TC6 = ConstructorParameters<PromiseConstructor>;
// type TC6 = [executor: (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void]




/* ReturnType<Type> */
/* Constructs a type consisting of the return type of function Type */
type TR0 = ReturnType<()=>string>;
// type TR0 = string

type TR1 = ReturnType<(s:string)=>void>;
// type TR1 = void

type TR3 = ReturnType<<T>()=>T>;
// type TR3 = unknown

type TR4 = ReturnType<<T extends U, U extends number[]>()=>T>;
// type TR4 = number[]

type TR2 = ReturnType<typeof f1>;
// type TR2 = any

declare function f2():{a:number,b:string};
type TR5 = ReturnType<typeof f2>;
/* type TR5 = {
  a: number;
  b: string;
} */




/* InstanceType<Type> */
/* Constructs a type consisting of the instance type of a constructor function in Type. */
class C1{
  x=0;
  y=0;
}

type TI0 = InstanceType<typeof C1>;
// type TI0 = C1

type TI1 = InstanceType<any>;
// type TI1 = any

type TI2 = InstanceType<never>;
// type TI2 = never




/* ThisParameterType<Type> */
/* Extracts the type of the this parameter for a function type, or unknown if the function type has no this parameter. */
function toHex(this:Number){
  return this.toString(16);
}

function numberToString(n:ThisParameterType<typeof toHex>){
  return toHex.apply(n);
}



/* OmitThisParameter<Type> */
/* Removes the this parameter from Type. If Type has no explicitly declared this parameter, the result is simple Type. Otherwise, a new function type with no this parameter is created from Type. Generics are erased and only the last overload signature is propagated into the new function type. */
const fiveToHex:OmitThisParameter<typeof toHex> = toHex.bind(5);



/* ThisType<Type> */
/* This utility does not return a transformed type. Instead, it serves as a marker for a contextual this type. Note that the noImplicitThis flag must be enabled to use this utility. */
type ObjectDescriptor<D,M> = {
  data?:D;
  methods?:M & ThisType<D & M>;
}

function makeObject<D,M>(desc:ObjectDescriptor<D,M>):D & M{
  let data:Object = desc.data || {};
  let methods:object = desc.methods || {};
  return {...data,...methods} as D & M;
}

let obj1 = makeObject({
  data:{x:0,y:0},
  methods:{
    moveBy(dx:number,dy:number){
      this.x += dx;
      this.y += dy;
    }
  }
})

obj1.x = 10;
obj1.y = 20;
obj1.moveBy(5,5);
console.log(obj1);
/* In the example above, the methods object in the argument to makeObject has a contextual type that includes ThisType<D & M> and therefore the type of this in methids within the methods object is {x:number, y:number} & {moveBy(dx:number,dy:number):void}. Notice how the type of the methods property simultaneously is an inference target and a source for the this type in methods. */
/* The ThisType<T>  marker interface is simply an empty interface declared in lib.d.ts. Beyond being recognized in the contextual type of an object literal, the interface acts like any empty interface.*/




/* Intrinsic String Manipulation Types */
/* Uppercase<StringType> */
/* Lowercase<StringType> */
/* Capitalize<StringType> */
/* Uncapitalize<StringType> */
/* To help with string manipulation around template string literals, TypeScript includes a set of types which can be used in string manipulation within the type system. */