"use strict";
var iNaturalistAPI = require( "../inaturalist_api" );

var computervision = class computervision {
  static score_image( params ) {
    return iNaturalistAPI.upload( "computervision/score_image", params );
  }

  static score_observation( params ) {
    return iNaturalistAPI.get( "computervision/score_observation/:id", params, { useAuth: true } );
  }
};

module.exports = computervision;
