"use strict";

var Model = class Model {
  constructor( attrs ) {
    Object.assign( this, attrs );
  }

  static typifyResponse( response, type ) {
    if( type && response.results ) {
      response.results = response.results.map( function( r ) {
        return new type( r );
      });
    }
    return response;
  }
};

module.exports = Model;
