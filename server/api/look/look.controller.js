  'use strict';
  var _ = require('lodash');
  var Look = require('./look.model');
  var path = require('path');
  var utils = require('../../utils/utils.js');

  exports.scrapeUpload = function(req, res) {
    var random = utils.randomizer(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    utils.downloadURI(req.body.image, '../client/assets/images/uploads/'+ random +'.jpg', function(filename){
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
        res.status(200)
        res.json(item);
      }
      });
    });
  };
