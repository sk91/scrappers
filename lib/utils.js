var iconv = require('iconv');

exports.adjastEncoding = function(encoding, body) {
  body = new Buffer(body, 'binary');
  if (encoding === 'utf8') {
    return body.toString(encoding);
  }
  try {
    var conv = new iconv.Iconv(encoding, 'UTF-8');
    return conv.convert(body)
  } catch (err) {
    console.log(err);
    return "";
  }
};