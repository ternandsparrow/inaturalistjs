const iNaturalistAPI = require( "../inaturalist_api" );
const UserMute = require( "../models/user_mute" );

const userMutes = class userMutes {
  static create( params, options ) {
    return iNaturalistAPI.post( "user_mutes", params, options )
      .then( UserMute.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.delete( "user_mutes/:id", params, options );
  }
};

module.exports = userMutes;
