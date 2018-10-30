const iNaturalistAPI = require( "../inaturalist_api" );
const Place = require( "../models/place" );

const places = class places {
  static fetch( ids, params ) {
    return iNaturalistAPI.fetch( "places", ids, params )
      .then( Place.typifyResultsResponse );
  }

  static autocomplete( params ) {
    return iNaturalistAPI.get( "places/autocomplete", params )
      .then( Place.typifyResultsResponse );
  }

  static containing( params ) {
    return iNaturalistAPI.get( "places/containing", params )
      .then( Place.typifyResultsResponse );
  }
};

module.exports = places;
