"use strict";
var iNaturalistAPI = require( "../inaturalist_api" );

var projects = class projects {
  static join( params, options ) {
    return iNaturalistAPI.post( "projects/:id/join", params, options );
  }

  static leave( params, options ) {
    return iNaturalistAPI.delete( "projects/:id/leave", params, options );
  }
};

module.exports = projects;
