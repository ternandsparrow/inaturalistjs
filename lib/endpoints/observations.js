"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Observation = require( "../models/observation" );

var observations = class observations {
  static create( params, options ) {
    return iNaturalistAPI.basicPost( "observations", params, options ).
      then( Observation.typifyModelResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.basicUpdate( "observations/:id", params, options ).
      then( Observation.typifyModelResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.basicDelete( "observations/:id", params, options );
  }

  static fave( params, options ) {
    return iNaturalistAPI.basicPost( "votes/vote/observation/:id", params, options ).
      then( Observation.typifyModelResponse );
  }

  static unfave( params, options ) {
    return iNaturalistAPI.basicDelete( "votes/unvote/observation/:id", params, options );
  }

  static review( params, options ) {
    var p = Object.assign( { }, params );
    p.reviewed = "true";
    return iNaturalistAPI.basicPost( "observations/:id/review", p, options );
  }

  static unreview( params, options ) {
    var p = Object.assign( { }, params );
    p.reviewed = "false";
    return iNaturalistAPI.basicPost( "observations/:id/review", p, options );
  }

  static fetch( ids ) {
    return iNaturalistAPI.basicFetch( "observations", ids ).
      then( Observation.typifyResponse );
  }

  static search( params ) {
    return iNaturalistAPI.basicSearch( "observations", params ).
      then( Observation.typifyResponse );
  }
};

module.exports = observations;
