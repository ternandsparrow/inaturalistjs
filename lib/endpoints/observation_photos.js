"use strict";
var iNaturalistAPI = require( "../inaturalist_api" );

var observationPhotos = class observationPhotos {

  static create( params, options ) {
    return iNaturalistAPI.upload( "observation_photos", params, options );
  }

  static delete( params, options ) {
    return iNaturalistAPI.delete( "observation_photos/:id", params, options );
  }

};

module.exports = observationPhotos;
