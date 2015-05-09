Scrappers.js
============

A set of utility classes for node.js to make scrapping the web easier.

There is support for custom browser headers, encodings and compression.

Scrapper options
================

#### url
The url of the target page
#### parser
An object with a public "parse" method.

######Example:
````javascript
var hnParser = {
  //$ is cheerio (jquery) instance of the parsed page
  parse:function($){
    //get the text of the third link in a page
    return $('a').eq(3).text();
  }
};
````

####encoding

The encoding of the target html page. This parameter is optional and defaults to ``"utf-8"``

####headers

An object containing key-value pairs of headers. Defaults to:

````javascript
{
  'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36"
}

````

####gzip
A flag to enable disable the gzip compressing. By default it is enabled (set to ``true``.

You will probably  not want to disable this, if the page is not compressed, it will still be parsed correctly (see [request](https://github.com/request/request))




####Options can be passed on instantiation:
````javascript
var scrapper = new PageScrapper({
  url: HACKER_NEWS_HOME,
  parser: hnParser
});

````

####Or on the ``get`` request:
````javascript
scrappers.get(options, done);
````

Options passed in the ``get`` request, will extend the options passed on instantiation for the duration of the request.

Page
=====

A base class for scrapping a web page.

####Example:

Get the third link from hacker news home page.

#####Import scrapper object
```javascript

var PageScrapper = require('scrappers').PageScrapper;

````

##### Write a parser

The parse functin will rescive a [cheerio](https://github.com/cheeriojs/cheerio) instance  with hn html.
````javascript
var hnParser = {
  //$ is cheerio (jquery) instance of the parsed page
  parse:function($){
    //get the text of the third link in a page
    return $('a').eq(3).text();
  }
};

````
#####Instantiate a scraper object

````javascript

var HACKER_NEWS_HOME = "https://news.ycombinator.com/";
var scrapper = new PageScrapper({
  url: HACKER_NEWS_HOME,
  parser: hnParser
});
````

#####Parse!

````javascript

scrapper.get(function(err,parsed){
  console.log('Third link on hacker news page is:", parsed);
});

````

##### Result:
```
Third link on hacker news page is: comments
```

Rss
===

A base class for scrapping an rss feed.

####Example:

Get a list of article titles for ask hacker news rss.

#####Import scrapper object
```javascript
var RssScrapper = require('scrappers').RssScrapper;

````

##### Write a parser

The parse functin will rescive a javascript object representing a single rss article.

````javascript
var hnParser = {
  //gets a parsed rss articale in an object
  parse:function(article){
    return article.title;
  }
};

````
#####Instantiate a scraper object

````javascript

var HACKER_NEWS_RSS = "http://hnrss.org/ask";
var scrapper = new RssScrapper({
  url: HACKER_NEWS_RSS,
  parser: hnParser
});
````

#####Parse!

````javascript

scrapper.get(function(err,parsed){
  //print all articles on an rss
  console.log("Ask:Hn titles", parsed);
});

````

##### Result:
```
Ask:HN titles:
[
  'Ask HN: Do you like the idea of social network and learning?★',
  'Ask HN: How does Saved stories feature work?',
  'Ask HN: AGPL on a Code Generator App',
  'Ask HN: How do you read your programming books?',
  'Ask HN: Is OpenGL Worth Learning?',
  'Ask HN: How to produce vnc like Browserling?',
  'Ask HN: How do I solve problems/code outside of the book I used to learn python?',
  'Ask HN: Self Study Learning Path',
  'Ask HN: How to build quality software in a fast paced startup enviorment?',
  'Ask HN: Is Agar.io currently making or losing money?',
  'Ask HN: Any success with Toastmasters?',
  'Ask HN: Has anyone else found Angular to be destroying their productivity?',
  'Ask HN: How to survive a horrible tech job while looking for a new one?',
  'Ask HN: How can a successful startup adopt a strong testing workflow?',
  'Ask HN: What kind of software will be used to develop VR applications?',
  'Ask HN: How do you prepare for a Technical Interview',
  'Ask HN: Recommend one Business/Startup book',
  'Ask HN: Should I branch off my startup\'s technology into a separate company?',
  'Ask HN: Test/Play with 3D Printing Library',
  'Ask HN: What database storage engine do you use, and why?'
]

```

Development
===========

To run tests use:

````bash
npm test
````







