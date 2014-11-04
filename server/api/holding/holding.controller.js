/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /holdings              ->  index
 * POST    /holdings              ->  create
 * GET     /holdings/:id          ->  show
 * PUT     /holdings/:id          ->  update
 * DELETE  /holdings/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Holding = require('./holding.model');

// Get list of holdings
exports.index = function(req, res) {
  Holding.find(function (err, holdings) {
    if(err) { return handleError(res, err); }
    return res.json(200, holdings);
  });
};

// Get a single holding
exports.show = function(req, res) {
  Holding.findById(req.params.id, function (err, holding) {
    if(err) { return handleError(res, err); }
    if(!holding) { return res.send(404); }
    return res.json(holding);
  });
};

// Creates a new holding in the DB.
exports.create = function(req, res) {
  Holding.create(req.body, function(err, holding) {
    if(err) { return handleError(res, err); }
    return res.json(201, holding);
  });
};

// Updates an existing holding in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Holding.findById(req.params.id, function (err, holding) {
    if (err) { return handleError(res, err); }
    if(!holding) { return res.send(404); }
    var updated = _.merge(holding, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, holding);
    });
  });
};

// Deletes a holding from the DB.
exports.destroy = function(req, res) {
  Holding.findById(req.params.id, function (err, holding) {
    if(err) { return handleError(res, err); }
    if(!holding) { return res.send(404); }
    holding.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
