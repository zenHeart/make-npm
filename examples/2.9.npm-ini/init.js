const desc = prompt ('description?', 'A new package...');
const foo = prompt ('foo?', '');
const count = prompt ('count?', '42');

module.exports = {
  name: prompt ('name?', process.cwd ().split ('/').pop ()),
  version: prompt ('version?', '0.1.0'),
  description: desc,
  main: 'index.js',
  custom: {
    foo:foo,
    count: count,
  }
};
