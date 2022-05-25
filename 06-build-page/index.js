const fs = require('fs');
const path = require('path');
const promise = require('fs/promises');
const newDir = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, 'assets');
const stylesPath = path.join(__dirname, 'styles');
const assetsCopy = path.join(newDir, 'assets')
const templatePath = path.join(__dirname, 'template.html');
const indexFile = path.join(newDir, 'index.html');
const cssFile = path.join(newDir, 'style.css');
const componDir = path.join(__dirname, 'components')
const newIndex = fs.createWriteStream(indexFile, 'utf-8');
const newCss = fs.createWriteStream(cssFile, 'utf-8');

(async () => {

	await promise.mkdir(newDir, { recursive: true, force: true, });
	const styleFiles = await promise.readdir(stylesPath, { recursive: true, force: true, withFileTypes: true });
	for (data of styleFiles) {
		if (data.isFile() && path.extname(data.name) === '.css') {
			const dataPath = path.join(stylesPath, data.name)
			const readData = await promise.readFile(dataPath, { recursive: true, force: true, })
			newCss.write(`${readData}\n\n`)
		}
	}
	const readTemplate = await promise.readFile(templatePath, { recursive: true, force: true, withFileTypes: true });
	let template = readTemplate.toString();
	const componRead = await promise.readdir(componDir, { recursive: true, force: true, withFileTypes: true })

	for (let data of componRead) {
		const dataPath = path.join(componDir, data.name);
		const dataRead = await promise.readFile(dataPath, { recursive: true, force: true, withFileTypes: true })
		if (data.isFile() && path.extname(data.name) === '.html') {
			if (template.includes(`{{${data.name.split('.')[0]}}}`)) {
				template = template.replace(`{{${data.name.split('.')[0]}}}`, dataRead)
			}
		}
	}
	newIndex.write(template);
	page(assetsPath, assetsCopy)


})()

const page = async (assetsPath, assetsCopy) => {
	await promise.mkdir(assetsCopy, { recursive: true, forse: true })

	fs.readdir(assetsCopy, (err, data) => {
		if (err) throw err
		for (let elem of data) {
			fs.access(path.join(assetsPath, elem), (err) => {
				if (err) {
					fs.rm(path.join(assetsCopy, data), err => {
						if (err) throw err
					})
				}
			})
		}
	});

	fs.readdir(assetsPath, { withFileTypes: true }, (err, data) => {
		if (err) throw err;
		for (let elem of data) {
			if (elem.isFile()) {
				fs.copyFile(path.join(assetsPath, elem.name), path.join(assetsCopy, elem.name), err => {
					if (err) throw err;
				})
			} else if (elem.isDirectory()) {
				page(path.join(assetsPath, elem.name), path.join(assetsCopy, elem.name))
			}
		}
	})
}