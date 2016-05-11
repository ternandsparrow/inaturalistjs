var nock = require( "nock" ),
    projects = require( "../../lib/endpoints/projects" ),
    expect = require( "chai" ).expect,
    testHelper = require( "../../lib/test_helper" );

describe( "Projects", function( ) {

  describe( "fetch", function( ) {
    it( "fetches projects by ID", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/projects/1" ).
        reply( 200, testHelper.mockResponse );
      projects.fetch( 1 ).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/projects/1" );
        expect( r.constructor.name ).to.eq( "iNaturalistAPIResponse" );
        expect( r.total_results ).to.eq( 1 );
        expect( r.results[0].constructor.name ).to.eq( "Project" );
        expect( r.results[0].id ).to.eq( 1 );
        done( );
      });
    });
  });

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
