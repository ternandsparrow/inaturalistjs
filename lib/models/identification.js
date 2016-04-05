"use strict";
var Model = require( "./model" ),
    Taxon = require( "./taxon" );

var Identification = class Identification extends Model {

  constructor( attrs ) {
    super( attrs );
    if ( this.taxon && this.taxon !== undefined) {
      this.taxon = new Taxon( this.taxon );
    }
  }

  static typifyModelResponse( response ) {
    return new Identification( response );
  }

};

module.exports = Identification;
