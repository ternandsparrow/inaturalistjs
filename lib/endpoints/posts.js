"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Post = require( "../models/post" );

var posts = class posts {
  static for_user( ) {
    return iNaturalistAPI.get( "posts/for_user" ).
      then( Post.typifyArrayResponse );
  }
};

module.exports = posts;
