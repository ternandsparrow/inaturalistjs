"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Taxon = require( "../models/taxon" );

var taxa = class taxa {
  static fetch( ids ) {
    return iNaturalistAPI.fetch( "taxa", ids ).
      then( Taxon.typifyResultsResponse );
  }

  static autocomplete( params ) {
    return iNaturalistAPI.get( "taxa/autocomplete", params ).
      then( Taxon.typifyResultsResponse );
  }
};

module.exports = taxa;
