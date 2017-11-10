var unirest = require("unirest");

var req = unirest("GET", "https://api.themoviedb.org/3/configuration");

req.query({
  "api_key": "bf12ff7db24e0ff1faa7910b7b295c8b"
});

  req.send("{}");

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});