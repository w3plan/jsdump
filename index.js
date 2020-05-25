const fs = require('fs');
const path = require('path');
const util = require('util');
const serialize = require('serialize-javascript');
const supportsColor = require('supports-color');
const dumpEntries = require('./main');

/**
 * The array of dumped out object properties
 * 
 */
const dumProps = [ 
    'ownEntries', 
    'inheritedEntries', 
    'prototypeOwnEntries',
    'prototypeIheritedEntries',
    'instanceOwnEntries'
];

/**
 * Super types of property types
 * 
 */
const superTypes = { 
  primitive: ['undefined', 'null', 'Boolean', 'Number', 'Float', 'SafeInteger', 'Integer', 'BigInt', 'String', 'Symbol'],
  function: ['AsyncFunction', 'GeneratorFunction', 'IterableFunction', 'AnonymousFunction', 'Function'],
  class: ['AnonymousClass', 'Class'],
  indexedCollection: ['EmptyArray', 'Array', 'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array', 'BigInt64Array', 'BigUint64Array'],
  keyedCollection: ['Map', 'Set', 'WeakMap', 'WeakSet'],  
  others: ['EmptyObject', 'BooleanObject', 'NumberObject', 'StringObject', 'SymbolObject', 'BoxedPrimitive', 'GeneratorObject', 'ArgumentsObject', 'ModuleNamespaceObject', 'Object', 'Date', 'RegExp', 'MapIterator', 'SetIterator', 'Promise', 'Proxy', 'SharedArrayBuffer', 'AnyArrayBuffer', 'ArrayBuffer', 'Buffer', 'DataView', 'NativeError', 'Error', 'External', 'Others']
};

/**
 * Serialized and formated an object
 * 
 * @param {object} val - An object
 * @return {string}   A formated string
 */
function formatPrint(val) {
  var color = false;
  if (supportsColor.stdout) {
    color = true;
  }
  
  return util.inspect(val, false, 10, color, true, true);
}

/**
 * Serialized and formated an object
 * 
 * @param {object} val - An object
 * @return {string}   A formated string
 */
function formatFile(val) {
  return util.inspect(val, false, 10, false, true, true);
}

/**
 * Serialized non-Primitive properties and non-BoxedPrimitive properties from an object
 * 
 * @param {object} props - An object
 * @return {object}   A serialized object
 */
function doSerialization(props) {

    props.forEach((prop, index) => {

      if ( prop.value && 
           !prop.types.includes('Primitive') && 
           !prop.types.includes('BoxedPrimitive')
      ) {
          try {
            props[index].value = serialize( prop.value );
            props[index].valueSerialized = true;
          } catch (er) {
            /* continuous loop */
          }
      }
  });

  return props;
}

/**
 * Gets the property source
 * 
 * @param {object} entries  - An object returned by jsdump.entries function.
 * @param {srting} property - An property of entries object
 * @return {string}   A source string
 */
function getSource(entries, property) {
  var source = '',
      head = '\n',
      ser = '',
      props = '';

  dumProps.forEach((key) => {
    if (entries && entries.hasOwnProperty(key)) {
      props = entries[key];

      if (Array.isArray(props) && props.length > 0) {
        props.forEach((prop) => {

          if (prop.value !== undefined && 
              property && 
              prop.key === property
          ) {

            if ( !prop.types.includes('Primitive') && 
                 !prop.types.includes('BoxedPrimitive')
            ) {
              try {
                ser = serialize(prop.value);
                if ( prop.types.includes('Class') && 
                     prop.valuePrototypeConstructor !== undefined && 
                     property === 'constructor'
                ) {
                  head = '\nclass ' + prop.valuePrototypeConstructor + ' {  ';
                  ser = ser.replace(/^function/, '[function]')
                           .replace(new RegExp('^class ' + prop.valuePrototypeConstructor + ' +{' ), '');
                }

                source += head + ser;
              } catch (er) {
                source += head + "The native code can't be dumped out.";
              }
            } else {
              source += head + formatFile( prop.value );
            }
          }

        });
      }
    }
  });

  return source;
}

/**
 * Updates entries array with assigned type.
 * 
 * @param {object} entries  - A JavaScript object to dump out
 * @param {array} typeEntries - An entries array
 * @param {string} type - One of 'primitive', 'function', 'class', 'indexedCollection', 'keyedCollection', 'others'
 * @return {array}   Updated entries array
 */
function updateTypeEntries(entries, typeEntries, type) {
  var props = null;
  
  if ( !['primitive', 'function', 'class', 'indexedCollection', 'keyedCollection', 'others'].includes(type) ) {
    type = 'function';
  }
  
  dumProps.forEach((key) => {
    
    if (entries && entries.hasOwnProperty(key)) {
      props = entries[key];

      if ( Array.isArray(props) && props.length > 0 ) {

        for (var i = 0; i < props.length; i++) {
         
          if (Array.isArray(props[i].types) && props[i].types.length > 0) {

            for (var j = 0; j < props[i].types.length; j++) {
            
              if ( superTypes[type].includes( props[i].types[j] ) ) {
                typeEntries.push( props[i] );              
                break;
              }
            }
          }
        }
      }
    }
  });

  return typeEntries;
}

