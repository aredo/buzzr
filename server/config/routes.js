'use strict';

var auth = require('../controllers/auth.js'),
    users = require('../controllers/users.js'),
    pages = require('../controllers/pages.js'),
    feedback = require('../controllers/feedback.js'),
    buzzrs = require('../controllers/buzzrs.js');


module.exports = function (app) {
  // APP
  app.get('/',        pages('index'));
  app.get('/home',    pages('home'));
  app.get('/login',   pages('login'));
  app.get('/join',    pages('join'));
  app.get('/about',   pages('about'));
  app.get('/terms',   pages('terms'));
  app.get('/later',   pages('index'));
  app.get('/:id',     pages('main'));

  app.get('/account/settings', pages('settings'));
  
  // VIEW PARTIALS
  app.get('/partials/*', function (req, res) {
    res.render('../../app/' + req.params);
  });

  // API
  app.get( '/api/buzzrs/:id', buzzrs.getByTopic);
  app.get( '/api/users',      auth.requiresRole('admin'), users.getUser);
  app.post('/api/users',      users.createUser);
  app.put( '/api/users',      auth.authorize, users.updateUser);
  app.post('/api/feedback',   feedback.createFeedback);

  // AUTH
  app.post('/login',                  auth.authenticateLocal);
  app.get( '/auth/twitter',           auth.authenticateTwitter);
  app.get( '/auth/twitter/callback',  auth.twitterCallback);
  app.post('/logout',                 auth.logout);
  
  // 404
  app.all('/api/*', function (req, res) { res.send(404); });
  app.get('*', function (req, res) { res.status(404).redirect('/'); });
};
