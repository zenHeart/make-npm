#!/usr/bin/env node
// 取自 vue-cli 工具的部分代码

const chalk = require ('chalk');
const semver = require ('semver');
const requiredVersion = require ('../package.json').engines.node;
const didYouMean = require ('didyoumean');
const debug = require ('debug') ('pw');

// 设置编辑距离必须小于 阈值*输入字符长度
didYouMean.threshold = 0.6;


function checkNodeVersion (wanted, id) {
  if (!semver.satisfies (process.version, wanted)) {
    console.log (
      chalk.red (
        'You are using Node ' +
          process.version +
          ', but this version of ' +
          id +
          ' requires Node ' +
          wanted +
          '.\nPlease upgrade your Node version.'
      )
    );
    process.exit (1);
  }
}

// 运行之前检查版本
checkNodeVersion (requiredVersion, 'pwc');

const program = require ('commander');

program.version (require ('../package').version).usage ('<command> [options]');

program
  .command ('create <account>')
  .alias('c')
  .description ('为某账户创建一个密码')
  .option ('-l, --length <number>', '密码长度默认 10',parseInt, 10)
  .option ('-c, --characters <str>', '字符集默认 [0-9a-z]', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
  .action ((account, cmd) => {
    const options = cleanArgs (cmd);

	let res = require('../lib/create')(account,options);
	console.log(res);
  });


program.arguments ('<command>').action (cmd => {
  program.outputHelp ();
  console.log (`  ` + chalk.red (`Unknown command ${chalk.yellow (cmd)}.`));
  console.log ();
  suggestCommands (cmd);
});

// add some useful info on help
program.on ('--help', () => {
  console.log ();
  console.log (
    `  Run ${chalk.cyan (`pw <command> --help`)} for detailed usage of given command.`
  );
  console.log ();
});

program.commands.forEach (c => c.on ('--help', () => console.log ()));

program.parse (process.argv);

if (!process.argv.slice (2).length) {
  program.outputHelp ();
}

function suggestCommands (cmd) {
  const availableCommands = program.commands.map (cmd => {
    return cmd._name;
  });
  const suggestion = didYouMean (cmd, availableCommands);
  if (suggestion) {
    console.log (
      `  ` + chalk.red (`Did you mean ${chalk.yellow (suggestion)}?`)
    );
  }
}

// 驼峰转换
function camelize (str) {
  return str.replace (/-(\w)/g, (_, c) => (c ? c.toUpperCase () : ''));
}

function cleanArgs (cmd) {
  const args = {};
  //此处调试作用输出 cmd 对象
  cmd.options.forEach (o => {
    // 提取 options 的  key
    const key = camelize (o.long.replace (/^--/, ''));
    // 如果非内置属性,且不为空则提取该选项
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
  });
  debug('%O', args)

  return args;
}
