/* TypeScript provides several utility types to facilitate common type transformations. These utilities are available globally. */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function updateTodo(todo, fieldsToUpdate) {
    return __assign(__assign({}, todo), fieldsToUpdate);
}
var todo1 = {
    title: 'organize desk',
    description: 'Clear clutter'
};
var todo2 = updateTodo(todo1, {
    description: 'throw out trash'
});
console.log(todo1, todo2);
var obj = { a: 5 };
/* const obj2:Required<IProps> = {a:5}; */
// Property 'b' is missing in type '{ a: number; }' but required in type 'Required<IProps>'.ts(2741)
var obj3 = { a: 5, b: 'Hello World!' };
/* Readonly<Type> */
/* Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned. */
var todo3 = {
    title: 'Reapir Cycle',
    description: 'Repair Brake, Chain Spocket, Rear Wheel Bearing'
};
var cats = {
    miffy: { age: 10, breed: 'Persian' },
    boris: { age: 5, breed: 'Maine Coon' },
    mordred: { age: 7, breed: 'British Shorthair' },
    // kale:{age:7,breed:'British Shorthair'}  
    // Type '{ miffy: { age: number; breed: string; }; boris: { age: number; breed: string; }; mordred: { age: number; breed: string; }; kale: { age: number; breed: string; }; }' is not assignable to type 'Record<TCatName, ICatInfo>'.
    // Object literal may only specify known properties, and 'kale' does not exist in type 'Record<TCatName, ICatInfo>'.ts(2322)
};
console.log(cats.boris);
console.log(cats.mordred);
var todo4 = {
    title: 'Clean room',
    completed: false
};
var todo5 = {
    title: 'Clean Room',
    completed: false,
    createdAt: 1234567890
};
var todoInfo2 = {
    title: 'Pick up kids',
    description: 'Kindergarten closes at 3pm'
};
console.log(todoInfo2);
/* type TR5 = {
  a: number;
  b: string;
} */
/* InstanceType<Type> */
/* Constructs a type consisting of the instance type of a constructor function in Type. */
var C1 = /** @class */ (function () {
    function C1() {
        this.x = 0;
        this.y = 0;
    }
    return C1;
}());
// type TI2 = never
/* ThisParameterType<Type> */
/* Extracts the type of the this parameter for a function type, or unknown if the function type has no this parameter. */
function toHex() {
    return this.toString(16);
}
function numberToString(n) {
    return toHex.apply(n);
}
/* OmitThisParameter<Type> */
/* Removes the this parameter from Type. If Type has no explicitly declared this parameter, the result is simple Type. Otherwise, a new function type with no this parameter is created from Type. Generics are erased and only the last overload signature is propagated into the new function type. */
var fiveToHex = toHex.bind(5);
function makeObject(desc) {
    var data = desc.data || {};
    var methods = desc.methods || {};
    return __assign(__assign({}, data), methods);
}
var obj1 = makeObject({
    data: { x: 0, y: 0 },
    methods: {
        moveBy: function (dx, dy) {
            this.x += dx;
            this.y += dy;
        }
    }
});
obj1.x = 10;
obj1.y = 20;
obj1.moveBy(5, 5);
console.log(obj1);
