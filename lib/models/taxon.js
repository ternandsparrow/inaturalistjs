"use strict";
var Model = require( "./model" ),
    Photo = require( "./photo" );

var Taxon = class Taxon extends Model {

  constructor( attrs ) {
    super( attrs );
    if ( this.default_photo && this.default_photo !== undefined) {
      this.defaultPhoto = new Photo( this.default_photo );
    }
  }

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
