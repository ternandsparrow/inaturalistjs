const Model = require( "./model" );

const Trip = class Trip extends Model {
  static typifyArrayResponse( response ) {
    return super.typifyArrayResponse( response, Trip );
  }

  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, Trip );
  }
};

module.exports = Trip;
