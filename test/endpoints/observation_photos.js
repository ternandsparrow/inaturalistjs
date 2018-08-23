var expect = require( "chai" ).expect,
    nock = require( "nock" ),
    observation_photos = require( "../../lib/endpoints/observation_photos" );

describe( "ObservationPhotos", function( ) {

  describe( "create", function( ) {
    it( "posts to /observation_photos", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/observation_photos" ).
        reply( 200, { id: 1 } );
      observation_photos.create({ body: "testbody" }).then( function( ) {
        done( );
      });
    });
  });

  describe( "update", function( ) {
    it( "puts to /observation_photos/:id", function( done ) {
      nock( "http://localhost:3000" ).
        put( "/observation_photos/1" ).
        reply( 200, { id: 1 } );
      observation_photos.update({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "delete", function( ) {
    it( "deletes to /observation_photos/:id", function( done ) {
      nock( "http://localhost:3000" ).
        delete( "/observation_photos/1?id=1", { id: 1 }).
        reply( 200, { id: 1 } );
      observation_photos.delete({ id: 1 }).then( function( ) {
        done( );
      });
    });

    it( "throws errors", function( done ) {
      observation_photos.delete({ any: "thing" }).catch( function( e ) {
        expect( e.message ).to.eq( "id required" );
        done( );
      });
    });
  });

});
