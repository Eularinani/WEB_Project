require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieSession = require('cookie-session');
var morgan = require('morgan');

var app = express();
app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET,
  // Cookie Options
  maxAge: 6 * 60 * 60 * 1000 // 6 hours
}))

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { index: 'Home.html' }));

const usersRouter = require("./routes/usersRoutes");
const ofertasRouter = require("./routes/ofertasRoutes");
const livrosRouter = require("./routes/livrosRoutes");
const locaisRouter = require("./routes/locaisRoutes");

app.use("/api/users",usersRouter);
app.use("/api/ofertas",ofertasRouter);
app.use("/api/livros",livrosRouter);
app.use("/api/locais",locaisRouter);

// when we don't find anything
app.use((req, res, next) => {
  res.status(404).send({msg:"No resource or page found."});
})

// When we find an error (means it was not treated previously)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send(err);
})

const port = parseInt(process.env.port || '8080');
app.listen(port,function() {
  console.log("Server running at http://localhost:"+port);
});
