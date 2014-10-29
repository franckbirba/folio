var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var LeaseSchema = new Schema ({
  area_usefull: { type: Number, default: 0 },
  building_id:  { type: Schema.Types.ObjectId, ref: 'Building'},
  certifications: [{
    cert_id:  { type: Schema.Types.ObjectId, ref: 'Certifications' },
    comments: { type: String, default: ''}
  }],
  conformity_info: [{
    comments:        { type: String, default: '' },
    last_diagnostic: { type: Date },
    rule_name:       { type: String, default: '' },
    rule_period:     { type: String, default: '' },
    rule_status:     { type: String, default: '' }
  }],
  confort_quality:{
    accoustic:  { type: String, default: '' },
    comments:   { type: String, default: '' },
    thermic:    { type: String, default: '' },
    visual:     { type: String, default: '' }
  },
  consumption_by_use:[{
      cost:{
        price:  { type: Number, default: 0 },
        unit:   { type: String, default: '' },
        year:   { type: Number, default: 0 }
      },
      supplier: { type: String, default: '' },
      use:      { type: String, default: '' },
  }],
  consumption_fluids: {},
  dpe: {
    co2_emmission: {
      notation: { type: String, default: '' },
      value:    { type: String, default: '' }
    },
    energy_consumption: {
      notation: { type: String, default: '' },
      value:    { type: String, default: '' }
    }
  },
  erp_status: [],
  floor:  { type: Number, default: 0 },
  igh:    { type: Number, default: 0 },
  name:   { type: String, default: '' },
  rent:   { type: Number, default: 0 },
  rental_status: [],
  usage: [],
  technical_info: {
    categories: [{
      conformity: { type: String, default: '' },
      desc:       { type: String, default: '' },
      name:       { type: String, default: '' },
      obsolence:  { type: String, default: '' }
    }],
    comments:          { type: String, default: '' },
    global_conformity: { type: String, default: '' },
    global_obsolence:  { type: String, default: '' }
  }
});

module.exports = mongoose.model('Lease', LeaseSchema);
