var scraperjs = require('scraperjs'),
  _ = require('lodash'),
  utils = require('./utils');


var PageScrapper = module.exports = function(options) {

  this.options = _.extend({
    encoding: "utf-8",
    headers: {
      'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36"
    },
    gzip: true
  }, options);
};



PageScrapper.prototype.get = function(options, done) {
  if (typeof options === "function") {
    done = options;
    options = {};
  }

  var options = _.extend({}, this.options, options);

  options.encoding = 'binary';

  if (!options.url) {
    return done(new Error("No page url specified"));
  }

  if (!options.parser) {
    return done(new Error("No parser specified"));
  }


  var scraper = scraperjs.StaticScraper.create(),
    results = {};

  scraper
    .request(options)
    .onError(errorCallback.bind(this))
    .then(transformCallback.bind(this));


  scraper
    .scrape(this.options.parser.parse.bind(this.options.parser), parsedCallback.bind(this))
    .done(doneCallback.bind(this));


  function transformCallback(a) {
    a.scraper.scraper.body = utils.adjastEncoding(this.options.encoding, a.scraper.scraper.body);
    a.scraper.scraper.loadBody(function() {});
  }

  function parsedCallback(event) {
    results.event = event;
  }

  function errorCallback(err) {
    console.log(err);
    console.log(err.stack);
    results.error = err;
  }

  function doneCallback() {
    return done(results.error, results.event);
  }

  return this;
};