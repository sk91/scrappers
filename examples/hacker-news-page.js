var PageScrapper = require('../lib').PageScrapper;
var hnParser, scrapper;


var HACKER_NEWS_HOME = "https://news.ycombinator.com/";


hnParser = {
  //$ is cheerio (jquery) instance of the parsed page
  parse:function($){
    //get the text of the third link in a page
    return $('a').eq(3).text();
  }
};


scrapper = new PageScrapper({
  url: HACKER_NEWS_HOME,
  parser: hnParser
});


scrapper.get(function(err,parsed){
  console.log("Third link on hacker news page is:", parsed);
});
