const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
hello
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Production
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/client/build"));
app.use(express.static(__dirname + "/client/public"));


app.listen(`${port}`, () => {
  console.log("Server running at port " + `${port}`);
});

// User Data
const userName = "user";
const passValue = "password";

// Authenticate User
app.post("/auth", async (req, res) => {
  const userInput = req.body.user;
  const passInput = req.body.password;

  if (userName === userInput && passValue === passInput) {
    res.status(200).send({
      message: "Sucessful login",
      data: true,
    });
  } else {
    res.status(200).send({
      error: "Wrong username or password",
    });
  }
});

// Flights Listing
app.get("/list", async (req, res) => {
  fs.readFile("list.json", (err, data) => {
    if (err) throw err;
    let flights = JSON.parse(data);
    res.json(flights);
  });
});

// Flights - POST
app.post("/list", async (req, res) => {
  const data = fs.readFileSync("list.json");
  const myObject = JSON.parse(data);
  const fromInput = req.body.from;
  const toInput = req.body.to;
  const departureTimeInput = req.body.departureTime;
  const landingTimeInput = req.body.landingTime;
  const priceInput = req.body.price;

  let newData = {
    id: uuidv4(),
    from: fromInput,
    to: toInput,
    departureTime: departureTimeInput,
    landingTime: landingTimeInput,
    price: priceInput,
  };

  myObject.push(newData);
  const newData2 = JSON.stringify(myObject);
  fs.writeFile("list.json", newData2, (err) => {
    if (err) throw err;
    console.log("New data added");
  });
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
})

