const Model = require( "./model" );

const Post = class Post extends Model {
  static typifyArrayResponse( response ) {
    return super.typifyArrayResponse( response, Post );
  }
};

module.exports = Post;
