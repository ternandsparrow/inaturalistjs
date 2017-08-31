var expect = require( "chai" ).expect,
    nock = require( "nock" ),
    taxa = require( "../../lib/endpoints/taxa" ),
    testHelper = require( "../../lib/test_helper" );

describe( "Taxa", function( ) {

  describe( "fetch", function( ) {
    it( "fetches taxa by ID", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1" ).
        reply( 200, testHelper.mockResponse );
      taxa.fetch( 1 ).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/taxa/1" );
        expect( r.constructor.name ).to.eq( "iNaturalistAPIResponse" );
        expect( r.total_results ).to.eq( 1 );
        expect( r.results[0].constructor.name ).to.eq( "Taxon" );
        expect( r.results[0].id ).to.eq( 1 );
        done( );
      });
    });
    it( "passes params through to the API", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1?preferred_place_id=1" ).
        reply( 200, testHelper.mockResponse );
      taxa.fetch( 1, { preferred_place_id: 1 } ).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/taxa/1?preferred_place_id=1" );
        done( );
      } );
    } );
    it( "defaultPhoto is a Photo", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1" ).
        reply( 200, testHelper.taxonResponse );
      taxa.fetch( 1 ).then( function( r ) {
        expect( r.results[0].defaultPhoto.constructor.name ).to.eq( "Photo" );
        done( );
      } );
    } );
    it( "taxonPhotos have a Taxon and a Photo", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1" ).
        reply( 200, testHelper.taxonResponse );
      taxa.fetch( 1 ).then( function( r ) {
        expect( r.results[0].taxonPhotos[0].taxon.constructor.name ).to.eq( "Taxon" );
        expect( r.results[0].taxonPhotos[0].photo.constructor.name ).to.eq( "Photo" );
        expect( r.results[0].taxonPhotos[0].photo.photoUrl( "large" ) ).to.match( /219b9ab6c5_b/ );
        done( );
      } );
    } );
    it( "conservationStatus is a ConservationStatus", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1" ).
        reply( 200, testHelper.taxonResponse );
      taxa.fetch( 1 ).then( function( r ) {
        expect( r.results[0].conservationStatus.constructor.name ).to.eq( "ConservationStatus" );
        done( );
      } );
    } );
    it( "conservationStatuses are ConservationStatuses", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1" ).
        reply( 200, testHelper.taxonResponse );
      taxa.fetch( 1 ).then( function( r ) {
        expect( r.results[0].conservationStatuses[0].constructor.name ).to.eq( "ConservationStatus" );
        done( );
      } );
    } );
    it( "ancestorTaxa are Taxa", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1" ).
        reply( 200, testHelper.taxonResponse );
      taxa.fetch( 1 ).then( function( r ) {
        expect( r.results[0].ancestorTaxa[0].constructor.name ).to.eq( "Taxon" );
        done( );
      } );
    } );
    it( "childTaxa are Taxa", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1" ).
        reply( 200, testHelper.taxonResponse );
      taxa.fetch( 1 ).then( function( r ) {
        expect( r.results[0].childTaxa[0].constructor.name ).to.eq( "Taxon" );
        done( );
      } );
    } );
  });

  describe( "autocomplete", function( ) {
    it( "fetches observations by ID", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/autocomplete?q=Animals" ).
        reply( 200, testHelper.mockResponse );
      taxa.autocomplete({ q: "Animals" }).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/taxa/autocomplete?q=Animals" );
        done( );
      });
    });
  });

  describe( "suggest", function( ) {
    it( "returns taxon objects", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/suggest" ).
        reply( 200, testHelper.suggestResponse );
      taxa.suggest( ).then( r => {
        expect( r.results[0].taxon.constructor.name ).to.eq( "Taxon" );
        done( );
      } );
    } );
  } );

  describe( "wanted", function( ) {
    it( "returns taxon objects", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/taxa/1/wanted?id=1" ).
        reply( 200, testHelper.taxonResponse );
      taxa.wanted( { id: 1 } ).then( r => {
        expect( r.results[0].constructor.name ).to.eq( "Taxon" );
        done( );
      } );
    } );
  } );

});
