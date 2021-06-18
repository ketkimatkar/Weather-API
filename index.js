const http = require("http");
const fs = require("fs");
const requests = require("requests");
const homeFile = fs.readFileSync("index.html", "utf-8");
const replace=(temp,org)=>{
  var change=temp.replace("{%cityname%}",org.name)
  change=change.replace("{%country%}",org.sys.country)
  change=change.replace("{%temperature%}",(org.main.temp-273.15).toFixed(2))
  change=change.replace("{%mintemp%}",(org.main.temp_min-273.15).toFixed(2))
  change=change.replace("{%maxtemp%}",(org.main.temp_max-273.15).toFixed(2))
  return change

}
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=14bd051d30fdd1957de0731f813b7aa1"
    )
      .on("data", (chunk) => {
        const objData = JSON.parse(chunk);
        var rep=replace(homeFile,objData)
        res.end(rep)
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);

        console.log("end");
      });
  }
});
server.listen(8000, "127.0.0.1");
