var express = require("express"),
  bodyParser = require("body-parser");
const fetch = require("node-fetch");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
const PORT = process.env.PORT || 5000;
// function encoder(str) {
//   let res = "";
//   let original_str = str.split("");
//   let n = original_str.length;
//   let i = 0;
//   while (i < n) {
//     let k = i + 1;
//     let count = 1;
//     while (k < n && original_str[k] == original_str[i]) {
//       k += 1;
//       count += 1;
//     }
//     if (count == 1) {
//       res += original_str[i];
//     } else {
//       res += original_str[i] + count;
//     }
//     i = k;
//   }
//   return res;
// }
// function decoder(str) {
//   let res = "";
//   let original_str = str.split("");
//   let n = original_str.length;
//   let i = 0;
//   while (i < n) {
//     if (i + 1 < n && !isNaN(parseInt(original_str[i + 1]))) {
//       let num = original_str[i + 1];
//       let k = i + 2;
//       while (k < n && !isNaN(parseInt(original_str[k]))) {
//         num += original_str[k];
//         k += 1;
//       }
//       res += original_str[i].repeat(num);
//       i = k;
//     } else {
//       res += original_str[i];
//       i += 1;
//     }
//   }
//   return res;
// }

dik = {}
pik = {}
for(let i =0;i<63;i++){
    if (i > 52)
        {
          dik[i] = String(i - 53)
        pik[dik[i]] = i
        continue
        }
    if (i > 26)
        {
          dik[i] = String.fromCharCode(64+i-26)
        pik[dik[i]] = i
        continue
        }
    else
        {
          dik[i] = String.fromCharCode(96+i)
        pik[dik[i]] = i
        }
        
}
function encoder(st){
  let ln = st.length;
  let no = 0;
  for(let i=0;i<ln;i++){ 
      no = no*26 + st[i].charCodeAt(0) - 96
  }

  let boom = ''
  while (no > 0){
      boom += dik[no%62 + 1]
      no = Math.floor(no/62);
  }
  return boom
}


function decoder(boom){
  let no = 0;
  let ln = boom.length;
  console.log(pik[boom[2]])
  for(let i = ln-1;i>=0;i--)
  {
      no = no*62 + pik[boom[i]] -1
      
  } 
  result = ''
  while( no > 0)
      {
      result = String.fromCharCode(no%26 + 96) + result
      no = Math.floor(no/26)
      }
  return result
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