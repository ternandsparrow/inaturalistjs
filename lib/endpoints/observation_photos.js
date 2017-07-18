"use strict";
var iNaturalistAPI = require( "../inaturalist_api" );

var observationPhotos = class observationPhotos {

  static create( params, options ) {
    return iNaturalistAPI.upload( "observation_photos", params, options );
  }

};

module.exports = observationPhotos;