/**
 * Prints JSDump information to the console.
 *
 */
function dumpInfo() {
  const info = `
     ***  JSDump  ***
  JSDump is a tool to dump out the information of own and inherited properties from an object, 
  object prototype, and object instance.
  
  Sample usage:
    const jsdump = require('jsdump');
  
    // prints this message.
    jsdump.info();
    // returns an object that includes dumped out content from class URL.
    jsdump.entriesObj(URL);
    
    // prints the information of class URL to the console.
    jsdump.entriesPrint(URL);
    // prints the serialized information of class URL to the console.
    jsdump.entriesPrint(URL, false);
    
    // writes the information of class URL to a txt file in current directory.
    jsdump.entriesFile(URL);
    /* writes the serialized information of class URL to a txt file 
       in current directory. */
    jsdump.entriesFile(URL, false);
    
    /* prints the information of entries type with 'function' 
       from class URL to the console. */
    jsdump.typeEntriesPrint(URL);
    /* prints the serialized information of entries type 
       with 'function' from class URL to the console. */
    jsdump.typeEntriesPrint(URL, 'function', false);
    
    /* writes the information of entries type with 'function' 
       from class URL to txt file. */
    jsdump.typeEntriesFile(URL);
    /* writes the serialized information of entries type 
       with 'function' from class URL to txt file. */
    jsdump.typeEntriesFile(URL, 'function', false);
    
    // prints constructor source of class URL to the console.
    jsdump.sourcePrint(URL);
    // prints toString() source of class URL to the console.
    jsdump.sourcePrint(URL, 'toString');

    /* writes the constructor source of class URL to a txt 
       file in current directory. */
    jsdump.sourceFile(URL);
    /* writes toString() source of class URL to a txt file 
       in current directory. */
    jsdump.sourceFile(URL, 'toString');
   
  Author: Richard Li <richard.li@w3plan.net>, License: MIT
`;
  console.log(info);
}

/**
 * Prints the property source to the console
 * 
 * @param {object} obj  - A JavaScript object to dump out
 * @param {srting} [prop=constructor] - An optional string for the property, the default value is constructor
 */
function dumpSourcePrint(obj, prop = 'constructor') {
  var entries = dumpEntries(obj);
  
  if (entries === null ) return;
  
  var source = getSource(entries, prop);

  if (source.length === 0) source = "The property: " + prop + " doesn't exist.";

  console.log(source);
}

/**
 * Writes the property source to a txt file
 *
 * @param {object} obj  - A JavaScript object to dump out
 * @param {srting} [prop=constructor] - An optional string for the property, the default value is constructor
 * @param {string} [file] - A file path to dumped-out content, if the file path was ignored the function would  
                            write dump-n.txt to current directory, here n is an integer between 1000 and 9999.
 */
function dumpSourceFile(obj, prop = 'constructor', file) {
  var file = file || '',
      fdir = '',
      source = '',
      entries = dumpEntries(obj);
  
  if (entries === null ) return;

  if (file) {
    
    if ( !fs.existsSync( path.dirname(file) ) ) file = '';
  }
  
  if (!file) {

    if (require.main && require.main.filename) {
      fdir = path.dirname(require.main.filename);
    } else {
      fdir = process.cwd();
    }

    file = path.join(
                      fdir, 
                      "dump-" + (Math.floor( 1000 + Math.random() * 9000 )) + ".src.txt"
                    );
  }
  
  source = getSource(entries, prop);
  
  if (source.length > 0) {
    fs.writeFile(file, source, (er) => {
      if (er) console.log(er);
    });
    
    console.log("Dumped out file: " + file);
  }
}

/**
 * Prints the infomation of an entries object to the console.
 * 
 * @param {object} obj - A JavaScript object to dump out
 * @param {boolean} [compact=true] - An optional boolean for dumped-out content format
 * @param {array} [hiddenKeys = []] - An optional array of keys that would be ignored in dumped out content
 */
function dumpEntriesPrint(obj, compact = true, hiddenKeys = []) {
  var props = null,
      flag = true,
      today = new Date(),
      entries = dumpEntries(obj, hiddenKeys);
  
  if (entries === null ) {
    console.log('null');
    return;
  }

  console.log( "Time: " + 
               ("0" + today.getHours()).slice(-2) + ":" + 
               ("0" + today.getMinutes()).slice(-2) + ":" + 
               ("0" + today.getSeconds()).slice(-2)
             );
  
  dumProps.forEach((key) => {
      
    if (entries && entries.hasOwnProperty(key)) {
      props = entries[key];

      if ( !compact && 
           Array.isArray(props) && 
           props.length > 0
      ) {
        props = doSerialization(props);
      }
      
      if (supportsColor.stdout) {
        console.log("\x1b[1m%s\x1b[0m", "\n" + key);
      } else {
        console.log("\n" + key);
      }
      
      console.log( formatPrint(props) );
      
      flag = false;
    }
  });
  
  if (flag) console.log('There is no entries to print.');
}

