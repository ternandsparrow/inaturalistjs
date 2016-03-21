var expect = require( "chai" ).expect,
    nock = require( "nock" ),
    comments = require( "../../lib/endpoints/comments" );

describe( "Comments", function( ) {

  describe( "create", function( ) {
    it( "posts to /comments", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/comments", { body: "testbody" } ).
        reply( 200, { id: 1 } );
      comments.create({ body: "testbody" }).then( function( ) {
        done( );
      });
    });

    it( "adds an authorization ready for the api_token", function( done ) {
      nock( "http://localhost:3000", { reqheaders: { Authorization: "key" } }).
        post( "/comments", { body: "testbody" }).
        reply( 200, { id: 1 } );
      comments.create({ body: "testbody" }, { api_token: "key" }).then( function( ) {
        done( );
      });
    });

    it( "does nothing with empty params", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/comments", { }).
        reply( 200, { id: 1 } );
      comments.create( ).then( function( ) {
        done( );
      });
    });

    it( "can post to the Rails write API", function( done ) {
      nock( "http://localhost:3000", { reqheaders: { Authorization: "key" } }).
        post( "/comments", { body: "testbody" }).
        reply( 200, { id: 1 } );
      comments.create({ body: "testbody" },
                      { rails: true, api_token: "key", same_origin: true }).then( function( ) {
        done( );
      });
    });
  });

  describe( "update", function( ) {
    it( "puts to /comments", function( done ) {
      nock( "http://localhost:3000" ).
        put( "/comments/1", { id: 1, body: "testbody" }).
        reply( 200, { id: 1 } );
      comments.update({ id: 1, body: "testbody" }).then( function( ) {
        done( );
      });
    });

    it( "throws errors", function( done ) {
      comments.update({ any: "thing" }).catch( function( e ) {
        expect( e.message ).to.eq( "ID required" );
        done( );
      });
    });
  });

  describe( "delete", function( ) {
    it( "deletes to /comments", function( done ) {
      nock( "http://localhost:3000" ).
        delete( "/comments/1", { id: 1 }).
        reply( 200, { id: 1 } );
      comments.delete({ id: 1 }).then( function( ) {
        done( );
      });
    });

    it( "throws errors", function( done ) {
      comments.delete({ any: "thing" }).catch( function( e ) {
        expect( e.message ).to.eq( "ID required" );
        done( );
      });
    });
  });

});
