/**
 * a class which includes static methods for checking data types
 *
 * @public
 */
class CustomTypeCheck { 
  // The constructor is Object
  static isObject(val) { 
    return typeof val === 'object' && 
           Object.prototype.toString.call(val).slice(8, -1) === 'Object';
  }
  
  // The constructor is Object
  static isEmptyObject(val) { 
    return typeof val === 'object' && 
           Object.prototype.toString.call(val).slice(8, -1) === 'Object' &&
           Reflect.ownKeys(val).length === 0;
  }
  
  // The constructor is Function
  static isFunction(val) {
    return typeof val === 'function' && 
           Object.prototype.toString.call(val).slice(8, -1) === 'Function' &&
           val.toString().substring(0, 5) !== 'class';
  }
  
  // The constructor is Function
  static isClass(val) {
    return typeof val === 'function' && 
           Object.prototype.toString.call(val).slice(8, -1) === 'Function' && 
           val.toString().substring(0, 5) === 'class';
  }
  
  static isIterableFunction(val) {
    return typeof val === 'function' && 
           Object.prototype.toString.call(val).slice(8, -1) === 'Function' && 
           ( typeof val[Symbol.iterator] === 'function' || 
             typeof val[Symbol.asyncIterator] === 'function'
            );
  }
  
  static isAnonymousFunction(val) {
    return typeof val === 'function' && 
           Object.prototype.toString.call(val).slice(8, -1) === 'Function' && 
           val.toString().substring(0, 5) !== 'class' &&
           val.name === '';
  }

  static isAnonymousClass(val) {
    return typeof val === 'function' && 
           Object.prototype.toString.call(val).slice(8, -1) === 'Function' && 
           val.toString().substring(0, 5) === 'class' &&
           val.name === '';
  }
  
  static isArray(val) {
    return Array.isArray(val)
  }
  
  static isEmptyArray(val) {
    return Array.isArray(val) &&
           val.length === 0;
  }
  
  static isBuffer(val) {
    return Buffer.isBuffer(val);
  }
  
  static isError(val) {
    return val instanceof Error && 
           typeof val.message !== 'undefined';
  }
  
  static isPrimitive (val) {
    return (Object(val) !== val);
  }
  
  // A primitive type, not a Boolean object
  static isBoolean(val) {
    return typeof val === "boolean" && 
           !(val instanceof Boolean);
  }
  
  // A primitive type, not a Number object
  static isNumber(val) {
    return typeof val === "number" && 
           !isNaN(val) && 
           !(val instanceof Number);
  }
  
  // A primitive type
  static isFloat(val) {
    return typeof val === "number" && 
           !isNaN(val) && 
           !(val instanceof Number) &&
           val % 1 !== 0;
  }
  
  // A primitive type
  static isInteger(val) {
    return typeof val === "number" && 
           !isNaN(val) && 
           !(val instanceof Number) &&
           Number.isInteger(val);
  }

  // A primitive type
  static isSafeInteger(val) {
    return typeof val === "number" && 
           !isNaN(val) && 
           !(val instanceof Number) &&
           Number.isSafeInteger(val);
  }
    
  // A primitive type, not a String object
  static isString(val) {
    return typeof val === "string" && 
           !(val instanceof String);
  }
  
  // A primitive type, not a Symbol object
  static isSymbol(val) {
    return typeof val === 'symbol' && 
           !(val instanceof Symbol);
  }
  
  // A primitive type
  static isundefined(val) {
    return val === undefined;
  }
  
  // null is a primitive type
  static isnull(val) {
    return val === null;
  }

  // A primitive type
  static isBigInt(val) {
    return typeof val === 'bigint';
  }
  
  static hasPrototype(val) {
    return !!val.prototype;
  }
}

/**
 * Module exports
 * @public
 */
module.exports = CustomTypeCheck;
