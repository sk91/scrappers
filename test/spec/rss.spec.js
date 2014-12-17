var Mitm = require('mitm')
	, ParserMock = require('../mocks/parser.mock')
	, PageScrapper = require('../../lib/page');

describe("Page Scrapper", function(){
	var mitm, stub, scrapper, parser;

	beforeEach(function(){
		mitm = Mitm();
		parser = new ParserMock();
		scrapper = new PageScrapper({
			'url': "http://testurl.com/",
			'parser': parser
		});
		stub = {
			response: "response",
			status: 200,
			requestTest: function(){}
		};

		mitm.on('request', function(req,res){
			stub.requestTest(req,res);
			res.statusCode = stub.status;
			res.end(stub.response);
		});
	});

	it("should get page contents", function(done){
		scrapper.get(function(err,data){
			expect(data).toBeTruthy();
			done();
		});
	});

	it("should parse rescived page", function(done){
		spyOn(parser, 'parse').and.callThrough();
		scrapper.get(function(){
			expect(parser.parse).toHaveBeenCalled();
			done()
		});
	});



});