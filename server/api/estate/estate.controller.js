/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /estates              ->  index
 * POST    /estates              ->  create
 * GET     /estates/:id          ->  show
 * PUT     /estates/:id          ->  update
 * DELETE  /estates/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Estate = require('./estate.model');

// Get list of estates
exports.index = function(req, res) {
  Estate.find(function (err, estates) {
    if(err) { return handleError(res, err); }
    return res.json(200, estates);
  });
};

// Get a single estate
exports.show = function(req, res) {
  Estate.findById(req.params.id, function (err, estate) {
    if(err) { return handleError(res, err); }
    if(!estate) { return res.send(404); }
    return res.json(estate);
  });
};

// Creates a new estate in the DB.
exports.create = function(req, res) {
  Estate.create(req.body, function(err, estate) {
    if(err) { return handleError(res, err); }
    return res.json(201, estate);
  });
};

// Updates an existing estate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Estate.findById(req.params.id, function (err, estate) {
    if (err) { return handleError(res, err); }
    if(!estate) { return res.send(404); }
    var updated = _.merge(estate, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, estate);
    });
  });
};

// Deletes a estate from the DB.
exports.destroy = function(req, res) {
  Estate.findById(req.params.id, function (err, estate) {
    if(err) { return handleError(res, err); }
    if(!estate) { return res.send(404); }
    estate.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
