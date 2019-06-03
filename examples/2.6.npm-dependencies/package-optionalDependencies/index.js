// 该范例说明如何结合 代码使用 optionalDependencies

try {
  var foo = require ('foo');
  var fooVersion = require ('foo/package.json').version;
} catch (er) {
  foo = null;
}

// 版本不符合要求
if (notGoodFooVersion (fooVersion)) {
  foo = require('package1'); // 采用 optional 的依赖进行替代
}

if (foo) {
  foo.hello();
}

function notGoodFooVersion (fooVersion) {
  return true;
}
