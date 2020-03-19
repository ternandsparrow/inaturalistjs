const Model = require( "./model" );

const UserMute = class UserMute extends Model {
  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, UserMute );
  }

  static typifyResultsResponse( response ) {
    return super.typifyResultsResponse( response, UserMute );
  }
};

module.exports = UserMute;
