/* Mixins */
/* Along with traditional OO hierarchies, another popular way of building up classes from reusable components is to build them by combining simpler partial classes. */
/* We may be similar with the idea of mixins or traits for languages like Scala, and the oattern has aksi reached some popularity in the JS community. */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var Jumpable = /** @class */ (function () {
    function Jumpable() {
    }
    Jumpable.prototype.jump = function () { };
    return Jumpable;
}());
var Duckable = /** @class */ (function () {
    function Duckable() {
    }
    Duckable.prototype.duck = function () { };
    return Duckable;
}());
// Including the base
var Sprite = /** @class */ (function () {
    function Sprite() {
        this.x = 0;
        this.y = 0;
    }
    return Sprite;
}());
// Apply the mixins into the base class via the JS at runtime
applyMixins(Sprite, [Jumpable, Duckable]);
var player = new Sprite();
player.jump();
console.log(player.x, player.y);
function applyMixins(derivedCtor, constructors) {
    constructors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
        });
    });
}
/* Constraints */
/* The mixin pattern is supported natively inside the TypeScript compiler by code flow analysis. */
/* There are a few cases where we can hit the edges of the native support. */
/* Decorators and Mixins */
/* We cannot use decoratoes to provide mixins via code flow analysis: */
var Pausable = function (target) {
    return /** @class */ (function (_super) {
        __extends(Pausable, _super);
        function Pausable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shouldFreeze = false;
            return _this;
        }
        return Pausable;
    }(target));
};
var Player = /** @class */ (function () {
    function Player() {
        this.x = 0;
        this.y = 0;
    }
    Player = __decorate([
        Pausable
    ], Player);
    return Player;
}());
// The player class does not have the decorator's type merged:
var playerOne = new Player();
var playerTwo = new Player();
playerTwo.shouldFreeze;
/* Static Property Mixins */
/* More of a gotcha than a constraint */
/* The class expression pattern creates sigletons, so they can not be mapped at type system to support different variable types. */
/* We can work around this by using functions to return our classes which differ based on a generic: */
function base() {
    var Base = /** @class */ (function () {
        function Base() {
        }
        return Base;
    }());
    return Base;
}
function derived() {
    var Derived = /** @class */ (function (_super) {
        __extends(Derived, _super);
        function Derived() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Derived;
    }(base()));
    return Derived;
}
var Spec = /** @class */ (function (_super) {
    __extends(Spec, _super);
    function Spec() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Spec;
}(derived()));
Spec.prop;
Spec.anotherProp;
