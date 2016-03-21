"use strict";
var Model = require( "./model" );

var Identification = class Identification extends Model {

  static typifyModelResponse( response ) {
    return new Identification( response );
  }

};

module.exports = Identification;
