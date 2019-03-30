const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");

server.listen(8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine(
  "hbs",
  hbs({
    defaultLayout: "main",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

// app.post("/", (req, res) => {
//   //   if ("geolocation" in navigator) {
//   //     console.log("sending gps");
//   //     navigator.geolocation.getCurrentPosition(function(position) {
//   //       //   sendIt(position.coords.latitude, position.coords.longitude);
//   //       console.log(position.coords.latitude, position.coords.longitude);
//   //       res.send(position.coords.latitude, position.coords.longitude);
//   //     });
//   //   } else {
//   //     console.log("you suck");
//   //   }
// });

io.on("connection", function(socket) {
  socket.emit("FACK", { hello: "friends" });
  socket.on("SCRAP", function(data) {
    console.log(data);
  });

  socket.on("fromClient", function(data) {
    console.log("data from client", data);
    socket.broadcast.emit("FACK", data);
  });
});
