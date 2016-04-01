"use strict";
var Model = require( "./model" );

var Taxon = class Taxon extends Model {

  static typifyResultsResponse( response ) {
    return super.typifyResultsResponse( response, Taxon );
  }

  iconicTaxonName( ) {
    if ( this.iconic_taxon_name && this.iconic_taxon_name.length > 0 ) {
      return this.iconic_taxon_name;
    }
    return "Unknown";
  }

};

module.exports = Taxon;
