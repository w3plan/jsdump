const util = require('util');
const typeCheck = require("./type-check");

/**
 * An array of the functions that check data types
 * 
 * @type {Array}
 * @const
 */
var checkFuncs = [];

try {
  checkFuncs = [
    typeCheck.isundefined,
    typeCheck.isnull,
    typeCheck.isBoolean,
    typeCheck.isNumber,
    typeCheck.isFloat,
    typeCheck.isSafeInteger,
    typeCheck.isInteger,
    typeCheck.isBigInt,
    typeCheck.isString,
    typeCheck.isSymbol,
    typeCheck.isPrimitive,
    typeCheck.isEmptyObject,
    util.types.isBooleanObject,
    util.types.isNumberObject,
    util.types.isStringObject,
    util.types.isSymbolObject,
    util.types.isBoxedPrimitive,
    util.types.isGeneratorObject, 
    util.types.isArgumentsObject,
    util.types.isDate,
    util.types.isRegExp,
    typeCheck.isEmptyArray,
    typeCheck.isArray,
    util.types.isMap,
    util.types.isMapIterator,
    util.types.isWeakMap,
    util.types.isSet,
    util.types.isSetIterator,
    util.types.isWeakSet,
    util.types.isPromise,
    util.types.isProxy,  
    util.types.isSharedArrayBuffer,
    util.types.isAnyArrayBuffer,
    util.types.isArrayBuffer,
    typeCheck.isBuffer,
    util.types.isInt8Array,
    util.types.isInt16Array,
    util.types.isInt32Array,
    util.types.isFloat32Array,
    util.types.isFloat64Array,
    util.types.isUint8Array,
    util.types.isUint8ClampedArray,
    util.types.isUint16Array,
    util.types.isUint32Array,
    util.types.isBigInt64Array,
    util.types.isBigUint64Array,
    util.types.isDataView,
    typeCheck.isAnonymousClass,
    typeCheck.isClass,
    util.types.isAsyncFunction,
    util.types.isGeneratorFunction,
    typeCheck.isIterableFunction,
    typeCheck.isAnonymousFunction,
    typeCheck.isFunction,
    util.types.isNativeError,
    typeCheck.isError,
    util.types.isExternal,
    typeCheck.isObject
  ];
} catch (er) {
  checkFuncs = [
    typeCheck.isundefined,
    typeCheck.isnull,
    typeCheck.isBoolean,
    typeCheck.isNumber,
    typeCheck.isFloat,
    typeCheck.isSafeInteger,
    typeCheck.isInteger,
    typeCheck.isBigInt,
    typeCheck.isString,
    typeCheck.isSymbol,
    typeCheck.isPrimitive,
    typeCheck.isEmptyObject,
    typeCheck.isBooleanObject,
    typeCheck.isNumberObject,
    typeCheck.isStringObject,
    typeCheck.isSymbolObject,
    typeCheck.isBoxedPrimitive,
    typeCheck.isGeneratorObject, 
    typeCheck.isArgumentsObject,
    typeCheck.isDate,
    typeCheck.isRegExp,
    typeCheck.isEmptyArray,
    typeCheck.isArray,
    typeCheck.isMap,
    typeCheck.isMapIterator,
    typeCheck.isWeakMap,
    typeCheck.isSet,
    typeCheck.isSetIterator,
    typeCheck.isWeakSet,
    typeCheck.isPromise,
    typeCheck.isBuffer,
    typeCheck.isInt8Array,
    typeCheck.isInt16Array,
    typeCheck.isInt32Array,
    typeCheck.isFloat32Array,
    typeCheck.isFloat64Array,
    typeCheck.isUint8Array,
    typeCheck.isUint8ClampedArray,
    typeCheck.isUint16Array,
    typeCheck.isUint32Array,
    typeCheck.isDataView,
    typeCheck.isAnonymousClass,
    typeCheck.isClass,
    typeCheck.isAsyncFunction,
    typeCheck.isGeneratorFunction,
    typeCheck.isIterableFunction,
    typeCheck.isAnonymousFunction,
    typeCheck.isFunction,
    typeCheck.isError,
    typeCheck.isObject
  ];
}

/**
 * An array of JavaScript built-in prototype objects
 * It doesn't include the objects without prototype, for example, Math, JSON, Reflect, Proxy, isUint8ClampedArray 
 * 
 * @type {Array}
 * @const
 */
var jsBltObjs = [];

try {
  jsBltObjs = [
    Object,
    Function,
    Boolean,
    Symbol,
    Number, 
    BigInt,
    Date,
    String,
    RegExp,
    Array,
    Map,
    Set,
    WeakMap,
    WeakSet,  
    Promise,
    WebAssembly,
    ArrayBuffer,
    SharedArrayBuffer, 
    DataView,
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    BigInt64Array, 
    BigUint64Array,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError
  ];
} catch (er) {
  console.log('JSDump requires Node.js v10.0.0 and up.');
}

/**
 * An array of properties which should be ignored in dumped out contents
 * 
 * @type {Array}
 * @const
 */
const jsBltObjKeys = [ 
  'length',
  'name',
  'arguments',
  'caller',
  '__defineGetter__',
  '__defineSetter__',
  '__lookupGetter__',
  '__lookupSetter__'
];

/**
 * Module exports
 * @public
 */
module.exports.JS_CHECK_FUNCS = checkFuncs;
module.exports.JS_BLT_OBJ_KEYS = jsBltObjKeys;
module.exports.JS_BLT_OBJS = jsBltObjs;
