var nock = require( "nock" ),
    posts = require( "../../lib/endpoints/posts" ),
    expect = require( "chai" ).expect;

describe( "Posts", function( ) {

  describe( "for_user", function( ) {
    it( "fetches posts relevant to a user", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/posts/for_user" ).
        reply( 200, [ { id: 1, body: "testpost" } ] );
      posts.for_user( ).then( function( posts ) {
        expect( posts[0].id ).to.eq( 1 );
        expect( posts[0].body ).to.eq( "testpost" );
        done( );
      });
    });
  });

  describe( "search", ( ) => {
    it( "fetches posts", done => {
      nock( "http://localhost:4000" ).
        get( "/v1/posts" ).
        reply( 200, [ { id: 1, body: "testpost" } ] );
      posts.search( ).then( function( posts ) {
        expect( posts[0].id ).to.eq( 1 );
        expect( posts[0].body ).to.eq( "testpost" );
        done( );
      });
    } );
    it( "fetches posts by project", done => {
      nock( "http://localhost:4000" ).
        get( "/v1/posts?project_id=123" ).
        reply( 200, [ { id: 1, body: "testpost" } ] );
      posts.search( { project_id: 123 } ).then( function( posts ) {
        expect( posts[0].id ).to.eq( 1 );
        expect( posts[0].body ).to.eq( "testpost" );
        done( );
      } );
    } );
  } );

});
