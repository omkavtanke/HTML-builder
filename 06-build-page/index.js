const fs = require('fs');
const path = require('path');
const promise = require('fs/promises');
const newdir = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');
const header = path.join(__dirname, 'components', 'header.html');
const index = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));

(async () => {
	await promise.mkdir(newdir)
	fs.readFile(template, (err, chunk) => {
		if (err) throw err;
		else if (chunk.toString() === '{{header}}') {
			fs.readFile(header, (err, chunk) => {
				if (err) throw err;
				console.log('helo')
				index.write(chunk)
			})
		}
		index.write(chunk)
		console.log(chunk.toString())
	})
}

)()