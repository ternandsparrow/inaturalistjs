"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Observation = require( "../models/observation" );

var observations = class observations {
  static create( params, options ) {
    return iNaturalistAPI.basicPost( "observations", params, options ).
      then( Observation.typifyModelResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.basicUpdate( "observations/:id", params, options ).
      then( Observation.typifyModelResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.basicDelete( "observations/:id", params, options );
  }

  static fetch( ids ) {
    return iNaturalistAPI.basicFetch( "observations", ids ).
      then( Observation.typifyResponse );
  }

  static search( params ) {
    return iNaturalistAPI.basicSearch( "observations", params ).
      then( Observation.typifyResponse );
  }
};

module.exports = observations;
