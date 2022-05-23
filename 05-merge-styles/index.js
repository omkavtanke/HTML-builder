
const fs = require('fs');
const promise = require('fs/promises');
const path = require('path');
const pathFrom = path.join(__dirname, 'styles');
const pathTo = path.join(__dirname, 'project-dist', 'bundle.css');
const newStyle = fs.createWriteStream(pathTo, 'utf-8');
(async () => {

  const styles = await promise.readdir(pathFrom, { recursive: true, force: true, withFileTypes: true });
  for (let elem of styles) {
    if (elem.isFile() && path.extname(elem.name) === '.css') {
      const stylesElem = path.join(pathFrom, elem.name);
      const read = await promise.readFile(stylesElem, { recursive: true, force: true });
      newStyle.write(`${read}\n`);
    }
  }

})();