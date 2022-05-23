const fs = require('fs');
const { stdin, stdout } = process;

const output = fs.createWriteStream('02-write-file/text.txt');

stdout.write('Пожалуйста введите текст - который будет записан в файл text.txt \n');

stdin.on('data', chunk => {
  if (chunk.toString().trim() === 'exit') {
    stdout.write('Текст успешно записан. Всего доброго :)');
    process.exit();
  } else {
    output.write(chunk);

  }
});
stdin.on('error', error => stdout.write('Error', error.message));
process.on('SIGINT', () => {
  stdout.write('Текст успешно записан. Всего доброго :)');
});