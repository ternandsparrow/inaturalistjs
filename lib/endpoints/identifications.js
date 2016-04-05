"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Identification = require( "../models/identification" );

var identifications = class identifications {
  static create( params, options ) {
    return iNaturalistAPI.post( "identifications", params, options ).
      then( Identification.typifyInstanceResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.put( "identifications/:id", params, options ).
      then( Identification.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.delete( "identifications/:id", params, options );
  }
};

module.exports = identifications;
