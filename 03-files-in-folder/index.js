
const fs = require('fs');
const path = require('path');
fs.readdir(__dirname + '/secret-folder', (error, data) => {
  if (error) console.log(error);

  for (let i = 0; i < data.length; i++) {
    const { name, ext } = path.parse(__dirname + '/secret-folder/' + data[i]);
    fs.stat(__dirname + '/secret-folder/' + data[i], (err, stats) => {
      if (err) console.log(err);
      if (!stats.isDirectory()) {
        console.log('name: ' + name + '; extention: ' + ext + ';  size: ' + stats.size / 1024 + ' kb');
      }
    });
  }
});