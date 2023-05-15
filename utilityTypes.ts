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
interface ITodo{
  title:string;
  description:string;
}

function updateTodo(todo:ITodo,fieldsToUpdate: Partial<ITodo>){
  return {...todo, ...fieldsToUpdate};
}

const todo1 = {
  title:'organize desk',
  description:'Clear clutter'
};

const todo2 = updateTodo(todo1, {
  description:'throw out trash'
})

console.log(todo1,todo2);