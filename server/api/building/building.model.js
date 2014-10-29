'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var BuildingSchema = new Schema({
  portfolio:   { type: Schema.Types.ObjectId, ref: 'Portfolio' },
  name:        { type: String, default: '' },
  type:        { type: String, default: '' },
  address:     {
        address1: { type: String, default: '' },
        address2: { type: String, default: '' },
        city:     { type: String, default: '' },
        zip_code: { type: String, default: '' },
        area:     { type: String, default: '' },
        country:  { type: String, default: '' },
        gps_long: { type: Number, default: 0 },
        gps_lat:  { type: Number, default: 0 },
  },
  images:     [{ type: Schema.Types.ObjectId, ref: 'Image'}],
  leases:     [{ type: Schema.Types.ObjectId, ref: 'Lease'}],
  info:       {
        construction_year: { type: Number, default: 1900 },
        control: [{
          full:   { type: Boolean, default: false },
          shared: { type: Boolean, default: false}
        }],
        user: [{
          own_use:  { type: Boolean, default: false},
          rented:   { type: Boolean, default: false}
        }],
        area_total:     { type: Number, default: 0 },
        area_usefull:   { type: Number, default: 0 },
        floors:         { type: Number, default: 0 },
        parking_spaces: { type: Number, default: 0 },
        parking_surface: { type: Number, default: 0 }
  },
  summary: {
    structure:  { type: String, default: '' },
    facade:     { type: String, default: '' },
    prod_hot:   { type: String, default: '' },
    tgbt:       { type: String, default: '' },
    cold_tem:   { type: String, default: '' },
    global_confor: { type: String, default: '' },
    global_age:    { type: String, default: '' },
    gloabl_conformity: { type: String, default: '' }
  }
});


module.exports = mongoose.model('Building', BuildingSchema);
