var request = require('request'),
  _ = require('lodash'),
  feedparser = require('ortoo-feedparser'),
  utils = require('./utils');



require('noop');


var RssScrapper = module.exports = function(options) {

  this.dateformat = options.dateformat || null;

  this.options = _.extend({
    encoding: "utf-8",
    headers: {
      'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36"
    },
    gzip: true
  }, options);
};



RssScrapper.prototype._load = function(options, done) {

  request(options, requestCallback.bind(this));

  function requestCallback(err, response, body) {
    if (err) {
      return done(new Error(err));
    }
    body = utils.adjastEncoding(this.options.encoding, body);
    return done(null, body);
  }

};

RssScrapper.prototype._parseStream = function(data, done) {
  var results = [],
    error = null;

  feedparser.parseString(data, {
    dateformat : this.dateformat
  })
    .on('article', onArticle.bind(this))
    .on('error', onError.bind(this))
    .on('end', onEnd.bind(this));

  function onArticle(item) {
    results.push(this.options.parser.parse(item));
  }

  function onError(err) {
    error = err;
  }

  function onEnd() {
    return done(error, results);
  }
};

RssScrapper.prototype.get = function(options, done) {

  if (typeof options === "function") {
    done = options;
    options = {};
  }

  options = _.extend({}, this.options, options);

  options.encoding = 'binary';

  if (!options.url) {
    return done(new Error("No page url specified"));
  }

  if (!options.parser) {
    return done(new Error("No parser specified"));
  }


  this._load(options, loadCallback.bind(this));

  function loadCallback(err, data) {
    if (err) {
      return done(err);
    }

    return this._parseStream(data, parsedCallback.bind(this));
  }

  function parsedCallback(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  }


  return this;
};
