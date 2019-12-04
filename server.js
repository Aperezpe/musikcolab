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
  // res.end(req.params.username)
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
//===============================================================

app.get('/testing', function (req, res, next) {
  // let rawdata = fs.readFileSync('./static/cristovive.json');
  // let student = JSON.parse(rawdata)
  res.render('test')
});

//ARMANDOS-----------------------------------------------------
//Log in get and post
app.get('/login', function (req, res, next) {
  if (req.session.user) {
    if (req.session.user.admin == 0 || req.session.user.admin == 1) {
      res.redirect("/")
    }
  }
  else
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
  if (req.session.user) {
    if (req.session.user.admin == 0 || req.session.user.admin == 1) {
      res.redirect("/")
    }
  }
  else
    res.render("register");

});

//REGISTER USER
app.post('/register', function (req, res, next) {
  var errors = []
  var isTaken = false;
  var matched = false;
  // res.send(req.body.password.trim())
  User.findAll({                     //Db query: check if username exists
    where: {
      username: req.body.username.trim()
    }
  }).then(user => {
    if (user.length > 0) {
      isTaken = true;
    }
    if (isTaken) { //if user isTaken, push error to array
      errors.push("Username is already taken");
    }
    //if username is blank, push error to array
    if (req.body.username.trim().length === 0) {
      errors.push('Username cannot be blank');
    }
    //if password length < 4, push error
    if (req.body.password.length < 4) {
      errors.push("Password must be at least 4 characters long");
    }
    //if errors exist
    if (errors.length > 0) {
      res.render('register', {
        errors: errors,
        propagate_username: req.body.username.trim()
      });
      return;
    } else {
      //bcrypt password hashing function 
      console.log('erwer')

      console.log('test')
      // req.session.hash = hash;
      // req.session.user = req.body.username.trim(),
      //CREATE new user,
      //THEN redirect user to 'home' view
      User.create({
        artist_name: req.body.artistname,
        username: req.body.username,
        email: req.body.email,
        has_password: bcrypt.hashSync(req.body.password, 10),//bcrypt.hashSync(req.body.password, 10),
        admin: false
      }).then(newUser => {
        req.session.curUser = {}
        req.session.curUser["username"] = newUser.username
        res.redirect("/profile");
      });//END create-user ;
    }
  });
  //END create-user function
});//END bcrypt.hash function
//END IF-ELSE (If errors exist, Else: no errors )
//D Armando's
//==============================================================

//ABRAHAMS------------------------------------------------------
app.get('/create_session', function (req, res, next) {

  req.session.curUser = {}
  req.session.curUser["id"] = 2
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

  successMsg = ""

  if (!req.session.curUser["username"]) {
    res.send("No user")
    return;
  }

  var username = req.session.curUser["username"]

  if (!username) {
    res.render('profile')
    return;
  }

  if (req.query.success == "info") {
    successMsg = "You have updated your profile information"
  } else if (req.query.success == "true") {
    successMsg = "You have updated your profile picture"
  }


  User.findOne({
    where: {
      username: username
    }
  }).then(user => {

    if (user.profile_pic == "" || user.profile_pic == null) {
      user.profile_pic = "https://hickorycomo.com/sites/default/files/styles/large/public/profile.png?itok=nE_QmzgJ"
    }
    res.render('profile', {
      modal_route: "update_profile_img",
      profActive: "active",
      successMsg: successMsg,
      profile_pic: user.profile_pic,
      artist_name: user.artist_name,
      username: user.name,
      email: user.email,
      about: user.about,
      id: user.id
    })
  });

});

//Udate profile information
app.post('/profile/:id', function (req, res) {

  var user_id = req.params.id
  var new_artist_name = req.body.artist_name
  var new_email = req.body.email
  var new_about = req.body.about

  User.findOne({
    where: { id: user_id }
  })
    .then(function (user) {

      user.update({
        artist_name: new_artist_name,
        email: new_email,
        about: new_about
      })
        .then(user => {
          console.log(JSON.stringify(user, null, 4))
        })

    })

  console.log("about: " + req.body.about + " for user " + user_id)
  res.redirect('/profile?success=info')
})

