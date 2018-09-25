// app/routes.js

module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================

  app.get('/', function (req, res) {
    res.render('index.hbs'); // load the index.hbs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================

  // SHOW the login form
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.hbs', { message: req.flash('loginMessage') })
  });

  // process the login form
  // app.post('/login', do all our passport stuff here);

  // =====================================
  // SIGNUP ==============================
  // =====================================

  // process the signup form
  // app.post('signup', do all our passport stuff here);


  // =====================================
  // PROFILE SECTION =====================
  // =====================================

  // We will want this protected so you have to be logged in to visit
  // we will use this route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.hbs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};


// Route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  else {
    res.redirect('/');
  }
}