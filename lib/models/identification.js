"use strict";
var Model = require( "./model" );

var Identification = class Identification extends Model {

  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, Identification );
  }

};

module.exports = Identification;
