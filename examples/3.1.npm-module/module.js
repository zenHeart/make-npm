module.exports = {
	show(name) {
		console.log(exports)
	}
}

// 此处导出无效
exports.say = () => console.log('say');

// console.log(module) // 显示内部模块对象
// console.log('module args:',arguments) // 理解传入参数