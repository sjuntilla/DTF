const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");

const events = require('./routes/events.js')

server.listen(8080);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.engine(
  "hbs",
  hbs({
    defaultLayout: "main",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");

io.on("connection", function (socket) {
  socket.emit("FACK", {
    hello: "friends"
  });
  socket.on("SCRAP", function (data) {
    console.log(data);
  });

  socket.on("fromClient", function (data) {
    console.log("data from client", data);
    socket.broadcast.emit("FACK", data);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get('/event', (req, res) => {
  res.render('event', events);
})