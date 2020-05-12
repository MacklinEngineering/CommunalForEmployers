module.exports = function (app, passport, db) {

  const ObjectId = require('mongodb').ObjectID
  const multer = require('multer')

  // Image Upload Code =========================================================================
  // Make a Var for the storing of imgs => multer.(multer Method?)
  var storage = multer.diskStorage({
      destination: (req, file, cb) => {    //What is cb? ... Maybe filepath
        cb(null, 'public/images/uploads')
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + ".png")  // cb filepath and timestamp with date and filetype
      }

  });
  // alert("Image successfully uploaded")
  var upload = multer({storage: storage}); //upload img to destination 'storage'


  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });
  app.get('/index', function (req, res) {
    res.render('index.ejs');
  });

  app.get('/post-job', function (req, res) {
    res.render('post-job.ejs');
  })

  app.get('/contact', function (req, res) {
    res.render('contact.ejs');
  })

  app.get('/about', function (req, res) {
    res.render('about.ejs');
  })

  app.get('/dashboard', function (req, res) {
      res.render('dashboard.ejs');
  })

  // var value = req.body.itemValue
  // db.collection('Listings').find({
  //   itemValue: `{$value}`
  // }).toArray((err, result) => {  //Find all posts then turn to array
  //   if (err) return console.log(err)
  // console.log(result)



  app.get('/job-listings', function (req, res) {
    db.collection('Listings').find().toArray((err, result) => {  //Find all posts then turn to array
    //   if (err) return console.log(err)
    // console.log(result)
      res.render('job-listings.ejs',{
        Listings: result
      })
    })
  })

  app.get('/searchItems', function (req, res) {

    var q = req.query.q; //Eg: q = "Masks"
    // console.log(req.query)
      db.collection('Listings').find({
        itemTitle: q
      }).toArray((err, result) => {
        res.render('searchItems.ejs',{
            Listings: result
        })
    })
	// FULL TEXT SEARCH USING $text

	// db.collection('Listings').find({
	// 	$itemTitle: q
  //
	// }, {
	// 	_id: 0,
	// 	__v: 0
	// }, function (err, data) {
	// 	res.json(data);

	// });

	// PARTIAL TEXT SEARCH USING REGEX

	// db.collection('Listings').find({
	// 	Listings: {
	// 		$regex: new RegExp(q)
	// 	}
	// }, {
	// 	_id: 0,
	// 	__v: 0
	// }, function (err, data) {
	// 	res.json(data);
  //   res.render('searchItems.ejs');
	// }).limit(20);

});


  app.get('/job-single', function (req, res) {
    const id = req.query.id
    console.log("job id:", id)

    db.collection('Listings').findOne({
      _id: ObjectId(id)
    },
    (err, result) => {  //Find all posts then turn to array

    res.render('job-single.ejs', {
        Listing: result
      });
    })
  })

  app.get('/services', function (req, res) {
    res.render('services.ejs');
  })

  app.get('/testimonials', function (req, res) {
    res.render('testimonials.ejs');
  })


  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        messages: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // message board routes ===============================================================

  //look to line 135 in post-job EJS for client code post item listings endpoint: method=post, action=/listings
  app.post('/listings', isLoggedIn, upload.single("file-to-upload"), (req, res) => {
    console.log(req.file.filename)
    let uid = ObjectId(req.session.passport.user)
    db.collection('Listings').save({posterID: uid, image: 'images/uploads/' + req.file.filename, email: req.body.Email,
      itemTitle: req.body.ItemTitle, itemlocation: req.body.ItemLocation, itemvalue: req.body.ItemValue, itemdescription: req.body.ItemDescription, Date: new Date()}, (err, result) => {
          if (err) return res.send(err)
          // res.send(result)
          res.redirect('/job-listings');
          // res.render('post-job.ejs')
    })

  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
