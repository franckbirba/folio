'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Holding Schema
 */
var HoldingSchema = new Schema({
  user_id:  { type: Schema.Types.ObjectId, ref: 'User'},
  name:       {type: String, default: ''},
  info:       {type: String, default: ''},
  desc:       {type: String, default: ''},
  portfolios:  [{ type: Schema.Types.ObjectId, ref: 'Portfolio' }],
  image:      {type: String, default: ''},
});

module.exports = mongoose.model('Holding', HoldingSchema);
