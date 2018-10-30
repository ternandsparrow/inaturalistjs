const iNaturalistAPI = require( "../inaturalist_api" );

const observationPhotos = class observationPhotos {
  static create( params, options ) {
    return iNaturalistAPI.upload( "observation_photos", params, options );
  }

  static update( params, opts ) {
    const options = Object.assign( { }, opts );
    options.method = "PUT";
    return iNaturalistAPI.upload( "observation_photos/:id", params, options );
  }

  static delete( params, options ) {
    return iNaturalistAPI.delete( "observation_photos/:id", params, options );
  }
};

module.exports = observationPhotos;
