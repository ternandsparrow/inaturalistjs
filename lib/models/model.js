"use strict";

var Model = class Model {
  constructor( attrs ) {
    Object.assign( this, attrs );
  }

  static typifyInstanceResponse( response, type ) {
    return new type( response );
  }

  static typifyResultsResponse( response, type ) {
    if( type && response.results ) {
      response.results = response.results.map( function( r ) {
        return new type( r );
      });
    }
    return response;
  }
};

module.exports = Model;
