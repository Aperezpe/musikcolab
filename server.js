// import the models
// const { User } = require('./models');
// 'use strict'

const { User, Album, Song, Song_likes } = require('./models');

const express = require('express');
const path = require('path');
var hbs = require('express-handlebars');
const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require('fs');
var mp3Duration = require('mp3-duration');
//var jquery = require('jquery')

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

app.get('/create_session', function (req, res, next) {

  req.session.curUser = {}
  req.session.curUser["id"] = 1
  console.log("user_id:" + req.session.curUser["id"])

  User.findOne({
    where: {
      id: req.session.curUser["id"]
    }
  }).then(user => {

    if (user.profile_pic == "" || user.profile_pic == null) {
      user.profile_pic = "https://hickorycomo.com/sites/default/files/styles/large/public/profile.png?itok=nE_QmzgJ"
    }
    res.redirect('profile')
  });


});

/// Get profile of logged in user
app.get('/profile', function (req, res) {

  if (!req.session.curUser["id"]) {
    res.send("No user")
    return;
  }

  var user_id = req.session.curUser["id"]

  if (!user_id) {
    res.render('profile')
    return;
  }


  User.findOne({
    where: {
      id: user_id
    }
  }).then(user => {

    if (user.profile_pic == "" || user.profile_pic == null) {
      user.profile_pic = "https://hickorycomo.com/sites/default/files/styles/large/public/profile.png?itok=nE_QmzgJ"
    }
    res.render('profile', { success: req.query.success, profile_pic: user.profile_pic, artist_name: user.artist_name, username: user.name, email: user.email, about: user.about, id: user.id })
  });

});

//https://images.ctfassets.net/usf1vwtuqyxm/3SQ3X2km8wkQIsQWa02yOY/8801d7055a3e99dae8e60f54bb4b1db8/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?w=914

/////UPDATE IMAGE URL ///////
app.post('/update_profile_img', function (req, res, next) {

  if (!req.session.curUser["id"]) {
    res.send("No user")
    return;
  }

  var user_id = req.session.curUser["id"]
  var new_image_url = req.body.image_url

  User.findOne({
    where: { id: user_id }
  }).then(function (user) {
    user.update({ profile_pic: new_image_url }).then(function (user) {

      if (user.profile_pic == new_image_url) {
        res.redirect('profile?success=true')
      } else {
        res.session.errors = []
        res.session.errors.push("There was an error uploading the image")
        res.redirect('profile')

      }
    })

  })


});


////THIS WILL BE DONE ONLY ONCE/////
app.get('/update_json_songs', function (req, res) {
  if (!req.session.curUser["id"]) {
    res.send("User needs to logg in")
    return;
  }
  var user_id = req.session.curUser["id"]

  User.findOne({
    where: {
      id: user_id
    },
    include: [
      { model: Album, as: 'Albums', include: { model: Song, as: 'Songs' } }
    ],

  }).then(user => {

    var album = user.Albums[0]
    var s = user.Albums[0]["Songs"]

    var songs = []
    for (var i = 0; i < s.length; ++i) {
      songs.push({ "url": s[i]["song_url"] })
    }
    console.log(songs)

    let data = JSON.stringify(songs, null, 2);
    fs.writeFileSync(`static/album/${album.username}.json`, data);

    res.send(JSON.stringify(songs, null, 4))

  })


})


app.get('/profile-album', function (req, res) {
  mp3Duration('https://musikcolab.s3.amazonaws.com/01_Heroe+(feat.+Sesi).mp3', function (err, duration) {
    if (err) return console.log(err.message);
    console.log('Your file is ' + duration + ' minutes long');
  });

  if (!req.session.curUser["id"]) {
    res.send("User needs to logg in")
    return;
  }
  var user_id = req.session.curUser["id"]



  User.findOne({
    where: {
      id: user_id
    },
    include: [
      { model: Album, as: 'Albums', include: { model: Song, as: 'Songs' } }
    ],

  }).then(user => {

    var album = user.Albums[0]
    var songs = user.Albums[0]["Songs"]

    //Every time I get the songs, update json file

    if (songs.length > 0) {

      req.session.songs = []
      for (var i = 0; i < songs.length; ++i)
        req.session.songs.push(songs[i])
      console.log(req.session.songs.length)
      // console.log(JSON.stringify(req.session.songs, null, 4))

    }

    res.render('profile-album', { user: user, album: album, songs: songs, success: req.query.success })

    // req.session.success = false
  })


  //res.render('profile-album')

});


/////CRUD profile album////
app.post('/profile-album', function (req, res) {

  if (!req.session.curUser["id"]) {
    res.send("User needs to logg in")
    return;
  }

  //console.log(req.body.add_btn)
  if (req.body.add_btn != undefined) {
    console.log("Add button")
    //Add song to database and jsonFile and redirect to profile-album
    //No need to add it to the session since that's always added in profile-album GET
    addSong()

  } else if (req.body.edit_btn != undefined) {
    console.log("Edit button")
  } else if (req.body.delete_btn != undefined) {
    console.log("Delete button")
  } else {
    console.log("Save button")
  }

  res.send("cool!")


});

// UPDATE ALBUM COVER
app.post('/update_album_cover', function (req, res, next) {

  if (!req.session.curUser["id"]) {
    res.send("No user")
    return;
  }

  var user_id = req.session.curUser["id"]
  var new_image_url = req.body.image_url

  console.log(req.body.image_url)

  //https://musikcolab.s3.amazonaws.com/img_covers/gabe-album.jpg

  Album.findOne({
    where: {
      user_id: user_id
    }
  })
    .then(album => {
      album.update({ album_cover: new_image_url })
        .then(function (album) {
          if (album.album_cover == new_image_url) {
            //res.session.success = true

            res.redirect('profile-album?success=true')

            //res.send('profile-album')
          } else {
            res.session.errors = []
            res.session.errors.push("There was an error uploading the image")
            console.log("there was an error uploading the image!! DDD:")
            res.redirect('profile-album')

          }
        })
    })



});

function addSong() {

  console.log("adding song...")
  var user_id = req.session.curUser["id"]

  Album.findOne({
    where: {user_id: user_id},
    include: [{model: Song, as: "Songs"}]
  })
}


/////UPLOAD NEW SONG
app.post("/upload_song/:album_id", function(req,res){

  if (!req.session.curUser["id"]) {
    res.send("No user")
    return;
  }

  var album_id = req.params.album_id

  

  // Song.create({
  //   album_id: album_id,
  //   duration
  // })

  var user_id = req.session.curUser["id"]
  
  
})

var server = app.listen(app.get('port'), function () {
  console.log("Server started...")
});





