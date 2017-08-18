"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Taxon = require( "../models/taxon" );

var taxa = class taxa {
  static fetch( ids, params ) {
    return iNaturalistAPI.fetch( "taxa", ids, params ).
      then( Taxon.typifyResultsResponse );
  }

  static autocomplete( params ) {
    return iNaturalistAPI.get( "taxa/autocomplete", params ).
      then( Taxon.typifyResultsResponse );
  }

  static suggest( params ) {
    return iNaturalistAPI.get( "taxa/suggest", params, { useAuth: true } ).then( response => {
      response.results = response.results.map( r => {
        r.taxon = new Taxon( r.taxon );
        return r;
      } );
      return response;
    } );
  }

  static wanted( params ) {
    return iNaturalistAPI.get( "taxa/:id/wanted", params ).then( response => {
      return Taxon.typifyResultsResponse( response );
    } );
  }
};

module.exports = taxa;
