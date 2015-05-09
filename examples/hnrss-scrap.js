var RssScrapper = require('../lib').RssScrapper;
var hnParser, scrapper;


var HACKER_NEWS_RSS = "http://hnrss.org/ask";


hnParser = {
  //gets a parsed rss articale in an object
  parse:function(article){
    return article.title;
  }
};


scrapper = new RssScrapper({
  url: HACKER_NEWS_RSS,
  parser: hnParser
});


scrapper.get(function(err,parsed){
  //print all articles on an rss
    console.log("Ask:HN titles: \n", parsed);
});
