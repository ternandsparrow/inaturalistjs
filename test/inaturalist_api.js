"use strict";
var expect = require( "chai" ).expect,
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

});
