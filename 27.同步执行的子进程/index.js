// var ex = require("child_process").execFileSync;
// var ex = require("child_process").spawnSync;

// var stdout = ex("ping",["81.71.15.170"]).toString();


var ex = require("child_process").execSync;

var stdout = ex("dir").toString();
console.log(stdout);

