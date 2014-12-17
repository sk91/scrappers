var ParserMock = module.exports = function(){
	this.parsed = null;
}

ParserMock.prototype.parse = function(data){
	return this.parsed || data;
}