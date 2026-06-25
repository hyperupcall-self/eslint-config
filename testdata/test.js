import c from 'b'

class A extends B {
	constructor() {
		super()
	} // Would throw a ReferenceError.
}

// https://eslint.org/docs/latest/rules/array-callback-return#rule-details
const bar = foo.filter(function (x) {
	if (x) {
		return true
	} else {
		return
	}
})

// https://eslint.org/docs/latest/rules/no-const-assign#rule-details
const a = 0
a = 1

function doSomething() {}
function forgotToReturn() {}

const myPromise = new Promise()
myPromise.then(function (val) {})
myPromise.then(() => {
	doSomething()
})
myPromise.then((b) => {
	if (b) {
		return 'yes'
	} else {
		forgotToReturn()
	}
})
