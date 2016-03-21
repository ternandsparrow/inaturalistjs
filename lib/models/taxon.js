"use strict";
var Model = require( "./model" );

var Taxon = class Taxon extends Model {

  static typifyResponse( response ) {
    return super.typifyResponse( response, Taxon );
  }

};

module.exports = Taxon;
