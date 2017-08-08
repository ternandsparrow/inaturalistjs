"use strict";
var iNaturalistAPI = require( "../inaturalist_api" );

var sounds = class sounds {
  static create( params, options ) {
    return iNaturalistAPI.upload( "sounds", params, options );
  }
};

module.exports = sounds;
