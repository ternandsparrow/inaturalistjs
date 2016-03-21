"use strict";
var Model = require( "./model" );

var Observation = class Observation extends Model {

  static typifyResponse( response ) {
    return super.typifyResponse( response, Observation );
  }

};

module.exports = Observation;
