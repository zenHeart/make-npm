const myModule = require ('./module'); //测试模块
const myModule1 = require ('./module1'); // 采用 this 导出模块
const emptyModule = require ('./module2'); // 空模块

console.log('myModule:',myModule);
console.log('use this export module:',myModule1);
console.log ('emptyModule', emptyModule);