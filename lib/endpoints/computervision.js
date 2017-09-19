"use strict";
var iNaturalistAPI = require( "../inaturalist_api" );

var computervision = class computervision {
  static score_image( params ) {
    return iNaturalistAPI.upload( "computervision/score_image", params ).then( response => {
      return response;
    } );
  }
};

module.exports = computervision;
