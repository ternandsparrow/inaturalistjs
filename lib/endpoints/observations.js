"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Observation = require( "../models/observation" );

var observations = class observations {
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
