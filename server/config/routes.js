'use strict';

var auth = require('../controllers/auth.js'),
    users = require('../controllers/users.js'),
    pages = require('../controllers/pages.js'),
    feedback = require('../controllers/feedback.js'),
    buzzrs = require('../controllers/buzzrs.js'),
    admin = require('../controllers/admin.js');


module.exports = function (app) {
  /*jshint maxstatements: false */

  // APP
  app.get('/',        pages('index'));
  app.get('/home',    pages('home'));
  app.get('/login',   pages('login'));
  app.get('/join',    pages('join'));
  app.get('/about',   pages('about'));
  app.get('/terms',   pages('terms'));
  app.get('/:id',     pages('main'));

  app.get('/account/readlater', pages('main'));
  app.get('/account/settings',  pages('main'));
  
  // VIEW PARTIALS
  app.get('/partials/*', function (req, res) {
    res.render('../../app/' + req.params);
  });

  // API
  app.get( '/api/buzzrs/:id', buzzrs.getByTopic);
  app.post('/api/users',      users.createUser);
  app.put( '/api/users',      auth.authorize, users.updateUser);
  app.post('/api/feedback',   feedback.createFeedback);

  // AUTH
  app.post('/login',                  auth.authenticateLocal);
  app.get( '/auth/twitter',           auth.authenticateTwitter);
  app.get( '/auth/twitter/callback',  auth.twitterCallback);
  app.post('/logout',                 auth.logout);

  // ADMIN
  app.get( '/admin/users', auth.requiresRole('admin'), admin.get);
  app.get( '/api/users',   auth.requiresRole('admin'), users.getUser);
  
  // 404
  app.all('/api/*', function (req, res) { res.send(404); });
  app.get('*', function (req, res) { res.status(404).redirect('/'); });
};
