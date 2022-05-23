const fs = require('fs');
const promise = require('fs/promises');
const path = require('path');
const filePath = path.join(__dirname, 'files');
const copyFilePath = path.join(__dirname, 'files-copy');

(async function copyDir() {

  await promise.mkdir(copyFilePath, { recursive: true, force: true });

  fs.readdir(copyFilePath, (err, data) => {
    if (err) throw err;
    for (let elem of data) {
      fs.access(path.join(filePath, elem), (err) => {
        if (err) {
          fs.rm(path.join(copyFilePath, elem), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });

  fs.readdir(filePath, { withFileTypes: true }, (err, data,) => {
    if (err) throw err;
    for (let el of data) {
      if (el.isFile()) {
        fs.copyFile(path.join(filePath, el.name), path.join(copyFilePath, el.name), (err) => {
          if (err) throw err;
        });
      }
      else if (el.isDirectory()) {
        copyDir(path.join(filePath, el.name), path.join(copyFilePath, el.name));
      }
    }
  });

})();
