const helloWorld = require('hello-world')

module.exports = {
	lock() {
		console.log('npm-lock package');
		console.log('internal use hello-world',helloWorld.hello())
	}
}