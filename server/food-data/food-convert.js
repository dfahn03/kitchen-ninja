let xlsxj = require("xlsx-to-json");
xlsxj({
  input: "real-data.xlsx",
  output: "food.json"
}, function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});