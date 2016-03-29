"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Taxon = require( "../models/taxon" );

var taxa = class taxa {
  static fetch( ids ) {
    return iNaturalistAPI.basicFetch( "taxa", ids ).
      then( Taxon.typifyResponse );
  }

  static autocomplete( params ) {
    return iNaturalistAPI.basicSearch( "taxa/autocomplete", params ).
      then( Taxon.typifyResponse );
  }
};

module.exports = taxa;
