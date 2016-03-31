"use strict";
var Model = require( "./model" );

var ObservationFieldValue = class ObservationFieldValue extends Model {

  static typifyModelResponse( response ) {
    return new ObservationFieldValue( response );
  }

};

module.exports = ObservationFieldValue;
