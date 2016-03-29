"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Observation = require( "../models/observation" );

var observations = class observations {
  static fetch( ids ) {
    return iNaturalistAPI.basicFetch( "v1/observations", ids ).
      then( Observation.typifyResponse );
  }

  static search( params ) {
    return iNaturalistAPI.basicSearch( "v1/observations", params ).
      then( Observation.typifyResponse );
  }
};

module.exports = observations;
