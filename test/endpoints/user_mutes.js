const { expect } = require( "chai" );
const nock = require( "nock" );
const userMutes = require( "../../lib/endpoints/user_mutes" );

describe( "UserMutes", ( ) => {
  describe( "create", ( ) => {
    it( "posts to /user_mutes", done => {
      nock( "http://localhost:3000" )
        .post( "/user_mutes", { to_user_id: 1, body: "testbody" } )
        .reply( 200, { id: 1, body: "testbody" } );
      userMutes.create( { to_user_id: 1, body: "testbody" } ).then( ( ) => {
        done( );
      } );
    } );
  } );
  describe( "delete", ( ) => {
    it( "respond with success", done => {
      nock( "http://localhost:3000" )
        .delete( "/user_mutes/1" )
        .reply( 200, { } );
      userMutes.delete( { id: 1 } ).then( ( ) => {
        // this should just complete without an error
        done( );
      } );
    } );
    it( "throws an error if the message doesn't exist", done => {
      nock( "http://localhost:3000" )
        .delete( "/user_mutes/1" )
        .reply( 404, { error: "not found" } );
      userMutes.delete( { id: 1 } )
        .catch( e => {
          expect( e.response.status ).to.eq( 404 );
          done( );
        } );
    } );
  } );
} );
