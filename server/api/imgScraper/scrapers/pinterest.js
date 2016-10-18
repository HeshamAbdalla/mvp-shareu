'use strict';
var request = require('request');
var cheerio = require('cheerio');

exports.list = function(url, cb) {
  request(url, function(err, res, body){
    if(err){
      cb({
        err: err
      });
    }
    if(!err){
      var $ = cheerio.load(body);
      var pin = {};
      var $url = url;
      var $img = $('.heightContainer img').attr('src');// get images from pinterest
      var $desc = $('.heightContainer img').attr('alt');// get description of the image
      console.log($img + 'image url');

      var pin = {
        img: $img,
        url: $url,
        desc: $desc
      }
      // res with json obj
      cb(pin);
    }
  })
}
