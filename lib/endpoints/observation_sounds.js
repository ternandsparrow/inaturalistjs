const iNaturalistAPI = require( "../inaturalist_api" );

const observationSounds = class observationSounds {
  static create( params, options ) {
    return iNaturalistAPI.upload( "observation_sounds", params, options );
  }
};

module.exports = observationSounds;
