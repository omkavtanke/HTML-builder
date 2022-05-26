// const fs = require('fs');
// const promise = require('fs/promises');
// const path = require('path');
// const assetsPath = path.join(__dirname, 'assets');
// const newDir = path.join(__dirname, 'project-dist');
// const stylesPath = path.join(__dirname, 'styles');
// const assetsCopy = path.join(newDir, 'assets');
// const indexFile = path.join(newDir, 'index.html');
// const cssFile = path.join(newDir, 'style.css');
// const templatePath = path.join(__dirname, 'template.html');
// const componDir = path.join(__dirname, 'components');
// const newCss = fs.createWriteStream(cssFile, 'utf-8');
// const newIndex = fs.createWriteStream(indexFile, 'utf-8');

// (async () => {

// 	await promise.mkdir(newDir, { recursive: true, force: true });

// 	const stylesComponents = await promise.readdir(stylesPath, { recursive: true, force: true, withFileTypes: true });
// 	for (let elem of stylesComponents) {
// 		if (elem.isFile() && path.extname(elem.name) === '.css') {
// 			const pathElem = path.join(stylesPath, elem.name);
// 			const readElem = await promise.readFile(pathElem, { recursive: true, force: true });
// 			newCss.write(`${readElem}\n\n`);
// 		}
// 	}

// 	const template = await promise.readFile(templatePath, { recursive: true, force: true, withFileTypes: true });

// 	let str = template.toString();

// 	const htmlComponents = await promise.readdir(componDir, { recursive: true, force: true, withFileTypes: true });
// 	for (let elem of htmlComponents) {
// 		const pathElem = path.join(componDir, elem.name);
// 		const readElem = await promise.readFile(pathElem, { recursive: true, force: true });
// 		if (elem.isFile() && path.extname(elem.name) === '.html') {
// 			if (str.includes(`{{${elem.name.split('.')[0]}}}`)) {
// 				str = str.replace(`{{${elem.name.split('.')[0]}}}`, readElem);
// 			}
// 		}
// 	}

// 	newIndex.write(str);

// 	copyDir(assetsPath, assetsCopy);
// })();


// const copyDir = async (assetsPath, assetsCopy) => {

// 	await promise.mkdir(assetsCopy, { recursive: true, force: true });

// 	fs.readdir(assetsCopy, (err, data) => {
// 		if (err) throw err;
// 		for (let elem of data) {
// 			fs.access(path.join(assetsPath, elem), (err) => {
// 				if (err) {
// 					fs.rm(path.join(assetsCopy, elem), (err) => {
// 						if (err) throw err;
// 					});
// 				}
// 			});
// 		}
// 	});

// 	fs.readdir(assetsPath, { withFileTypes: true }, (err, data,) => {
// 		if (err) throw err;
// 		for (let el of data) {
// 			if (el.isFile()) {
// 				fs.copyFile(path.join(assetsPath, el.name), path.join(assetsCopy, el.name), (err) => {
// 					if (err) throw err;
// 				});
// 			}
// 			else if (el.isDirectory()) {
// 				copyDir(path.join(assetsPath, el.name), path.join(assetsCopy, el.name));
// 			}
// 		}
// 	});

// };


const fs = require('fs');
const promise = require('fs/promises');
const path = require('path');
const assetsPath = path.join(__dirname, 'assets');
const newDir = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');
const assetsCopy = path.join(newDir, 'assets');
const indexFile = path.join(newDir, 'index.html');
const cssFile = path.join(newDir, 'style.css');
const templatePath = path.join(__dirname, 'template.html');
const componDir = path.join(__dirname, 'components');
const newCss = fs.createWriteStream(cssFile, 'utf-8');
const newIndex = fs.createWriteStream(indexFile, 'utf-8');

(async () => {

	await promise.mkdir(newDir, { recursive: true, force: true });

	const stylesComponents = await promise.readdir(stylesPath, { recursive: true, force: true, withFileTypes: true });
	for (let elem of stylesComponents) {
		if (elem.isFile() && path.extname(elem.name) === '.css') {
			const pathElem = path.join(stylesPath, elem.name);
			const readElem = await promise.readFile(pathElem, { recursive: true, force: true });
			newCss.write(`${readElem}\n\n`);
		}
	}

	const template = await promise.readFile(templatePath, { recursive: true, force: true, withFileTypes: true });

	let str = template.toString();

	const htmlComponents = await promise.readdir(componDir, { recursive: true, force: true, withFileTypes: true });
	for (let elem of htmlComponents) {
		const pathElem = path.join(componDir, elem.name);
		const readElem = await promise.readFile(pathElem, { recursive: true, force: true });
		if (elem.isFile() && path.extname(elem.name) === '.html') {
			if (str.includes(`{{${elem.name.split('.')[0]}}}`)) {
				str = str.replace(`{{${elem.name.split('.')[0]}}}`, readElem);
			}
		}
	}

	newIndex.write(str);

	copyDir(assetsPath, assetsCopy);
})();


const copyDir = async (assetsPath, assetsCopy) => {

	await promise.mkdir(assetsCopy, { recursive: true, force: true });

	fs.readdir(assetsCopy, (err, data) => {
		if (err) throw err;
		for (let elem of data) {
			fs.access(path.join(assetsPath, elem), (err) => {
				if (!err) {
					fs.readdir(assetsCopy, (err, data) => {
						if (err) throw err;
						for (let elem of data) {
							fs.access(path.join(assetsCopy, elem), (err) => {
								if (!err) {
									fs.rm(path.join(assetsCopy, elem),
										{ recursive: true, force: true },
										(err) => {
											if (err) throw err;
										});
								}
							});
						}
					});
				}
			});
		}
	});

	fs.readdir(assetsPath, { withFileTypes: true }, (err, data,) => {
		if (err) throw err;
		for (let el of data) {
			if (el.isFile()) {
				fs.copyFile(path.join(assetsPath, el.name), path.join(assetsCopy, el.name), (err) => {
					if (err) throw err;
				});
			}
			else if (el.isDirectory()) {
				copyDir(path.join(assetsPath, el.name), path.join(assetsCopy, el.name));
			}
		}
	});

};