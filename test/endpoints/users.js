var nock = require( "nock" ),
    users = require( "../../lib/endpoints/users" ),
    expect = require( "chai" ).expect,
    testHelper = require( "../../lib/test_helper" );

describe( "Users", function( ) {

  describe( "fetch", function( ) {
    it( "fetches users by ID", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/users/1" ).
        reply( 200, testHelper.mockResponse );
      users.fetch( 1 ).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/users/1" );
        expect( r.constructor.name ).to.eq( "iNaturalistAPIResponse" );
        expect( r.total_results ).to.eq( 1 );
        expect( r.results[0].constructor.name ).to.eq( "User" );
        expect( r.results[0].id ).to.eq( 1 );
        done( );
      });
    });
  });

});
