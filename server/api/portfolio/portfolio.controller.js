/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /portfolios              ->  index
 * POST    /portfolios              ->  create
 * GET     /portfolios/:id          ->  show
 * PUT     /portfolios/:id          ->  update
 * DELETE  /portfolios/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Portfolio = require('./portfolio.model');

// Get list of portfolios
exports.index = function(req, res) {
  Portfolio.find(function (err, portfolios) {
    if(err) { return handleError(res, err); }
    return res.json(200, portfolios);
  });
};

// Get a single portfolio
exports.show = function(req, res) {
  Portfolio.findById(req.params.id, function (err, portfolio) {
    if(err) { return handleError(res, err); }
    if(!portfolio) { return res.send(404); }
    return res.json(portfolio);
  });
};

// Creates a new portfolio in the DB.
exports.create = function(req, res) {
  Portfolio.create(req.body, function(err, portfolio) {
    if(err) { return handleError(res, err); }
    return res.json(201, portfolio);
  });
};

// Updates an existing portfolio in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Portfolio.findById(req.params.id, function (err, portfolio) {
    if (err) { return handleError(res, err); }
    if(!portfolio) { return res.send(404); }
    var updated = _.merge(portfolio, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, portfolio);
    });
  });
};

// Deletes a portfolio from the DB.
exports.destroy = function(req, res) {
  Portfolio.findById(req.params.id, function (err, portfolio) {
    if(err) { return handleError(res, err); }
    if(!portfolio) { return res.send(404); }
    portfolio.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Get emnbedded docs (buildings) of Portfolio
exports.buildings = function(req, res){
  Building.find({portfolio: mongoose.Types.ObjectId(req.params.id)}, function(err, buildings){
    if (err) { console.log(err); next() };
    res.send(buildings);
  });
}

function handleError(res, err) {
  return res.send(500, err);
}
