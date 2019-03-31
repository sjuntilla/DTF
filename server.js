const app = require("express")();
const express = require('express');
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
<<<<<<< HEAD
const fs = require('fs');
=======
const eventRoute = require("./routes/events");
>>>>>>> 7340185a9d11e96dfb8c73c144fd049828f22104

const events = require("./routes/events.js");

server.listen(8080);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.engine(
  "hbs",
  hbs({
    defaultLayout: "main",
    extname: "hbs"
  })
);
app.use("/events", eventRoute);
app.set("view engine", "hbs");

io.on("connection", function(socket) {
  socket.emit("FACK", {
    hello: "friends"
  });
  socket.on("SCRAP", function(data) {
    console.log(data);
  });

  socket.on("fromClient", function(data) {
    console.log("data from client", data);
    socket.broadcast.emit("FACK", data);
  });
});

app.get("/public/styles.css", (req, res) => {
  fs.readFile("./public/styles.css", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.write(data.toString());
    res.end();
  });
});
app.get("/", (req, res) => {
  res.render("index");
});
