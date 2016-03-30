"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Identification = require( "../models/identification" );

var identifications = class identifications {
  static create( params, options ) {
    return iNaturalistAPI.basicPost( "identifications", params, options ).
      then( Identification.typifyModelResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.basicUpdate( "identifications/:id", params, options ).
      then( Identification.typifyModelResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.basicDelete( "identifications/:id", params, options );
  }
};

module.exports = identifications;
