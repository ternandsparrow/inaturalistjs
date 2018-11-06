const iNaturalistAPI = require( "../inaturalist_api" );

const photos = class photos {
  static create( params, options ) {
    return iNaturalistAPI.upload( "photos", params, options );
  }
};

module.exports = photos;
