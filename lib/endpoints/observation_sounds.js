"use strict";
var iNaturalistAPI = require( "../inaturalist_api" );

var observationSounds = class observationSounds {

  static create( params, options ) {
    return iNaturalistAPI.upload( "observation_sounds", params, options );
  }

};

module.exports = observationSounds;
