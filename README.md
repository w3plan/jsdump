## JSDump

JSDump is a tool to dump out the information of own and inherited properties from an object, object prototype, and object instance.

JSDump helps people get the information of a JavaScript object at runtime as much as possible.

JSDump requires Node.js version 10.0.0 and up.

JSDump-Web is a version of JSDump specified for web browsers. To access [JSDump-Web repository](https://github.com/w3plan/jsdump-web "JSDump-Web") for the details.


## Documentation

To see [JSDump documentation](doc/document.md "JSDump documentation")


## Installation

  ` $ npm install jsdump `


## Usage

```javascript
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
  // writes the serialized information of class URL to a txt file in current directory.  
  jsdump.entriesFile(URL, false);

  // prints the information of entries type with 'function' from class URL to the console.
  jsdump.typeEntriesPrint(URL);
  // prints the serialized information of entries type with 'function' from class URL to the console.
  jsdump.typeEntriesPrint(URL, 'function', false);
  
  // writes the information of entries type with 'function' from class URL to txt file.
  jsdump.typeEntriesFile(URL);
  // writes the serialized information of entries type with 'function' from class URL to txt file.
  jsdump.typeEntriesFile(URL, 'function', false);
  
  // prints constructor source of class URL to the console.
  jsdump.sourcePrint(URL);
  // prints toString() source of class URL to the console.
  jsdump.sourcePrint(URL, 'toString');

  // writes the constructor source of class URL to a txt file in current directory.
  jsdump.sourceFile(URL);
  // writes toString() source of class URL to a txt file in current directory.
  jsdump.sourceFile(URL, 'toString');
  
```

## Tests

Run the following command from JSDump project or JSDump module.

` $ npm test `


## License

MIT


## Keywords

> dump, jsdump, jsdump-web, object dump, javascript dump, runtime dump

