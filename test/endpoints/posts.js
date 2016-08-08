var nock = require( "nock" ),
    posts = require( "../../lib/endpoints/posts" ),
    expect = require( "chai" ).expect,
    testHelper = require( "../../lib/test_helper" );

describe( "Posts", function( ) {

  describe( "for_user", function( ) {
    it( "fetches posts relevant to a user", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/posts/for_user" ).
        reply( 200, [ { id: 1, body: "testpost" } ] );
      posts.for_user( { }, { api_key: "key" } ).then( function( posts ) {
        expect( posts[0].id ).to.eq( 1 );
        expect( posts[0].body ).to.eq( "testpost" );
        done( );
      });
    });
  });

});
