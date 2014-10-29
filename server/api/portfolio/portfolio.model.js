'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Portfolio Schema
 */
var PortfolioSchema = new Schema({
  name:       {type: String, default: ''},
  info:       {type: String, default: ''},
  desc:       {type: String, default: ''},
  buildings:  [{ type: Schema.Types.ObjectId, ref: 'Building' }],
  image:      {type: String, default: ''},
  summary: {
    total_surface:    {type: Number, default: 0},
    occupation_rate:  {type: Number, default: 0},
    condition_idx:    {type: Number, default: 0},
    conformity_idx:   {type: Number, default: 0},
    avg_performance:  {type: Number, default: 0},
    avg_age:          {type: Number, default: 0}
  }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
