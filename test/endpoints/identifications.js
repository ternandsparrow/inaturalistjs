var nock = require( "nock" ),
    identifications = require( "../../lib/endpoints/identifications" );

describe( "Identifications", function( ) {

  describe( "create", function( ) {
    it( "posts to /identifications", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/identifications", { body: "testbody" } ).
        reply( 200, { id: 1 } );
      identifications.create({ body: "testbody" }).then( function( ) {
        done( );
      });
    });
  });

  describe( "update", function( ) {
    it( "puts to /identifications", function( done ) {
      nock( "http://localhost:3000" ).
        put( "/identifications/1", { id: 1, body: "testbody" }).
        reply( 200, { id: 1 } );
      identifications.update({ id: 1, body: "testbody" }).then( function( ) {
        done( );
      });
    });
  });

  describe( "delete", function( ) {
    it( "deletes to /identifications", function( done ) {
      nock( "http://localhost:3000" ).
        delete( "/identifications/1", { id: 1 }).
        reply( 200, { id: 1 } );
      identifications.delete({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

});
