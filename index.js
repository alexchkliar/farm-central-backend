require('dotenv').config()
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const saleRoutes = require("./routes/saleRoutes");
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const bodyParser = require('body-parser')
var os = require('os');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

let development = false;
let prefix = ""

if (os.hostname().substring(0,7) === "DESKTOP" ) {
  development = true;
  prefix = "/api"
}

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pomqy.mongodb.net/food_central?retryWrites=true`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// const options = {
//   target: 'http://localhost:5000', // target host
//   changeOrigin: true, // needed for virtual hosted sites
//   ws: true, // proxy websockets
//   pathRewrite: {
//     '^/api': '', // rewrite path
//   },
// };

// // create the proxy (without context)
// const exampleProxy = createProxyMiddleware(options);
// app.use('/api', exampleProxy);

// app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000/^', changeOrigin: true }));

app.use(
  cookieSession({ name: "session", keys: ["temp_key"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(session({
  secret: process.env.COOKIE_PASSWORD,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use(
  cors({
    origin: process.env.URL_BASE_CLIENT,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);

app.use(cookieParser(process.env.COOKIE_PASSWORD))
app.use(`${prefix}/auth`, authRoutes);
app.use(`${prefix}/foods`, foodRoutes);
app.use(`${prefix}/cart`, cartRoutes);
app.use(`${prefix}/favorite`, favoriteRoutes);
app.use(`${prefix}/orders`, orderRoutes);
app.use(`${prefix}/sold`, saleRoutes);
app.use(`${prefix}/user`, userRoutes);

app.listen("5000", () => {
  console.log("Server is running!");
});

// module.exports = { development: development };
