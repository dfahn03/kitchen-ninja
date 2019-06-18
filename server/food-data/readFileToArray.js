let fs = require('fs')

let data = fs.readFileSync("output.json")
var food = JSON.parse(data.toString());

console.log(food)


