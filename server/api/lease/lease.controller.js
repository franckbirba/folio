/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /leases              ->  index
 * POST    /leases              ->  create
 * GET     /leases/:id          ->  show
 * PUT     /leases/:id          ->  update
 * DELETE  /leases/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Lease = require('./lease.model');

// Get list of leases
exports.index = function(req, res) {
  Lease.find(function (err, leases) {
    if(err) { return handleError(res, err); }
    return res.json(200, leases);
  });
};

// Get a single lease
exports.show = function(req, res) {
  Lease.findById(req.params.id, function (err, lease) {
    if(err) { return handleError(res, err); }
    if(!lease) { return res.send(404); }
    return res.json(lease);
  });
};

// Creates a new lease in the DB.
exports.create = function(req, res) {
  Lease.create(req.body, function(err, lease) {
    if(err) { return handleError(res, err); }
    return res.json(201, lease);
  });
};

// Updates an existing lease in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Lease.findById(req.params.id, function (err, lease) {
    if (err) { return handleError(res, err); }
    if(!lease) { return res.send(404); }
    var updated = _.merge(lease, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, lease);
    });
  });
};

// Deletes a lease from the DB.
exports.destroy = function(req, res) {
  Lease.findById(req.params.id, function (err, lease) {
    if(err) { return handleError(res, err); }
    if(!lease) { return res.send(404); }
    lease.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
