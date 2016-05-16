"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    User = require( "../models/user" );

var users = class users {
  static fetch( ids ) {
    return iNaturalistAPI.fetch( "users", ids ).
      then( User.typifyResultsResponse );
  }
};

module.exports = users;
