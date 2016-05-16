"use strict";
var Model = require( "./model" );

var User = class User extends Model {

  static typifyResultsResponse( response ) {
    return super.typifyResultsResponse( response, User );
  }

};

module.exports = User;
