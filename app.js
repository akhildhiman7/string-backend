var express = require("express"),
  bodyParser = require("body-parser");
const fetch = require("node-fetch");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
const PORT = process.env.PORT || 5000;
function encoder(str) {
  let res = "";
  let original_str = str.split("");
  let n = original_str.length;
  let i = 0;
  while (i < n) {
    let k = i + 1;
    let count = 1;
    while (k < n && original_str[k] == original_str[i]) {
      k += 1;
      count += 1;
    }
    if (count == 1) {
      res += original_str[i];
    } else {
      res += original_str[i] + count;
    }
    i = k;
  }
  return res;
}
function decoder(str) {
  let res = "";
  let original_str = str.split("");
  let n = original_str.length;
  let i = 0;
  while (i < n) {
    if (i + 1 < n && !isNaN(parseInt(original_str[i + 1]))) {
      let num = original_str[i + 1];
      let k = i + 2;
      while (k < n && !isNaN(parseInt(original_str[k]))) {
        num += original_str[k];
        k += 1;
      }
      res += original_str[i].repeat(num);
      i = k;
    } else {
      res += original_str[i];
      i += 1;
    }
  }
  return res;
}
app.get("/", (req, res) => {
  res.send(200);
});
app.post("/encode", (req, res) => {
  const str = req.body.encode;
  encoded_str = encoder(str);
  res.send(encoded_str);
});
app.post("/decode", (req, res) => {
  const str = req.body.decode;
  decoded_str = decoder(str);
  res.send(decoded_str);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));