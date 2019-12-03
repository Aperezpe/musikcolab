// import the models
// const { User } = require('./models');
const { User, Album, Song, Song_likes } = require('./models');

const express = require('express');
const path = require('path');
var hbs = require('express-handlebars');
const session = require('express-session');
const bcrypt = require('bcrypt');

app = express();
app.set('port', 3002);

// setup handlebars and the view engine for res.render calls
// (more standard to use an extension like 'hbs' rather than
//  'html', but the Universiry server doesn't like other extensions)
app.set('view engine', 'html');
app.engine('html', hbs({
  extname: 'html',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

// setup body parsing for form data
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up session (in-memory storage by default)
app.use(session({ secret: "This is a big long secret lama string." }));

// setup static file service
app.use(express.static(path.join(__dirname, 'static')));



//Log in get and post
app.get('/login', function (req, res, next) {

  res.render("login");

});

app.post('/login', function (req, res, next) {
  let errors = []
  if (req.body.username.length == 0 || req.body.pass.length == 0) {
    errors.push({ msg: "Uername or Password Incorect!!!" })
    res.render("login", { errors });
  }
  else {
    User.findOne({ where: { username: req.body.username } }).then(user => {
      if (user == null) {
        errors.push({ msg: "Username or Password Incorect!!!" })
        res.render("login", { errors });
      }
      else {
        bcrypt.compare(req.body.pass, user.has_password).then(result => {

          if (result) {
            req.session.user = user;
            res.redirect("/");
          }

          else {
            errors.push({ msg: "Username or Password Incorect!!!" })
            res.render("login", { errors });
          }
        })
      }
    });
  }

});


//Register get and post page 
app.get('/register', function (req, res, next) {
  res.render("register");

});

app.post('/register', function (req, res, next) {
  let errors = []
  if (req.body.username.length == 0) {
    errors.push({ msg: "Username not provide" })
  }
  if (req.body.pass.length < 4) {
    errors.push({ msg: "Password conot be less that 4 characters" })
  }
  User.findOne({ where: { username: req.body.username } }).then(user => {
    n_user = user;
    if (n_user == null) {
      if (errors.length == 0) {

        User.create({
          username: req.body.username,
          artist_name: req.body.artistname,
          has_password: bcrypt.hashSync(req.body.pass, 10),
          email: req.body.email,
          admin: false


        });
      }
      req.session.user = user;
      res.redirect("/");
    }
    else if (req.body.username == n_user.username) {

      errors.push({ msg: "Username Not Avilable!!!" })

    }
    else {
      let us = req.body.username;
      res.render("register", { errors, us });
    }
  })
  //res.render("register");

});


// Display all teh users just for testing
app.get('/all_users', function (req, res, next) {
  User.findAll().then(user => {
    res.render("test", { user: user });
  });
});


//test
app.get('/', function (req, res, next) {
  res.render("hola");

});

app.post('/where', function (req, res, next) {

  if (req.body.b == "login")
    res.redirect("/login");

  else if (req.body.b == "users")
    res.redirect("/all_users");

  else if (req.body.b == "reg")
    res.redirect("/register");



});

var server = app.listen(app.get('port'), function () {
  console.log("Server started...")
});



