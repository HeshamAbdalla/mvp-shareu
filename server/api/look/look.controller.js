  'use strict';
  var _ = require('lodash');
  var Look = require('./look.model');
  var path = require('path');
  var utils = require('../../utils/utils.js');
  exports.allImages = function(req, res) {
    Look.find({}).sort({
      createTime: -1
    }).exec(function(err, images){
      if(err) {
        return handleError(res, err);
      }
      if(!images) {
        return res.send(404);
      }
      console.log(images)
      return res.status(200).json(images);
    })
  }
  exports.scrapeUpload = function(req, res) {
    var random = utils.randomizer(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    utils.downloadURI(req.body.image, './client/assets/images/uploads/' + random + '.jpg', function(filename){
      console.log('done')

    var newLook = new Look();
    newLook.title = req.body.title;
    newLook.email = req.body.email;
    newLook.linkURL = req.body.linkURL;
    newLook.description = req.body.description;
    newLook.userName = req.body.name;
    newLook._creator = req.body._creator;
    newLook.createTime = Date.now();
    newLook.upVotes = 0;
    newLook.image = filename.slice(9);
    newLook.save(function(err, item){
      if(err) {
        console.log('error saving newLook');
      } else {
        console.log(item);
        res.status(200).json(item);
      }
      });
    });
  }
  //uploading images -- server
  exports.upload = function(req, res) {
    var newLook = new Look();
    var fileimage = req.middlewareStorage.fileimage;

    newLook.image = '/assets/images/uploads' + fileimage;
    newLook.email = req.body.email;
    newLook.linkURL = req.body.linkURL;
    newLook.title = req.body.title;
    newLook.description = req.body.description;
    newLook.userName = req.body.name;
    newLook._creator = req.body._creator;
    newLook.createTime = Date.now();
    newLook.upVotes = 0;
    newLook.image = filename.slice(9);
    newLook.save(function(err, item){
      if(err) {
        console.log('error saving newLook');
      } else {
        console.log(item);
        res.status(200).json(item);
      }
      });
  };

  //ERROR FUNCTION
  function handleError(res, err) {
    return res.send(500, err);
  }
