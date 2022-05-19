// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./04-names')
const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')
require('./07-mind-grenade')
sayHi('susan')
sayHi(names.john)
sayHi(names.peter)
//  for alternative flavor include data before the exported module 
// console.log(items); throws an error
console.log(data.items);
console.log(data.items[0]);
console.log(data.singlePerson);
