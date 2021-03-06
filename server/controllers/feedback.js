'use strict';

var sendgrid  = require('sendgrid')(
  process.env.SENDGRID_USERNAME,
  process.env.SENDGRID_PASSWORD
);

exports.createFeedback = function(req, res) {
  var feedback = req.body;

  sendgrid.send({
    to: ['stefan@stefanritter.com', 'jeroen.h.s.roosen@gmail.com'],
    from: feedback.email,
    subject: 'BUZZR FEEDBACK from ' + feedback.name,
    text: feedback.message
  }, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });

  res.json({success: true});
};

exports.tweet4me = function(req, res) {
  var t4m = req.body;
  console.log(t4m);

  sendgrid.send({
    to: ['stefan@stefanritter.com'],
    from: t4m.email,
    subject: 'NEW BUZZR TWEET4ME',
    text: t4m.topic + ' for ' + t4m.email + ' with plan: ' + t4m.plan,
  }, function(err, json) {
    if (err) {
      res.json({error: err.toString()});
      return console.error(err);
    }
    console.log(json);
    res.json({success: true});
  });

  sendgrid.send({
    to: [t4m.email],
    from: 'admin@buzzr.io',
    subject: 'Welcome to Buzzr Tweet4me!',
    html: 'Hi there,'+
          '<br>'+
          'and thanks for signing up for Buzzr tweet4me!'+
          '<br><br>'+
          'In just a few hours you will recieve your first tweet suggestions.'+
          '<br><br>'+
          'If you have any questions, or this email was sent to you by mistake, please just hit reply and let us know!'+
          '<br><br>'+
          'Happy tweeting, <br>the Buzzr Team'+
          '<br><br><br>'+
          '<a href="https://www.buzzr.io/unsubscribe/'+t4m.email+'">unsubscribe</a>'
  });
};

exports.unsubscribe = function(req, res) {
  var user = req.params.id;

  sendgrid.send({
    to: ['stefan@stefanritter.com'],
    from: user,
    subject: 'UNSUBSCRIBED BUZZR TWEET4ME',
    text: 'UNSUBSCRIBED: ' + user,
  }, function(err, json) {
    if (err) {
      res.json({error: err.toString()});
      return console.error(err);
    }
    console.log(json);
  });

  res.render('unsubscribe');
};