'use strict';

var mongoose = require('mongoose');

function capitalize(string){
  if (string)
    return string.charAt(0).toUpperCase() + string.slice(1);
  return null;
};

exports.index = function(req, res){
  var co = capitalize(req.query.collection);
  console.log(req.query);
  if (co)
  {
    var collection = mongoose.model(co);
    collection.findOne({name: req.query.name}, function(err, elem){
      if(err) { return handleError(res, err); }
      if(!elem) {
        return res.send(404);
      }
      return res.json(elem);
    });
  } else {
    return res.send(404);
  }
};
