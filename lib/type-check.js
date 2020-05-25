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

  // polyfill
  static isBooleanObject(val) {
        return val instanceof Boolean && 
               Object.prototype.toString.call(val).slice(8, -1) === 'Boolean';
  }
  static isNumberObject(val) {
    return val instanceof Number &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Number';
  }
  static isStringObject(val) {
    return val instanceof String &&
           Object.prototype.toString.call(val).slice(8, -1) === 'String';
  }
  static isSymbolObject(val) {
    return val instanceof Symbol &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Symbol';
  }
  static isBoxedPrimitive(val) {
    return CustomTypeCheck.isBooleanObject(val) ||
           CustomTypeCheck.isNumberObject(val) ||
           CustomTypeCheck.isStringObject(val) ||
           CustomTypeCheck.isSymbolObject(val);
  }
  static isGeneratorObject(val) {
    return Object.prototype.toString.call(val).slice(8, -1) === 'Generator';
  }
  static isArgumentsObject(val) {
    return Object.prototype.toString.call(val).slice(8, -1) === 'Arguments';
  }
  static isDate(val) {
    return val instanceof Date &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Date';
  }
  static isRegExp(val) {
    return val instanceof RegExp &&
           Object.prototype.toString.call(val).slice(8, -1) === 'RegExp';
  }
  static isMap(val) {
    return val instanceof Map &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Map';
  }
  static isMapIterator(val) {
    return Object.prototype.toString.call(val).slice(8, -1) === 'Map Iterator';
  }
  static isWeakMap(val) {
    return Object.prototype.toString.call(val).slice(8, -1) === 'WeakMap';
  }
  static isSet(val) {
    return val instanceof Set &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Set';
  }
  static isSetIterator(val) {
    return Object.prototype.toString.call(val).slice(8, -1) === 'Set Iterator';
  }
  static isWeakSet(val) {
    return Object.prototype.toString.call(val).slice(8, -1) === 'WeakSet';
  }
  static isPromise(val) {
    return Object.prototype.toString.call(val).slice(8, -1) === 'Promise';
  }
  static isInt8Array(val) {
    return val instanceof Int8Array &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Int8Array';
  }
  static isInt16Array(val) {
    return val instanceof Int16Array &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Int16Array';
  }
  static isInt32Array(val) {
    return val instanceof Int32Array &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Int32Array';
  }
  static isFloat32Array(val) {
    return val instanceof Float32Array &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Float32Array';
  }
  static isFloat64Array(val) {
    return val instanceof Float64Array &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Float64Array';
  }
  static isUint8Array(val) {
    return val instanceof Uint8Array &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Uint8Array';
  }
  static isUint8ClampedArray(val) {
    return val instanceof Uint8ClampedArray &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Uint8ClampedArray';
  }
  static isUint16Array(val) {
    return val instanceof Uint16Array &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Uint16Array';
  }
  static isUint32Array(val) {
    return val instanceof Uint32Array &&
           Object.prototype.toString.call(val).slice(8, -1) === 'Uint32Array';
  }
  static isDataView(val) {
    return val instanceof DataView &&
           Object.prototype.toString.call(val).slice(8, -1) === 'DataView';
  }
  static isAsyncFunction(val) {
    return Object.prototype.toString.call(val).slice(8, -1) === 'AsyncFunction';
  }
  static isGeneratorFunction(val) {
    return Object.prototype.toString.call(val).slice(8, -1) === 'GeneratorFunction';
  }  
}

/**
 * Module exports
 * @public
 */
module.exports = CustomTypeCheck;
