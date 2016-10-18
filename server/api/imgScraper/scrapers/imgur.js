'use strict';
var request = require('request');
var cheerio = require('cheerio');

exports.list = function(ur, cb) {
  request(url, function(err, res, body){
    if(err){
      cb({
        error: err
      });
    }
    if(!err){
      var $ = cheerio.load(body);
      var pin = {};
      var $url = url;
      var $img = $('.post-image img').attr('src');// get images from pinterest
      var $desc = $('.post-image img').attr('alt');// get description of the image
      console.log($img + 'image url');

      var imgur = {
        img: $img,
        url: $url,
        desc: $desc
      }
      // res with json obj
      cb(imgur);
    }
  })
}
