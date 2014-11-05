'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Estate Schema
 */
var EstateSchema = new Schema({
  user_id:  { type: Schema.Types.ObjectId, ref: 'User'},
  name:       {type: String, default: ''},
  info:       {type: String, default: ''},
  desc:       {type: String, default: ''},
  portfolios:  [{ type: Schema.Types.ObjectId, ref: 'Portfolio' }],
  image:      {type: String, default: ''},
});

module.exports = mongoose.model('Estate', EstateSchema);
