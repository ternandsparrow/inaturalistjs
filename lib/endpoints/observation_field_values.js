"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    ObservationFieldValue = require( "../models/comment" );

var observation_field_values = class observation_field_values {
  static create( params, options ) {
    return iNaturalistAPI.basicPost( "observation_field_values", params, options ).
      then( ObservationFieldValue.typifyModelResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.basicUpdate( "observation_field_values/:id", params, options ).
      then( ObservationFieldValue.typifyModelResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.basicDelete( "observation_field_values/:id", params, options );
  }
};

module.exports = observation_field_values;
