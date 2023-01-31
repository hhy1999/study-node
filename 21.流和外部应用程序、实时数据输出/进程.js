const { spawn } = require('child_process');
const child = spawn('pwd');
// 带参数的形式
// const child = spawn('find', ['.', '-type', 'f']);
child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
  });
   
  child.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
  });

 
const find = spawn('find', ['.', '-type', 'f']);
const wc = spawn('wc', ['-l']);

find.stdout.pipe(wc.stdin);

wc.stdout.on('data', (data) => {
    console.log(`Number of files ${data}`);
});



const { exec } = require('child_process');
 
exec('find . -type f | wc -l', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
 
  console.log(`Number of files ${stdout}`);
});