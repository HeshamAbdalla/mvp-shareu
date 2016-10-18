  var fs = require('fs');
  var request = require('request');

  exports.downloadURI = function(url, filename, cb){
    request(url)
    .pipe(fs.createWriteStream(filename))
    .on('close',function(){
      cb(filename);
      console.log(filename);
    });
  }
  exports.randomizer = function(length, chars) { //CREATE A RANDOM STRING TO ATTACH TO FILES AND IMAGES FROM STACK-FLOW
    var result = "";
    for(var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length -1))];
    return result;
  }
