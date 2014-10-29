'use strict';

var mongoose = require('mongoose');

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.index = function(req, res){
  var co = capitalize(req.query.collection);
  var collection = mongoose.model(co);
  collection.findOne({name: req.query.name}, function(err, elem){
    if(err) { return handleError(res, err); }
    if(!elem) {
      return res.send(404);
      }
    return res.json(elem);
  });
};
