#!/usr/bin/env node
const fs = require ('fs');
const path = require('path');
const ejs = require ('ejs');

const TEMPLATE = path.join(__dirname,'./template.ejs');
const EXT = '.html';

// 提取传入的参数
const args = process.argv.slice (2);
if (!args.length) {
	createTemplate('index')
} else {
  args.forEach (ele => {
	createTemplate(ele)
  });
}

// 读取模板文本
let tempStr = fs.readFileSync (TEMPLATE, 'utf8');
// 基于模板文本创建模板
function createTemplate(name) {
	let data = {title: name},outputFileName = name+EXT;
    let res = ejs.compile (tempStr, {
      filename: TEMPLATE,
      outputFunctionName: 'echo',
	}) (data);

	//写入模板文件
	fs.writeFileSync(outputFileName,res);
}