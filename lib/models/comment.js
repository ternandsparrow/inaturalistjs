"use strict";
var Model = require( "./model" );

var Comment = class Comment extends Model {

  static typifyModelResponse( response ) {
    return new Comment( response );
  }

};

module.exports = Comment;
