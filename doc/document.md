## Table of document contents

1. [JSDump](#JSDump)
2. [JSDump-Web](#JSDump-Web)
3. [Entries object](#Entries-object)
4. [Dumps a general object](#Dumps-a-general-object)
5. [Dumps a function](#Dumps-a-function)
6. [Dumps a class](#Dumps-a-class)
7. [JSDump APIs](#JSDump-APIs)
8. [JSDump-Web APIs](#JSDump-Web-APIs)
9. [Property attributes](#Property-attributes)
10. [Serialization](#Serialization)
11. [Default hidden Keys](#Default-hidden-Keys)
12. [Property types and super property types](#Property-types-and-super-property-types)
13. [JavaScript built-in prototype objects](#JavaScript-built-in-prototype-objects)
14. [Web built-in prototype objects](#Web-built-in-prototype-objects)
15. [Function parameter](#Function-parameter)


## JSDump

JSDump is a tool to dump out the information of own and inherited properties from an object, object prototype, and object instance.

JSDump helps people get the information of a JavaScript object at runtime as much as possible.

JSDump requires Node.js version 10.0.0 and up.

The URL of JSDump on npm is https://npmjs.com/package/jsdump


## JSDump-Web

JSDump-Web is a version of JSDump for web browsers. JSDump-Web requires browser supporting for ES6 (ECMAScript 2015).

Browser compatibilities to JSDump-Web,

|Chrome |Firefox |Edge |Safari |Opera |
| ---------|--------|-------|-------|-------|
|  51      |54      |14     | 10    | 38    |

The URL of JSDump-Web CDN is https://cdn.jsdelivr.net/gh/w3plan/jsdump-web/


## Entries object

Supposing obj is an object which should be processed, JSDump parses an JavaScript object and strore the result information to the following entries object properties:

*  ownEntries array includes entries from obj,
*  inheritedEntries array includes entries from Object.getPrototypeOf(obj),
*  prototypeOwnEntries array includes entries from obj.prototype if it exists,
*  prototypeIheritedEntries array includes entries from Object.getPrototypeOf(obj.prototype) if it exists,
*  instanceOwnEntries array includes entries from new obj if new obj exists.

The value of prototypeOwnEntries is a description string if obj.prototype is a JavaScript standard built-in object or a browser built-in object, and the value of prototypeIheritedEntries is a description string if Object.getPrototypeOf(obj.prototype) is a JavaScript standard built-in object or a browser built-in object.

Object.getPrototypeOf returns a internal [[Prototype]] property of obj.

If new obj and obj.prototype are not undefined, Object.getPrototypeOf(new obj) === obj.prototype would return true, there is no 'instanceIheritedEntries' property to JSDump.

Entry is an object that describes a property of the object which was processed by JSDump, entry properties and its meaning include:

*  key<br>
    The property(including methods to class) name from the input object
*  attributes<br>
    An array that the element could be 'configurable', 'enumerable', 'writable', 'getter', 'setter', 'extensible', 'sealed', or 'frozen'. The element can not be 'extensible', 'sealed', or 'frozen' if the input object is a primitive type.
*  types<br>
    An array that the element is the result of type checking functions.
*  constructor<br>
    Constructor name of the current property.
*  value<br>
    The value of the current property. JSDump automatically convert the value to a serialized string to output for the console, external file, and web pages if the value isn't a primitive type, a boxed primitive type, or the native code.
*  valueSerialized<br>
    true if the value is a serialized string, otherwise false.
*  valuePrototypeConstructor<br>
    Constructor name of the value prototype if the prototype object exists.

Entries object is null if the obj is a primitive type: string, number, bigint, boolean, symbol, undefined, or null.


## Dumps a general object

The general object is a JavaScript standard built-in object, a Node.js module object, or a customed object, the properties of entries object from a general object are:

*  ownEntries<br>
    An array of entries that stored the information extracted from properties in the general object.
*  inheritedEntries<br>
    A description string of a JavaScript standard built-in object or a browser built-in object.

For example, the entries object got from jsdump.entriesPrint( {} ):
```javascript
{
  ownEntries: [],
  inheritedEntries: 'JavaScript standard built-in object: Object'
}
```

## Dumps a function

A function is a JavaScript object, supposing jsFunct is the function which should be processed, key is a property name to jsFunct, and baseFunct is another function object, the propertis of entries object from jsFunct and baseFunct would be:

*  ownEntries<br>
    An array of entries that stored the information from jsFunct.key or Object.defineProperty(jsFunct, key, descriptor).
*  inheritedEntries<br>
    To be 'JavaScript standard built-in object: Function'.
*  prototypeOwnEntries<br>
    An array of entries that stored the information from jsFunct.prototype.key
*  prototypeIheritedEntries<br>
    To be 'JavaScript standard built-in object: Object'.
*  instanceOwnEntries<br>
    An array of entries that stored the information from properties with this. prefix in jsFunct, and properties with this. prefix in baseFunct if jsFunct includes the statement: baseFunct.apply(this[, arguments]) or baseFunct.call(this[, arg1, arg2, ...argN]) in the source.

For example, the entries object got from jsdump.entriesPrint( function() {} ):
```javascript
{
  ownEntries: [
    {
        key: 'prototype',
        attributes: [ 'writable', 'extensible' ],
        types: [ 'Object' ],
        constructor: '',
        value: '{}',
        valueSerialized: true
    }
  ],
  inheritedEntries: 'JavaScript standard built-in object: Function',
  prototypeOwnEntries: [
    {
        key: 'constructor',
        attributes: [ 'configurable', 'writable', 'extensible' ],
        types: [ 'AnonymousFunction', 'Function' ],
        constructor: 'Function',
        value: 'function() {}',
        valueSerialized: true,
        valuePrototypeConstructor: ''
    }
  ],
  prototypeIheritedEntries: 'JavaScript standard built-in object: Object',
  instanceOwnEntries: []
}
```

Some functions may have a prototype but do not have an instance, for example, fs.fsync, fs is a variable of Node.js module: js

There is no prototype and instance to an arrow function, so the entries object from an arrow function is same with the entries object from a general object, for example, the entries object got from jsdump.entriesPrint( () => {} ):
```javascript
{
  ownEntries: [],
  inheritedEntries: 'JavaScript standard built-in object: Function'
}
```

## Dumps a class  

A class is a function object, the features of a class include all methods in a class are public, a property in a class is either public or private, a class property and a class method could be static.

Supposing currentClass is a superclass or a derived class, baseClass is a subclass or a super class, key is a property name or a method name to currentClass and baseClass, the properties of entries object from currentClass and baseClass would be:

*  ownEntries<br>
    An array of entries that stored the information from static properties and static methods in currentClass, and all properties and methods defined by currentClass.key or Object.defineProperty(currentClass, key, descriptor).
*  inheritedEntries<br>
    An array of entries that stored the information from static properties and static methods in baseClass, or 'JavaScript standard built-in object: Function' if there is no baseClass.
*  prototypeOwnEntries<br>
    An array of entries that stored the information from public methods(include getter and setter) in currentClass, and all properties defined by currentClass.prototype.key
*  prototypeIheritedEntries<br>
    An array of entries that stored the information from public methods in baseClass, or 'JavaScript standard built-in object: Object' if there is no baseClass.
*  instanceOwnEntries<br>
    An array of entries that stored the information from public properties(no methods) from currentClass and baseClass.

For example, the entries object got from jsdump.entriesPrint( class {} ):
```javascript
{
  ownEntries: [
    {
        key: 'prototype',
        attributes: [ 'extensible' ],
        types: [ 'Object' ],
        constructor: '',
        value: '{}',
        valueSerialized: true
        }
  ],
  inheritedEntries: 'JavaScript standard built-in object: Function',
  prototypeOwnEntries: [
    {
        key: 'constructor',
        attributes: [ 'configurable', 'writable', 'extensible' ],
        types: [ 'AnonymousClass', 'Class' ],
        constructor: 'Function',
        value: 'class {}',
        valueSerialized: true,
        valuePrototypeConstructor: ''
    }
  ],
  prototypeIheritedEntries: 'JavaScript standard built-in object: Object',
  instanceOwnEntries: []
}
```

---------------------

## JSDump APIs

**info()**<br>
  Prints the brief information about JSDump to the console.


**entriesObj(obj, hiddenKeys = [])**<br>
  Returns an object that includes dumped out content from the given object.

  Parameters
  > obj  - An object which should be processed.<br>
  > hiddenKeys - An array of the given properties that should be ignored in the result, the default  value is true.<br>
  > Return value - An object of dumped out content.


**entriesPrint(obj, compact = true, hiddenKeys = [])**<br>
  Prints the entries information of an object to the console.

  Parameters
  > obj  -  An object which should be processed.<br>
  > compact - false to print serialized content, true to print the content without serialization, the default value is true.<br>
  > hiddenKeys -  An optional array of keys that would be ignored in dumped out content, the default value is [].


**entriesFile(obj, compact = true, hiddenKeys = [], file)**<br>
  Writes entries object to a txt file.

 Parameters
 > obj - An object which should be processed.<br>
 > compact - false to print serialized content, true to print the content without serialization, the default value is true.<br>
 > hiddenKeys - An optional array of keys that would be ignored in dumped out content, the default value is [].<br>
 > file - A file path to dumped-out content, if the file path was ignored the function would write dump-n.txt to the current directory, here n is an integer between 1000 and 9999.


**typeEntriesPrint(obj, propType = 'function', compact = true, hiddenKeys = [])**<br>
  Prints entries in assigned type to the console.

  Parameters
  > obj - An object which should be processed.<br>
  > proptype - One of 'primitive', 'function', 'class', 'indexedCollection', 'keyedCollection' and 'others', the default value is 'function'.<br>
  > compact - false to print serialized content, true to print the content without serialization, the default value is true.<br>
  > hiddenKeys  - An optional array of keys that would be ignored in dumped out content, the default value is [].


**typeEntriesFile(obj, propType = 'function', compact = true, hiddenKeys = [], file)**<br>
  Writes entries in assigned type to a txt file.

  Parameters
  > obj -  An object which should be processed.<br>
  > propType - One of 'primitive', 'function', 'class', 'indexedCollection', 'keyedCollection' and 'others', the default value is 'function'.<br>
  > compact - false to print serialized content, true to print the content without serialization, the default value is true.<br>
  > hiddenKeys -  An optional array of keys that would be ignored in dumped out content, the default value is [].<br>
  > file - A file path to dumped-out content, if the file path was ignored the function would write dump-n.txt to current directory, here n is an integer between 1000 and 9999.


**sourcePrint(obj, prop = 'constructor')**<br>
  Prints the property source to the console.

  Parameters
  > obj - An object which should be processed.<br>
  > prop - An optional string for the property, the default value is 'constructor'.


**sourceFile(obj, prop = 'constructor', file)**<br>
  Writes the property source to a txt file.

  Parameters
  > obj - An object which should be processed.<br>
  > prop - An optional string for the property, the default value is 'constructor'.<br>
  > file - A file path to dumped-out content, if the file path was ignored the function would write dump-n.txt to current directory, here n is an integer between 1000 and 9999.


## JSDump-Web APIs

**info()**<br>
  Prints the brief information about JSDump to the console.


**entriesObj(obj, hiddenKeys = [])**<br>
  The same with the function in JSDump APIs.


**entriesPrint(obj, hiddenKeys = [], color = false)**<br>
  Prints the entries information of an object to the console.

  Parameters
  > obj  -  An object which should be processed.<br>
  > hiddenKeys -  An optional array of keys that would be ignored in dumped out content, the default value is [].<br>
  > color - true to print color text, false to print text without color, the default value is false.


**entriesPage(obj, raw = false, hiddenKeys = [])**<br>
  Prints the entries information of an object to a new page. This API requires the browser to open a pop-up window.

  Parameters
  > obj - An object which should be processed.<br>
  > raw - An optional boolean for dumped-out content format, the default value is false to output content with style.<br>
  > hiddenKeys -- An optional array of keys that would be ignored in dumped out content, the default value is [].


**typeEntriesPrint(obj, propType = 'function', hiddenKeys = [], color = false)**<br>
  Prints entries in assigned type to the console.

  Parameters
  > obj - An object which should be processed.<br>
  > proptype - One of 'primitive', 'function', 'class', 'indexedCollection', 'keyedCollection' and 'others', the default value is 'function'.<br>
  > hiddenKeys  - An optional array of keys that would be ignored in dumped out content, the default value is [].<br>
  > color - true to print color text, false to print text without color, the default value is false.


**typeEntriesPage(obj, propType = 'function', raw = false, hiddenKeys = [])**<br>
  Prints the entries information of an object by assigned property type to a new page. This API requires the browser to open a pop-up window.

  Parameters
  > obj - An object which should be processed.<br>
  > propType - One of 'primitive', 'function', 'class', 'indexedCollection', 'keyedCollection', 'others', the default value is 'function'.<br>
  > raw - An optional boolean for the format of dumped out content, the default value is false to output content with style.<br>
  > hiddenKeys - An optional array of keys that would be ignored in dumped out content, the default value is [].


**sourcePrint(obj, prop = 'constructor')**<br>
  The same with the function in JSDump APIs.


**sourcePage(obj, prop = 'constructor', raw = false)**<br>
  Prints the property source to a new page. This API requires the browser to open a pop-up window.

  Parameters
  > obj - An object which should be processed.<br>
  > prop - An optional string for the property, the default value is constructor.<br>
  > raw - An optional boolean for the format of dumped out content.


## Property attributes

A object property has one or multiple attributes from the list:
> 'configurable', 'enumerable', 'writable', 'getter', 'setter', 'extensible', 'sealed', and 'frozen'.


## Serialization

JSDump automatically converts the value of object property to a serialized string to output for the console, external file, and web pages if the value of object property isn't a primitive type, a boxed primitive type, or the native code.


## Default hidden Keys

JSDump ignores hidden Keys from the entries object when outputs the formation to the console, external files and web pages, JSDump's defult hidden Keys includes:
>  'length',  'name',  'arguments',  'caller',  '\_\_defineGetter\_\_',  '\_\_defineSetter\_\_',  '\_\_lookupGetter\_\_',  '\_\_lookupSetter\_\_'

JSDump API allows users to assign new hidden Keys to filter the output content.


## Property types and super property types

| Property types | Super property types |
|----------------|----------------------|
|undefined | primitive|
|null | primitive|
|Boolean | primitive|
|Number | primitive|
|Float | primitive|
|SafeInteger | primitive|
|Integer | primitive|
|BigInt * | primitive|
|String | primitive|
|Symbol | primitive|
|AsyncFunction |function |
|GeneratorFunction |function |
|IterableFunction |function |
|AnonymousFunction |function |
|Function |function |
|AnonymousClass |class |
|Class |class |
|EmptyArray |indexedCollection |
|Array |indexedCollection |
|Int8Array |indexedCollection |
|Uint8Array |indexedCollection |
|Uint8ClampedArray |indexedCollection |
|Int16Array |indexedCollection |
|Uint16Array |indexedCollection |
|Int32Array |indexedCollection |
|Uint32Array |indexedCollection |
|Float32Array |indexedCollection |
|Float64Array |indexedCollection |
|BigInt64Array * |indexedCollection |
|BigUint64Array * |indexedCollection |
|Map |keyedCollection |
|Set |keyedCollection |
|WeakMap |keyedCollection |
|WeakSet |keyedCollection |
|EmptyObject |others |
|BooleanObject |others |
|NumberObject |others |
|StringObject |others |
|SymbolObject |others |
|BoxedPrimitive |others |
|GeneratorObject |others |
|ArgumentsObject |others |
|Object |others |
|Date |others |
|RegExp |others |
|MapIterator |others |
|SetIterator |others |
|Promise |others |
|Proxy * |others |
|SharedArrayBuffer * |others |
|AnyArrayBuffer * |others |
|ArrayBuffer * |others |
|Buffer * |others |
|DataView |others |
|NativeError * |others |
|Error |others |
|External * |others |
|Others |others |

For browser compatibility, JSDump-Web considers property types with * in the list as Others.


## JavaScript built-in prototype objects

JSDump uses a description string for inheritedEntries or prototypeIheritedEntries to the entries object, if inheritedEntries or prototypeIheritedEntries is one of JavaScript built-in prototype objects. To access [JavaScript built-in prototype objects](./js-bt-objects.md "JSDump documentation") for the details.


## Web built-in prototype objects

JSDump uses a description string for inheritedEntries or prototypeIheritedEntries to the entries object, if inheritedEntries or prototypeIheritedEntries is one of Web built-in prototype objects. To access [Web built-in prototype objects](./web-bt-objects.md "JSDump documentation") for the details.


## Function parameter

JSDump ignores the information to function parameter as the function definitions do not specify data types for parameters, JavaScript does not perform type checking on the passed arguments, and does not check the number of arguments received in default.


## [Back to top](#JSDump)
