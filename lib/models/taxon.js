"use strict";
var Model = require( "./model" );

var Taxon = class Taxon extends Model {

  static typifyResponse( response ) {
    return super.typifyResponse( response, Taxon );
  }

  iconicTaxonName( ) {
    if ( this.iconic_taxon_name && this.iconic_taxon_name.length > 0 ) {
      return this.iconic_taxon_name;
    }
    return "Unknown";
  }

};

module.exports = Taxon;
