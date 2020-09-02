const iNaturalistAPI = require( "../inaturalist_api" );
const Trip = require( "../models/trip" );

const trips = class trips {
  static search( params, options ) {
    return iNaturalistAPI.get( "trips", params, options )
      .then( Trip.typifyArrayResponse );
  }

  static for_user( params, options ) { // eslint-disable-line camelcase
    return iNaturalistAPI.get( "trips/for_user", params, options )
      .then( Trip.typifyArrayResponse );
  }

  static create( params, options ) {
    return iNaturalistAPI.post( "trips", params, options )
      .then( Trip.typifyInstanceResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.put( "trips/:id", params, options )
      .then( Trip.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.delete( "trips/:id", params, options );
  }
};

module.exports = trips;
