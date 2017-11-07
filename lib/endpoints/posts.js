"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Post = require( "../models/post" );

var posts = class posts {
  static search( params, options ) {
    return iNaturalistAPI.get( "posts", params, options ).
      then( Post.typifyArrayResponse );
  }
  static for_user( params, options ) {
    return iNaturalistAPI.get( "posts/for_user", params, options ).
      then( Post.typifyArrayResponse );
  }
};

module.exports = posts;