/**
 * Prints entries in assigned type to the console.
 * 
 * @param {object} obj  - A JavaScript object to dump out
 * @param {string} [propType=function] - One of 'primitive', 'function', 'class', 'indexedCollection', 'keyedCollection', 'others'
 * @param {boolean} [compact=true] - An optional boolean for dumped-out content format
 * @param {array} [hiddenKeys = []] - An optional array of keys that would be ignored in dumped out content
 */
function typeEntriesPrint(obj, propType = 'function', compact = true, hiddenKeys = []) {
  var props = null,
      typeEntries = [],
      entries = dumpEntries(obj, hiddenKeys);
  
  if (entries === null ) {
    console.log('null');
    return;
  }
    
  typeEntries = updateTypeEntries(entries, typeEntries, propType);
  
  if (typeEntries.length === 0) {
    console.log('There is no entries to print.');
  } else if ( !compact ) {
    typeEntries = doSerialization( typeEntries );
    console.log( formatPrint(typeEntries) );
  } else {
    console.log( formatPrint(typeEntries) );
  }
}

/**
 * Writes entries object to a txt file.
 * 
 * @param {object} obj  - A JavaScript object to dump out
 * @param {boolean} [compact=true] - An optional boolean for dumped-out content format
 * @param {array} [hiddenKeys = []] - An optional array of keys that would be ignored in dumped out content
 * @param {string} [file] - A file path to dumped-out content, if the file path was ignored the function would  
                            write dump-n.txt to current directory, here n is an integer between 1000 and 9999.
 */
function dumpEntriesFile(obj, compact = true, hiddenKeys = [], file) {
  var file = file || '', fdir = '';
  var entries = dumpEntries(obj, hiddenKeys);
  
  if (entries === null ) return;
  
  if (file) {

    if ( !fs.existsSync( path.dirname(file) ) ) file = '';
  }
  
  if (!file) {

    if (require.main && require.main.filename) {
      fdir = path.dirname(require.main.filename);
    } else {
      fdir = process.cwd();
    }

    file = path.join( fdir, 
                      "dump-" + (Math.floor( 1000 + Math.random() * 9000 )) + ".txt"
                    );
  }
  
  if (!compact) {
    dumProps.forEach((key) => {
        
      if (entries && entries.hasOwnProperty(key)) {
        props = entries[key];
        
        if (Array.isArray(props) && props.length > 0) {
          props = doSerialization(props);
        }
      }
    });
  }
  
  entries = formatFile(entries);
  
  fs.writeFile(file, entries, (er) => {
    if (er) console.log(er);
  });
  
  console.log("Dumped out file: " + file);
}

/**
 * Writes entries in assigned type to a txt file.
 * 
 * @param {object} obj  - A JavaScript object to dump out
 * @param {string} [propType=function] - One of 'primitive', 'function', 'class', 'indexedCollection', 'keyedCollection', 'others'
 * @param {boolean} [compact=true] - An optional boolean for dumped-out content format
 * @param {array} [hiddenKeys = []] - An optional array of keys that would be ignored in dumped out content
 * @param {string} [file] - A file path to dumped-out content, if the file path was ignored the function would  
                            write dump-n.txt to current directory, here n is an integer between 1000 and 9999.
 */
function typeEntriesFile(obj, propType = 'function', compact = true, hiddenKeys = [], file) {
  var file = file || '',
      fdir = '',
      typeEntries = [],
      entries = dumpEntries(obj, hiddenKeys);
  
  if (entries === null ) return;
  
  if (file) {
    if ( !fs.existsSync( path.dirname(file) ) ) file = '';
  }
  
  if (!file) {

    if (require.main && require.main.filename) {
      fdir = path.dirname(require.main.filename);
    } else {
      fdir = process.cwd();
    }
    
    file = path.join( fdir, 
                      "dump-" + (Math.floor( 1000 + Math.random() * 9000 )) + "." + propType + ".txt"
                    );
  }
  
  typeEntries = updateTypeEntries(entries, typeEntries, propType);
  
  if (typeEntries.length === 0) {
    console.log('There is no entries to write.');
    return;
  } else if ( !compact ) {
    typeEntries = doSerialization( typeEntries );
  }
  
  typeEntries = formatFile(typeEntries);
  
  fs.writeFile(file, typeEntries, (er) => {
    if (er) console.log(er);
  });
  
  console.log("Dumped out file: " + file);
}

/**
 * Module exports.
 * @public
 */
module.exports.info = dumpInfo;
module.exports.entriesObj = dumpEntries;
module.exports.sourcePrint = dumpSourcePrint;
module.exports.typeEntriesPrint = typeEntriesPrint;
module.exports.entriesPrint = dumpEntriesPrint;
module.exports.sourceFile = dumpSourceFile;
module.exports.typeEntriesFile = typeEntriesFile;
module.exports.entriesFile = dumpEntriesFile;
