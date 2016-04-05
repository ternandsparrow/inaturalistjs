var nock = require( "nock" ),
    observationFieldValues = require( "../../lib/endpoints/observation_field_values" );

describe( "ObservationFieldValues", function( ) {

  describe( "create", function( ) {
    it( "posts to /observation_field_values", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/observation_field_values", { body: "testbody" } ).
        reply( 200, { id: 1 } );
      observationFieldValues.create({ body: "testbody" }).then( function( ) {
        done( );
      });
    });
  });

  describe( "update", function( ) {
    it( "puts to /observation_field_values", function( done ) {
      nock( "http://localhost:3000" ).
        put( "/observation_field_values/1", { id: 1, body: "testbody" }).
        reply( 200, { id: 1 } );
      observationFieldValues.update({ id: 1, body: "testbody" }).then( function( ) {
        done( );
      });
    });
  });

  describe( "delete", function( ) {
    it( "deletes to /observation_field_values", function( done ) {
      nock( "http://localhost:3000" ).
        delete( "/observation_field_values/1", { id: 1 }).
        reply( 200, { id: 1 } );
      observationFieldValues.delete({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

});
