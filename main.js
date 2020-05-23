const util = require('util');
const typeCheck = require("./lib/type-check");
const { JS_CHECK_FUNCS, JS_BLT_OBJS, JS_BLT_OBJ_KEYS } = require('./lib/constants');

/**
 * Checks an object whether is a prototype of JavaScript standard built-in object.
 * 
 * @param {object} val - An object which should checked
 * @return {string|boolean}   A description string or false if the object isn't a prototype of standard built-in object
 */
function checkJsBuiltin(obj) {
  
  for (let i = 0; i < JS_BLT_OBJS.length; i++) {
    
    if ( JS_BLT_OBJS[i].prototype && 
         JS_BLT_OBJS[i].prototype === obj
    ) {
      return "JavaScript standard built-in object: " + JS_BLT_OBJS[i].name;
    }
  }
  
  return false;
}

/**
 * returns a array includes 'configurable', 'enumerable', 'writable', 
 * 'getter', or 'setter' attributes when thge values of attribute are trure.
 * 
 * @param {object} flag - A property descriptor
 * @return {array}   An array of attributes
 */
function getAttributes1(flag) {
  var attrs = [];

  if (flag.configurable) {
    attrs.push('configurable');
  }

  if (flag.enumerable) {
    attrs.push('enumerable');
  }

  if (flag.writable) {
    attrs.push('writable');
  }

  if (flag.get && typeCheck.isFunction(flag.get)) {
    attrs.push('getter');
  }

  if (flag.set && typeCheck.isFunction(flag.set)) {
    attrs.push('setter');
  }
  
  return attrs;
}
  
/**
 * Returns an array includes 'extensible', 'sealed' or 'frozen' attributes 
 * when the object is extensible, sealed or frozen.
 * 
 * @param {object} obj - An object which should be checked
 * @return {array}   An array of attributes
 */
function getAttributes2(obj) {
  var attrs = [];
  
  if (Object.isExtensible(obj)) {
    attrs.push('extensible');
  }

  if (Object.isSealed(obj)) {
    attrs.push('sealed');
  }

  if (Object.isFrozen(obj)) {
    attrs.push('frozen');
  }
  
  return attrs;
}

/**
 * Returns an array of roperty types.
 * 
 * @param {object} obj - An object which should be checked
 * @return {array}   An array of property types
 */
function getTypes(obj) {
  return JS_CHECK_FUNCS.reduce((types, func) => {
  
    if (func.name && func(obj)) 
      types.push( func.name.substring( func.name.indexOf("is") + 2 ) );

    return types;
  }, []);
}

/**
 * Gets the instance of the given object.
 * 
 * @param {object} val - An object which should be instanced
 * @return {object}   An instance of the object 
 */
function getNewObject(val) {

  if ( !typeCheck.hasPrototype(val) ) {
    return undefined;
  }
  
  try {
    var obj = new val();
  } catch (er) {
    return undefined;
  }

  return obj;
}

/**
 * Gets entries infomation from a given object.
 * 
 * @param {object} obj - An object which should be processed
 * @param {array} hdKeys - An array of the given properties which should be not ignored in the entries 
 * @return {array}   An array of entry objects 
 */
function getEntries(obj, hdKeys) {
  var keys = Reflect.ownKeys(obj);
  var bypassKeys = JS_BLT_OBJ_KEYS;
  
  if (Array.isArray(hdKeys) && hdKeys.length > 0) {
    bypassKeys = [...new Set([...bypassKeys, ...hdKeys])];
  }
  
  return keys.reduce((acc, key) => {
    
    if (bypassKeys.includes(key)) {
      /* bypass properties in dumped out contents */
    } else {
      var entry = {key};
      var descriptor = Object.getOwnPropertyDescriptor(obj, key);
      
      if (descriptor) {
        
        entry.attributes = getAttributes1(descriptor);
        
        if ( descriptor.value !== undefined && 
             descriptor.value !== null
        ) {

          if ( !typeCheck.isPrimitive(descriptor.value) ) {
            entry.attributes = entry.attributes.concat(getAttributes2(descriptor.value));
          }
          
          entry.types = getTypes(descriptor.value);
          
          if (entry.types.length === 0) entry.types = ['Others'];
          
          if (descriptor.value.constructor) {
            entry.constructor = descriptor.value.constructor.name;
          }
          
          entry.value = descriptor.value;
          
          entry.valueSerialized = false;
          
          if ( descriptor.value.prototype !== undefined && 
               descriptor.value.prototype !== null &&
               descriptor.value.prototype.constructor
          ) {
            entry.valuePrototypeConstructor = descriptor.value.prototype.constructor.name;
          }
          
        }
      }

      acc.push(entry);
    }
    
    return acc;
  }, []);
}

/**
 * Returns an object that includes dumped out content from the given object.
 * 
 * @param {object} obj - An object which should be processed
 * @param {array} hdKeys - An array of the given properties which should be ignored in the result 
 * @return {object}   An object of dumped out content
 */
function dumpEntries(obj, hiddenKeys = []) {

  if (typeCheck.isPrimitive(obj))
    return null;
  
  var entries = {};
  
  entries.ownEntries = getEntries(obj, hiddenKeys);
  
  var objProto1 = Object.getPrototypeOf(obj);
  
  if (objProto1) {
    const jsBlt1 = checkJsBuiltin(objProto1);
    
    if (jsBlt1) {
      entries.inheritedEntries = jsBlt1;
    } else {
      entries.inheritedEntries = getEntries(objProto1, hiddenKeys);
    }
  }
  
  if (typeCheck.hasPrototype(obj)) {
    entries.prototypeOwnEntries = getEntries(obj.prototype, hiddenKeys);
    
    var objProto2 = Object.getPrototypeOf(obj.prototype);

    if (objProto2) {
      const jsBlt2 = checkJsBuiltin(objProto2);
      
      if (jsBlt2) {
        entries.prototypeIheritedEntries = jsBlt2;
      } else {
        entries.prototypeIheritedEntries = getEntries(objProto2, hiddenKeys);
      }
    }
  }
  
  const newObj = getNewObject(obj);
  
  if (newObj) {
    entries.instanceOwnEntries = getEntries(newObj, hiddenKeys);
  }
  
  return entries;
}

/**
 * Module exports.
 * @public
 */
module.exports = dumpEntries;
