var expect = require( "chai" ).expect,
    nock = require( "nock" ),
    comments = require( "../../lib/endpoints/comments" );

describe( "Comments", function( ) {

  describe( "create", function( ) {
    it( "posts to /comments", function( done ) {
      nock( "http://localhost:4000" ).
        post( "/v1/comments", { body: "testbody" } ).
        reply( 200, { id: 1 } );
      comments.create({ body: "testbody" }).then( function( ) {
        done( );
      });
    });

    it( "posts to /comments", function( done ) {
      nock( "http://localhost:4000", { reqheaders: { authorization: "key" } }).
        post( "/v1/comments", { body: "testbody" }).
        reply( 200, { id: 1 } );
      comments.create({ body: "testbody", api_token: "key" }).then( function( ) {
        done( );
      });
    });

    it( "can post to the Rails write API", function( done ) {
      nock( "http://localhost:3000", { reqheaders: { authorization: "key" } }).
        post( "/comments", { body: "testbody" }).
        reply( 200, { id: 1 } );
      comments.create({ body: "testbody", api_token: "key" }, { rails: true }).then( function( ) {
        done( );
      });
    });
  });

  describe( "update", function( ) {
    it( "puts to /comments", function( done ) {
      nock( "http://localhost:4000" ).
        put( "/v1/comments/1", { id: 1, body: "testbody" }).
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

});
