const assert = require('assert');
const entriesObj = require('../main');
const data = require('../lib/sample-objects');

// gets entries object 
var obj = entriesObj(data.obj);
var func = entriesObj(data.func);
var cls = entriesObj(data.Cls);

// gets an entry from entries object
function getProperty(entries, prop) {
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].key === prop || entries[i].key.toString() === prop) {
       return entries[i];
    }
  }
}

// serializes the value then removes newlines and whitespace from the value 
function serialize(val) {
  try {
    return val.toString().replace(/\r\n|\r|\n/g, '').replace(/ +/g, '');
  } catch(e) {
    console.log('Failed to serialize the value');
  }
}

var actual;

// starts testing
describe("JSDump Unit Test", function() {
  describe("Testing general object", function() {
    it("Testing property: bar", function() {
      actual = getProperty(obj.ownEntries, 'bar');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'getter', 'setter'], 'Attributes error');
    });
    
    it("Testing property: bar0", function() {
      actual = getProperty(obj.ownEntries, 'bar0');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Date'], 'Types error');
      assert.deepEqual(actual.constructor, 'Date', 'Constructor error');
      assert.deepEqual(actual.value, new Date("2020-05-01, 11:10:01"), 'Value error');
    });
    
    it("Testing property: bar1", function() {
      actual = getProperty(obj.ownEntries, 'bar1');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(actual.value, 'bar1', 'Value error');
    });
       
    it("Testing property: bar5", function() {
      actual = getProperty(obj.ownEntries, 'bar5');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['EmptyObject', 'Object'], 'Types error');
      assert.deepEqual(actual.constructor, 'Object', 'Constructor error');
      assert.deepEqual(actual.value, {}, 'Value error');
    });
        
    it("Testing property: bar10", function() {
      actual = getProperty(obj.ownEntries, 'bar10');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['Number', 'SafeInteger', 'Integer', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'Number', 'Constructor error');
      assert.deepEqual(actual.value, 10, 'Value error');
    });
    
    it("Testing property: bar20", function() {
      actual = getProperty(obj.ownEntries, 'bar20');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['Number', 'Float', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'Number', 'Constructor error');
      assert.deepEqual(actual.value, 20.56, 'Value error');
    });

    it("Testing property: foo10", function() {
      actual = getProperty(obj.ownEntries, 'foo10');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "foo10(){console.log('foo10');}", 'Value error');
    });
    
    it("Testing property: foo20", function() {
      actual = getProperty(obj.ownEntries, 'foo20');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "()=>console.log('bar20')", 'Value error');
    });
    
    it("Testing property: foo25", function() {
      actual = getProperty(obj.ownEntries, 'foo25');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Class'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "class{foo25(){console.log('foo25');}}", 'Value error');
    }); 
    
    it("Testing property: foo28", function() {
      actual = getProperty(obj.ownEntries, 'foo28');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "foo28(){console.log('foo28');}", 'Value error');
    });

    it("Testing property: bar30", function() {
      actual = getProperty(obj.ownEntries, 'bar30');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(actual.value, 'bar30', 'Value error');
    });
    
    it("Testing property: foo30", function() {
      actual = getProperty(obj.ownEntries, 'foo30');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "function(){console.log('foo30');}", 'Value error');
    });
   
    it("Testing property: bar40", function() {
      actual = getProperty(obj.ownEntries, 'bar40');
      
      assert.deepEqual(actual.attributes, ['writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(actual.value, 'bar40', 'Value error');
    });

    it("Testing property: foo40", function() {
      actual = getProperty(obj.ownEntries, 'foo40');
      
      assert.deepEqual(actual.attributes, ['extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "function(){console.log('foo40');}", 'Value error');
    });
    
    it("Testing property: Symbol(id)", function() {
      actual = getProperty(obj.ownEntries, 'Symbol(id)');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['Number', 'Float', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'Number', 'Constructor error');
      assert.deepEqual(actual.value, 100.25, 'Value error');
    });

    it("Testing property: Symbol(Symbol.iterator)", function() {
      actual = getProperty(obj.ownEntries, 'Symbol(Symbol.iterator)');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "[Symbol.iterator](){console.log('Symbol.iterator');}", 'Value error');
    });
  });
  
  describe("Testing function", function() {
    it("Testing property: bar30", function() {
      actual = getProperty(func.ownEntries, 'bar30');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(actual.value, 'bar30', 'Value error');
    });
    
    it("Testing property: foo30", function() {
      actual = getProperty(func.ownEntries, 'foo30');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "function(){console.log('foo30');}", 'Value error');
    });
    
    it("Testing property: bar50", function() {
      actual = getProperty(func.ownEntries, 'bar50');
      
      assert.deepEqual(actual.attributes, ['writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(serialize(actual.value), 'bar50', 'Value error');
    });

    it("Testing property: foo50", function() {
      actual = getProperty(func.ownEntries, 'foo50');
      
      assert.deepEqual(actual.attributes, ['extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "function(){console.log('foo50');}", 'Value error');
    });
    
    it("Testing property: bar40", function() {
      actual = getProperty(func.prototypeOwnEntries, 'bar40');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(serialize(actual.value), 'bar40', 'Value error');
    });
    
    it("Testing property: foo40", function() {
      actual = getProperty(func.prototypeOwnEntries, 'foo40');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "function(){console.log('foo40');}", 'Value error');
    });
    
    it("Testing property: bar1", function() {
      actual = getProperty(func.instanceOwnEntries, 'bar1');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['Number', 'Float', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'Number', 'Constructor error');
      assert.deepEqual(actual.value, 1.28, 'Value error');
    });
    
    it("Testing property: foo1", function() {
      actual = getProperty(func.instanceOwnEntries, 'foo1');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "function(){console.log('foo1');}", 'Value error');
    });

    it("Testing property: bar5", function() {
      actual = getProperty(func.instanceOwnEntries, 'bar5');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Date'], 'Types error');
      assert.deepEqual(actual.constructor, 'Date', 'Constructor error');
      assert.deepEqual(actual.value, new Date('2020-05-01, 11:10:01'), 'Value error');
    });
    
    it("Testing property: foo10", function() {
      actual = getProperty(func.instanceOwnEntries, 'foo10');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "function(){console.log('foo10');}", 'Value error');
    });

    it("Testing property: bar10", function() {
      actual = getProperty(func.instanceOwnEntries, 'bar10');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['Number', 'SafeInteger', 'Integer', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'Number', 'Constructor error');
      assert.deepEqual(actual.value, 10, 'Value error');
    });
    
    it("Testing property: bar", function() {
      actual = getProperty(func.instanceOwnEntries, 'bar');
      
      assert.deepEqual(actual.attributes, ['getter', 'setter'], 'Attributes error');
    });
    
    it("Testing property: Symbol(Symbol.iterator)", function() {
      actual = getProperty(func.instanceOwnEntries, 'Symbol(Symbol.iterator)');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "function(){console.log('Symbol.iterator');}", 'Value error');
    });
  });
  
  describe("Testing class", function() {
    it("Testing property        : bar20", function() {
      actual = getProperty(cls.ownEntries, 'bar20');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['Number', 'Float', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'Number', 'Constructor error');
      assert.deepEqual(actual.value, 20.73, 'Value error');
    });
    
    it("Testing property(method): foo20", function() {
      actual = getProperty(cls.ownEntries, 'foo20');
      
      assert.deepEqual(actual.attributes, ['configurable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "foo20(){console.log('foo20');}", 'Value error');
    });
    
    it("Testing property        : bar30", function() {
      actual = getProperty(cls.ownEntries, 'bar30');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(actual.value, 'bar30', 'Value error');
    });
    
    it("Testing property(method): foo30", function() {
      actual = getProperty(cls.ownEntries, 'foo30');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "function(){console.log('foo30');}", 'Value error');
    });
    
    it("Testing property        : bar50", function() {
      actual = getProperty(cls.ownEntries, 'bar50');
      
      assert.deepEqual(actual.attributes, ['writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(actual.value, 'bar50', 'Value error');
    });
    
    it("Testing property(method): foo50", function() {
      actual = getProperty(cls.ownEntries, 'foo50');
      
      assert.deepEqual(actual.attributes, ['extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "function(){console.log('foo50');}", 'Value error');
    });
    
    it("Testing property        : bar100", function() {
      actual = getProperty(cls.inheritedEntries, 'bar100');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(actual.value, 'bar100', 'Value error');
    });

    it("Testing property(method): foo100", function() {
      actual = getProperty(cls.inheritedEntries, 'foo100');
      
      assert.deepEqual(actual.attributes, ['configurable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "foo100(){console.log('foo100');}", 'Value error');
    });
    
    it("Testing property(method): foo25", function() {
      actual = getProperty(cls.prototypeOwnEntries, 'foo25');
      
      assert.deepEqual(actual.attributes, ['configurable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "foo25(){console.log('foo25');}", 'Value error');
    });

    it("Testing property        : bar", function() {
      actual = getProperty(cls.prototypeOwnEntries, 'bar');
      
      assert.deepEqual(actual.attributes, ['configurable', 'getter', 'setter'], 'Attributes error');
    });

    it("Testing property        : bar40", function() {
      actual = getProperty(cls.prototypeOwnEntries, 'bar40');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(actual.value, 'bar40', 'Value error');
    });

    it("Testing property(method): foo40", function() {
      actual = getProperty(cls.prototypeOwnEntries, 'foo40');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "function(){console.log('foo40');}", 'Value error');
    });

    it("Testing property(method): Symbol(Symbol.iterator)", function() {
      actual = getProperty(cls.prototypeOwnEntries, 'Symbol(Symbol.iterator)');
      
      assert.deepEqual(actual.attributes, ['configurable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "[Symbol.iterator](){console.log('Symbol.iterator');}", 'Value error');
    });

    it("Testing property(method): foo10", function() {
      actual = getProperty(cls.prototypeIheritedEntries, 'foo10');
      
      assert.deepEqual(actual.attributes, ['configurable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Function'], 'Types error');
      assert.deepEqual(actual.constructor, 'Function', 'Constructor error');
      assert.deepEqual(serialize(actual.value), "foo10(){console.log('foo10');}", 'Value error');
    });

    it("Testing property        : bar2", function() {
      actual = getProperty(cls.instanceOwnEntries, 'bar2');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Date'], 'Types error');
      assert.deepEqual(actual.constructor, 'Date', 'Constructor error');
      assert.deepEqual(actual.value, new Date('2020-05-01, 11:10:01'), 'Value error');
    });

    it("Testing property        : bar21", function() {
      actual = getProperty(cls.instanceOwnEntries, 'bar21');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(actual.value, 'bar21', 'Value error');
    });

    it("Testing property        : bar3", function() {
      actual = getProperty(cls.instanceOwnEntries, 'bar3');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(actual.value, 'bar3', 'Value error');
    });

    it("Testing property        : bar15", function() {
      actual = getProperty(cls.instanceOwnEntries, 'bar15');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['Number', 'SafeInteger', 'Integer', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'Number', 'Constructor error');
      assert.deepEqual(actual.value, 15, 'Value error');
    });

    it("Testing property        : bar150", function() {
      actual = getProperty(cls.instanceOwnEntries, 'bar150');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes error');
      assert.deepEqual(actual.types, ['Date'], 'Types error');
      assert.deepEqual(actual.constructor, 'Date', 'Constructor error');
      assert.deepEqual(actual.value, new Date('2020-05-01, 09:01:01'), 'Value error');
    });

    it("Testing property        : bar25", function() {
      actual = getProperty(cls.instanceOwnEntries, 'bar25');
      
      assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes error');
      assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types error');
      assert.deepEqual(actual.constructor, 'String', 'Constructor error');
      assert.deepEqual(actual.value, 'bar25', 'Value error');
    });
  });
});
