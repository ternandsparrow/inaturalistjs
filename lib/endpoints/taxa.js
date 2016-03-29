"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Taxon = require( "../models/taxon" );

var taxa = class taxa {
  static fetch( ids ) {
    return iNaturalistAPI.basicFetch( "v1/taxa", ids ).
      then( Taxon.typifyResponse );
  }

  static autocomplete( params ) {
    return iNaturalistAPI.basicSearch( "v1/taxa/autocomplete", params ).
      then( Taxon.typifyResponse );
  }
};

module.exports = taxa;