/////UPDATE IMAGE URL ///////
app.post('/update_profile_img', function (req, res, next) {

  if (!req.session.curUser["username"]) {
    res.send("No user")
    return;
  }

  var username = req.session.curUser["username"]
  var new_image_url = req.body.image_url

  User.findOne({
    where: { username: username }
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
  if (!req.session.curUser["username"]) {
    res.send("User needs to logg in")
    return;
  }
  var username = req.session.curUser["username"]

  User.findOne({
    where: {
      username: username
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




// UPDATE ALBUM COVER
app.post('/update_album_cover', function (req, res, next) {

  if (!req.session.curUser["username"]) {
    res.send("No user")
    return;
  }

  var username = req.session.curUser["username"]
  var new_image_url = req.body.image_url

  console.log(req.body.image_url)

  //https://musikcolab.s3.amazonaws.com/img_covers/gabe-album.jpg

  Album.findOne({
    where: {
      username: username
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


/////CRUD profile album////
//Update album information
app.post('/profile-album/:id', function (req, res) {

  if (!req.session.curUser["username"]) {
    res.send("User needs to logg in")
    return;
  }

  var username = req.session.curUser["username"]
  var album_id = req.params.id

  // req.session.song_list.push({
  //   "album_id": album_id,
  //   "song_title": req.body.song_title,
  //   "duration": "0:00",
  //   "song_url": req.body.song_url,
  // })


  //console.log(req.body.add_btn)
  if (req.body.edit_btn != undefined) {
    console.log("Edit button")
  } else if (req.body.delete_btn != undefined) {
    console.log("Delete button")
  } else {
    console.log("HERE MODAFUKAR")
    // console.log("Save button")

    // console.log(req.session.song_list)
    // Song.bulkCreate(req.session.song_list, { returning: true }).then(function () {

    // })

    Album.findAll({
      where: { id: album_id }
    }).then(album => {

      album[0].update({
        artist_name: req.body.artist_name,
        album_name: req.body.album_name,
        username: req.body.username,
        genre: req.body.genre
      }).then(function (album) {
        console.log(JSON.stringify(album, null, 4))
        console.log("si jalo!!")
        //res.redirect('/profile-album')
      })

      res.redirect('/profile-album?success=album')
      // album.update({
      //   artist_name: req.body.artist_name,
      //   album_name: req.body.album_name,
      //   username: req.body.username,
      //   genre: req.body.genre
      // }).then(function (album) {
      //   console.log(JSON.stringify(album, null, 4))
      //   res.redirect('/profile-album')
      // })
    })

    // if(album_promise&&song_promise){
    //   res.redirect("/profile-album")
    //   //return;
    // }


  }


});

app.get('/profile-album', function (req, res) {
  // mp3Duration('https://musikcolab.s3.amazonaws.com/01_Heroe+(feat.+Sesi).mp3', function (err, duration) {
  //   if (err) return console.log(err.message);
  //   console.log('Your file is ' + duration + ' minutes long');
  // });
  successMsg = ""
  albumSuccessMsg = ""
  anchor = ""
  console.log("success: " + req.query.success)

  if (!req.session.curUser["username"]) {
    res.send("User needs to logg in")
    return;
  }

  if (req.query.success != "song") {
    if (req.session.song_list != undefined) {
      console.log("innitializing session again")
      req.session.song_list = []
    }
  }

  if (req.query.success == "song") {
    successMsg = "The song was successfully added"
    anchor = "anchor-songs"
  } else if (req.query.albumSuccess == "album") {
    albumSuccessMsg = "Your album was successfully updated"
  }

  var username = req.session.curUser["username"]


  User.findOne({
    where: {
      username: username
    },
    include: [
      { model: Album, as: 'Albums', include: { model: Song, as: 'Songs' } }
    ],

  }).then(user => {

    console.log(JSON.stringify(user, null, 4))

    var album = user.Albums[0]
    var songs = user.Albums[0]["Songs"]

    if (album.album_cover == null) {
      album.album_cover = "http://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png";
    }

    //Every time I get the songs, update json file

    if (songs.length > 0) {

      req.session.songs = []
      for (var i = 0; i < songs.length; ++i)
        req.session.songs.push(songs[i])
      console.log(req.session.songs.length)
      // console.log(JSON.stringify(req.session.songs, null, 4))

    }

    res.render('profile-album', {
      modal_route: "update_album_cover",
      anchor: anchor,
      albumActive: "active",
      user: user,
      album: album,
      songs: songs,
      successMsg: successMsg,
      albumSuccessMsg: albumSuccessMsg,
      songs_list: req.session.song_list
    })

  })

});




/////UPLOAD NEW SONG
app.post("/upload_song/:album_id", function (req, res) {

  if (!req.session.curUser["username"]) {
    res.send("No user")
    return;
  }

  var username = req.session.curUser["username"]
  var album_id = req.params.album_id

  if (!req.session.song_list) {
    req.session.song_list = []
    console.log("this thing don't exist yet")
  }

  req.session.song_list.push({
    "album_id": album_id,
    "song_title": req.body.song_title,
    "duration": "0:00",
    "song_url": req.body.song_url,
  })

  res.redirect('/profile-album?albumSuccess=song')

  console.log(req.session.song_list)


  // req.session.song_list = [{}]


  // Song.create({
  //   song_title: req.body.song_title,
  //   album_id: album_id,
  //   duration: "0:00",
  //   song_url: req.body.song_url,
  //   like_count: 0

  // })
  // .then(newSong=>{
  //   //console.log()
  //   res.send(JSON.stringify(newSong, null, 4))
  // })






})



var server = app.listen(app.get('port'), function () {
  console.log("Server started...")
});

//------------------------------------


