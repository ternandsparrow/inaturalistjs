var expect = require( "chai" ).expect,
    nock = require( "nock" ),
    places = require( "../../lib/endpoints/places" ),
    testHelper = require( "../../lib/test_helper" );

describe( "Places", function( ) {

  describe( "fetch", function( ) {
    it( "fetches places by ID", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/places/1" ).
        reply( 200, testHelper.mockResponse );
      places.fetch( 1 ).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/places/1" );
        expect( r.constructor.name ).to.eq( "iNaturalistAPIResponse" );
        expect( r.total_results ).to.eq( 1 );
        expect( r.results[0].constructor.name ).to.eq( "Place" );
        expect( r.results[0].id ).to.eq( 1 );
        done( );
      });
    });
  });
});
