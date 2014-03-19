'use strict';

var StringArray = require('mongoose').model('StringArray'),
    LinkArray = require('mongoose').model('LinkArray');

var titleErrorLinks,
    socketErrorLinks,
    newLinks,
    topics,
    newTopics;

function getAll(cb) {
  LinkArray.findOne({name: 'socketErrorLinks'}, function(err, obj) {
    if (err) { throw err; }
    socketErrorLinks = obj;

    LinkArray.findOne({name: 'titleErrorLinks'}, function(err, obj) {
      if (err) { throw err; }
      titleErrorLinks = obj;

      LinkArray.findOne({name: 'newLinks'}, function(err, obj) {
        if (err) { throw err; }
        newLinks = obj;

        StringArray.findOne({name: 'topics'}, function(err, obj) {
          if (err) { throw err; }
          topics = obj;

          StringArray.findOne({name: 'newTopics'}, function(err, obj) {
            if (err) { throw err; }
            newTopics = obj;

            if (cb) {cb();}
          });
        });
      });
    });
  });
}
getAll();


exports.socketErrorLinks = {
  push: function(data) {
    socketErrorLinks.pushUniq(data);
  },
  pop: function() {
    return socketErrorLinks.pop();
  }
};

exports.newLinks = {
  push: function(data) {
    newLinks.push(data);
  },
  pop: function() {
    return newLinks.pop();
  }
};

exports.titleErrorLinks = {
  push: function(data) {
    titleErrorLinks.pushUniq(data);
  }
};

exports.newTopics = {
  push: function(data) {
    newTopics.pushUniq(data);
  },
  get: function() {
    return newTopics.array;
  }
};

exports.topics = {
  push: function(data) {
    topics.push(data);
  },
  get: function() {
    return topics.array;
  }
};

exports.update = function(cb) {
  getAll(cb);
};
