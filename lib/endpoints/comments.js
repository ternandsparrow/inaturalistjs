"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Comment = require( "../models/comment" );

var comments = class comments {
  static create( params, options ) {
    return iNaturalistAPI.basicPost( "comments", params, options ).
      then( Comment.typifyModelResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.basicUpdate( "comments/:id", params, options ).
      then( Comment.typifyModelResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.basicDelete( "comments/:id", params, options );
  }
};

module.exports = comments;
