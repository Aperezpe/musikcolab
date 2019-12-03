
// var foo = require('./static/cristovive.json');
const fs = require('fs');

const { User, Album, Song, Song_likes } = require('./models');

const express = require('express');
const path = require('path');
var hbs = require('express-handlebars');
const session = require('express-session');
const bcrypt = require('bcrypt');

app = express();
app.set('port', 3001);

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

// Display artist's album based on 'Album username'
app.get('/album/:username', function (req, res, next) {
  let pageTitle = ""
  Album.findOne({
    where: {
      username: req.params.username
    },
    include: [{ model: Song, as: 'Songs' }]
  }).then(db_data => {

    if (db_data) {
      pageTitle = db_data.artist_name + " | " + db_data.album_name
    }

    res.render("artist_page", {
      data: db_data,
      title: db_data ? pageTitle : ""
    });
  });
});//END route '/album/:username'
//------------------------------------------------------

app.get('/testing', function (req, res, next) {
  // let rawdata = fs.readFileSync('./static/cristovive.json');
  // let student = JSON.parse(rawdata)
  res.render('test')
});


//Log in get and post
app.get('/login', function (req, res, next) {
  res.render("login");
});

app.post('/login', function (req, res, next) {
  res.render("login");

});


//Register get and post page 
app.get('/register', function (req, res, next) {
  res.render("register");

});

app.post('/register', function (req, res, next) {
  res.render("register");

});


// Display all teh users just for testing
app.get('/all_users', function (req, res, next) {
  User.findAll().then(user => {
    res.render("test", { user: user });
  });
});



//test
app.get('/', function (req, res, next) {
  res.render("home");

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

//------------------------------------


