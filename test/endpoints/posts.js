const { expect } = require( "chai" );
const nock = require( "nock" );
const postsEndpoint = require( "../../lib/endpoints/posts" );

describe( "Posts", ( ) => {
  describe( "for_user", ( ) => {
    it( "fetches posts relevant to a user", done => {
      nock( "http://localhost:4000" )
        .get( "/v1/posts/for_user" )
        .reply( 200, [{ id: 1, body: "testpost" }] );
      postsEndpoint.for_user( ).then( posts => {
        expect( posts[0].id ).to.eq( 1 );
        expect( posts[0].body ).to.eq( "testpost" );
        done( );
      } );
    } );
  } );

  describe( "search", ( ) => {
    it( "fetches posts", done => {
      nock( "http://localhost:4000" )
        .get( "/v1/posts" )
        .reply( 200, [{ id: 1, body: "testpost" }] );
      postsEndpoint.search( ).then( posts => {
        expect( posts[0].id ).to.eq( 1 );
        expect( posts[0].body ).to.eq( "testpost" );
        done( );
      } );
    } );
    it( "fetches posts by project", done => {
      nock( "http://localhost:4000" )
        .get( "/v1/posts?project_id=123" )
        .reply( 200, [{ id: 1, body: "testpost" }] );
      postsEndpoint.search( { project_id: 123 } ).then( posts => {
        expect( posts[0].id ).to.eq( 1 );
        expect( posts[0].body ).to.eq( "testpost" );
        done( );
      } );
    } );
  } );
} );
