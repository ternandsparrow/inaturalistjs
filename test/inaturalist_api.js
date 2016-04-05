"use strict";
var expect = require( "chai" ).expect,
    sinon = require( "sinon" ),
    nock = require( "nock" ),
    iNaturalistAPI = require( "../lib/inaturalist_api" );

describe( "iNaturalistAPI", function( ) {

  describe( "thenJson", function( ) {
    it( "does nothing without text", function( ) {
      expect( iNaturalistAPI.thenJson( ) ).to.be.undefined;
    });
  });

  describe( "methodHostPrefix", function( ) {
    it( "returns an empty string if using same_origin", function( ) {
      expect( iNaturalistAPI.methodHostPrefix({ same_origin: true }) ).to.eq( "" );
    });
  });

  describe( "csrf", function( ) {
    it( "returns an empty string if using same_origin", function( ) {
      global.document = { querySelector: function( ) {
        return { getAttribute: function( ) { return "test"; }};
      }};
      expect( iNaturalistAPI.csrf( ) ).to.deep.eq({
        param: "test",
        token: "test"
      });
      global.document = undefined;
    });
  });

  describe( "apiToken", function( ) {
    it( "returns an empty string if using same_origin", function( ) {
      global.document = { querySelector: function( ) {
        return { getAttribute: function( ) { return "test"; }};
      }};
      expect( iNaturalistAPI.apiToken( ) ).to.eq( "test" );
      global.document = undefined;
    });
  });

  describe( "post", function( ) {
    it( "will use CSRF if there is no API token", function( done ) {
      var stubApiToken = sinon.stub( iNaturalistAPI, "apiToken", () => { return false; });
      var stubCSRF = sinon.stub( iNaturalistAPI, "csrf", () => {
        return { param: "p", token: "t" };
      });
      nock( "http://localhost:3000" ).
        post( "/observations", { taxon_id: 4 } ).
        reply( 200, { id: 1 } );
      var params = { taxon_id: 4 };
      iNaturalistAPI.post( "observations", params ).then( () => {
        stubApiToken.restore( );
        stubCSRF.restore( );
        done( );
      });
    });
  });

  describe( "interpolateRouteParams", function( ) {
    it( "interpolate params", function( ) {
      var r = iNaturalistAPI.interpolateRouteParams( "/one/:one/two/:two/:three",
        { one: 1, two: 2, three: 3 });
      expect( r.route ).to.eq( "/one/1/two/2/3" );
      expect( r.err ).to.be.undefined;
    });

    it( "returns errors in a failed promise", function( done ) {
      var r = iNaturalistAPI.interpolateRouteParams( "/one/:one/two/:two/:three", { });
      expect( r.route ).to.eq( "/one/:one/two/:two/:three" );
      expect( r.err.constructor.name ).to.eq( "Promise" );
      r.err.catch( e => {
        expect( e.message ).to.eq( "one required" )
        done( );
      });
    });
  });

});
