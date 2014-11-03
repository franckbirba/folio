'use strict';

var mongoose = require('mongoose');
require('../building/building.model')
require('../lease/lease.model')
require('../portfolio/portfolio.model')


function capitalize(string){
  if (string)
    return string.charAt(0).toUpperCase() + string.slice(1);
  return null;
};

exports.show = function(req, res){
  var co = capitalize(req.params.id);
  if (co){
    var collection = mongoose.model(co);
    collection.findOne({name: 'Model'}, function(err, elem){
      if(err) { return handleError(res, err); }
      if(!elem) { return res.send(404); }
      return res.json(elem);
    });
  } else { return res.send(404) }
};
