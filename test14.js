var fetch = require('node-fetch');

function* gen() {
	let url = 'https://api.github.com/users/github';
	let result = yield fetch(url);
	console.log(result.bio);
}
var gg = gen();
var result = gg.next();
result.value.then((data) => data.json())
	.then((data) => gg.next(data))
	.catch((e) => console.log(e));