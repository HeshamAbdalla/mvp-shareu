'use strict';
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

exports.list = function(url, cb) {
  request(url, function(err, res, body){
    if(err){
      cb({
        error: err
      });
    }
    if(!err){
      var $ = cheerio.load(body);
      var imgur = {};
      var $url = url;
      var $img = $('.post-image img').attr('src');// get images from pinterest
      var $desc = $('.post-image img').attr('alt');// get description of the image
      console.log($img + 'image url');

      var imgur = {
        img: 'http:' + $img,
        url: $url,
        desc: $desc
      }
      // res with json obj
      console.log('imgur scraped:', imgur);
      cb(imgur);
    }
  })
}
