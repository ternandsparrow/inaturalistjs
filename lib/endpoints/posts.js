const iNaturalistAPI = require( "../inaturalist_api" );
const Post = require( "../models/post" );

const posts = class posts {
  static search( params, options ) {
    return iNaturalistAPI.get( "posts", params, options )
      .then( Post.typifyArrayResponse );
  }

  static for_user( params, options ) { // eslint-disable-line camelcase
    return iNaturalistAPI.get( "posts/for_user", params, options )
      .then( Post.typifyArrayResponse );
  }
};

module.exports = posts;
