require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const methodOverride = require("method-override");
const db = require("./models");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const xss = require("xss-clean");
const cron = require("node-cron");
const { default: axios } = require("axios");

const connectionParameters = {
  useNewURLParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: true,
};

db.mongoose
  .connect(db.url, connectionParameters)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit();
  });

let corsOptions = {
  origin: [`http://localhost:${process.env.PORT}/`],
  methods: ["GET", "POST", "PUT", "DELETE"],
  crendentials: true,
};

//Dependency utilization
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(
  session({
    secret: "[secret]",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(xss());
app.use(helmet());
app.use(
  mongoSanitize({
    replaceWith: "-",
  })
);

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", `http://localhost:${process.env.REACT_APP_PORT}/`],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
      upgradeInsecureRequests: [],
      objectSrc: ["'none'"],
    },
  })
);

app.use(helmet.crossOriginEmbedderPolicy());
app.use(
  helmet.referrerPolicy({
    options: "no referrer",
  })
);

app.use(helmet.noSniff());
app.use(helmet.xssFilter());

app.use(
  helmet.hsts({
    maxAge: 15552000,
    preload: true,
    includeSubDomains: false,
  })
);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Ventorify Backend Application",
    author: "Duzie Uche-Abba",
  });
  console.log("Signed Cookies: ", req.signedCookies);
});

//Route for displaying session information

app.get("/api/session", (req, res) => {
  res.json(req.session);
});

//Route for setting cookie

let cookieName = `ventorify-user-${Object.freeze(Date.now())}`;
app.get("/api/cookie", (req, res) => {
  res.cookie(cookieName, "1", {
    maxAge: new Date(Date.now() + 900000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  console.log(req.cookies);
  res.send("This site uses cookies!");
});

//Route for displaying cookie

app.get("/api/display-cookie", (req, res) => {
  res.send(
    `<div>
      <h1>This website uses cookies</h1> 
      <h4>Click below to accept</h4> 
      <button id='cookie-btn'>Accept</button> 
      <button>Reject</button>
    </div>`
  );
});

//ROUTE FOR THE WAREHOUSE API ENDPOINT
require("./routes/warehouse.routes")(app);
require("./routes/team.routes")(app);

//ROUTE FOR MESSAGING API ENDPOINT
require("./routes/messages.routes")(app);

//ROUTE FOR PROFILES
require("./routes/profile.routes")(app);

//ROUTE FOR SALES
require("./routes/sales.routes")(app);

//ROUTE FOR DATA BACKUP
require("./routes/backup.routes")(app);

//ROUTE FOR SHELVING
require("./routes/shelf.routes")(app);

//ROUTE FOR AUTH
require("./routes/profile.routes")(app);
app.get("/auth-signup", (req, res) => {
  res.send("You can sign up to Ventorify");
});

//ROUTE FOR REORDER LOGIC
require("./routes/purchase-request.routes")(app);
app.get("/api/reorder", (req, res) => {
  res.send("Reorder is possible");
});

//ROUTE FOR GETTING AGGREGATE GOODS
require("./routes/aggregate-goods")(app);
app.get("/api/aggregate-goods", (req, res) => {
  res.send("We have aggregate warehouse goods");
});

//ROUTE FOR GETTING PRICES
require("./routes/prices.routes")(app);
app.get("/api/price-list", (req, res) => {
  res.send("We have prices list");
});

require("./routes/aggregate-shelf-route")(app);
app.get("/api/aggregate-shelf-items", (req, res) => {
  res.send("We have aggregate shelf items.");
});

//Backup logic - to backup data in a warehouse every 28 days as long as the server runs
cron.schedule("0 0 */28 * *", async () => {
  console.log("Running backup job.");

  try {
    await axios.get(`http://localhost:${process.env.PORT}/api/backup`);
    console.log("Backup successful");
  } catch (err) {
    console.log(err.message);
    console.log(err);
  }
});

//

//Connection settings
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("LISTENING TO PORT: ", PORT);
});

app.use(express.json());
