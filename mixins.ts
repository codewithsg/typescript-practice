/* Mixins */
/* Along with traditional OO hierarchies, another popular way of building up classes from reusable components is to build them by combining simpler partial classes. */
/* We may be similar with the idea of mixins or traits for languages like Scala, and the oattern has aksi reached some popularity in the JS community. */


/* How does a mixin work? */
/* The pattern relies on using generics with class inheritance to extend a base class. */
/* TypeScript's best mixin support is done via the class expression pattern */

/* class Sprite {
  name = "";
  x = 0;
  y = 0;

  constructor(name: string) {
    this.name = name;
  }
} */
/* Thenwe need a type and a factory function which returns a class expression extending the base class. */
// to get started, we need a type which we'll use to extend other classes from .
// the main responsibility is to declare that the type being passed in is a class.
// type Constructor = new (...args: any[]) => {};

// This mixin adds a scale property, with getters and setters for changing it with an encapsulated private property

/* function Scale<TBase extends Constructor>(Base: TBase) {
  return class Scaling extends Base {
    // mixins may not declare private/protected properties
    // however we can use ES2020 private fields
    _scale = 1;

    setScale(scale: number) {
      this._scale = scale;
    }

    get scale(): number {
      return this._scale;
    }
  }
}
 */
/* Now with all these set up, we can create a class which represents the base class with mixins applied: */
// Compose a new class from Sprite class, with the Mixin Scale applier:
/* const EightBitSprite = Scale(Sprite);
const flappySprite = new EightBitSprite('Bird');
flappySprite.setScale(0.8);
console.log(flappySprite.scale); */



/* Constrained Mixins */
/* Above, the mixin's have no underlying knowledge of the class which can make it hard to create the design we want. */
/* To model this, we modify the original constructor type to accept a generic argument. */
// type GConstructor<T = {}> = new (...args: []) => T;

/* This allows for creating classes which only work with constrained base classes: */
/* type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>;
type Spritable = GConstructor<Sprite>;
type Loggable = GConstructor<{ print: () => void }>;
 */
/* Now, we can create mixins which only work when we have a particular base to build on: */
/* function Jumpable<TBase extends Positionable>(Base:TBase){
  return class Jumpable extends Base {
    jump(){
      // This mixin will only work if it is passed a base class which has setPos defined because of the Positionable constraint.
      this.setPos(10,20);
    }
  }
} */


/* Alternative Pattern */
// Each mixin is a traditional ES class
class Jumpable {
  jump() { }
}

class Duckable {
  duck() { }
}

// Including the base
class Sprite {
  x = 0;
  y = 0;
}

// Then we create an interface which merges the expected mixins with the same name as our base
interface Sprite extends Jumpable, Duckable { }
// Apply the mixins into the base class via the JS at runtime
applyMixins(Sprite, [Jumpable, Duckable]);

let player = new Sprite();
player.jump();
console.log(player.x, player.y);

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
      )
    })
  })
}

/* Constraints */
/* The mixin pattern is supported natively inside the TypeScript compiler by code flow analysis. */
/* There are a few cases where we can hit the edges of the native support. */
/* Decorators and Mixins */
/* We cannot use decoratoes to provide mixins via code flow analysis: */
const Pausable = (target:typeof Player)=>{
  return class Pausable extends target{
    shouldFreeze = false;
  }
}

@Pausable
class Player{
  x=0;
  y=0;
}
// The player class does not have the decorator's type merged:
const playerOne = new Player();
// playerOne.shouldFreeze;
// Property 'shouldFreeze' does not exist on type 'Player'.
type FreezablePlayer = Player & {shouldFreeze:boolean};
const playerTwo = (new Player() as unknown) as FreezablePlayer;
playerTwo.shouldFreeze;

/* Static Property Mixins */
/* More of a gotcha than a constraint */
/* The class expression pattern creates sigletons, so they can not be mapped at type system to support different variable types. */
/* We can work around this by using functions to return our classes which differ based on a generic: */

function base<T>(){
  class Base{
    static prop:T;
  }
  return Base;
}

function derived<T>(){
  class Derived extends base<T>(){
    static anotherProp:T;
  }
  return Derived;
}

class Spec extends derived<string>(){}

Spec.prop;
Spec.anotherProp;