"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Comment = require( "../models/comment" );

var comments = class comments {
  static create( params, options ) {
    return iNaturalistAPI.basicPost( "comments", params, options ).
      then( function( response ) {
        var c = new Comment( response );
        return c;
      }
    );
  }

  static update( params, options ) {
    return iNaturalistAPI.basicUpdate( "comments", params, options ).
      then( function( response ) {
        return new Comment( response );
      }
    );
  }
};

module.exports = comments;
