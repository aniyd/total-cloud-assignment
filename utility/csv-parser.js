let fs = require("fs");
let readline = require("readline");

exports.parser = parseCsvData;

async function parseCsvData(file) {
  return await new Promise(resolve=>{
      processLineByLine(file).then(result=>{
          resolve(result);
      });
  });
}

function processLineByLine(file, cb) {
  return new Promise(resolve => {
    let fileStream = fs.createReadStream(file);
    let result = [];

    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    rl.on("line", l => {
      l = l.split(",");
      result.push(l);
    });

    rl.on("close", () => {
      resolve(result);
    });
  });
}
