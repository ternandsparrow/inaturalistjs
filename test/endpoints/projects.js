var nock = require( "nock" ),
    projects = require( "../../lib/endpoints/projects" );

describe( "Projects", function( ) {

  describe( "join", function( ) {
    it( "posts to /projects/:id/join", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/projects/1/join" ).
        reply( 200, { } );
      projects.join({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "leave", function( ) {
    it( "delets to /projects/:id/leave", function( done ) {
      nock( "http://localhost:3000" ).
        delete( "/projects/1/leave" ).
        reply( 200, { } );
      projects.leave({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

});
