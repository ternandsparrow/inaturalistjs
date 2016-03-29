"use strict";
var expect = require( "chai" ).expect,
    iNaturalistAPI = require( "../lib/inaturalist_api" );

describe( "iNaturalistAPI", function( ) {

  describe( "thenJson", function( ) {
    it( "does nothing without text", function( ) {
      expect( iNaturalistAPI.thenJson( ) ).to.be.undefined;
    });
  });

  describe( "htmlDocumentHostConfig", function( ) {
    it( "returns the content attribute of the selector", function( ) {
      global.document = { querySelector: function( ) {
        return { getAttribute: function( ) {
          return "test";
        }};
      }};
      expect( iNaturalistAPI.htmlDocumentHostConfig( ) ).to.eq( "test" );
      global.document = undefined;
    });
  });

  describe( "nodeHostConfig", function( ) {
    it( "returns undefined if there is no node env", function( ) {
      var env = process.env;
      process.env = undefined;
      expect( iNaturalistAPI.nodeHostConfig( ) ).to.be.undefined;
      process.env = env;
    });

    it( "returns undefined if there is no node env", function( ) {
      process.env.API_HOST = "test";
      expect( iNaturalistAPI.nodeHostConfig( ) ).to.eq( "test" );
      process.env.API_HOST = undefined;
    });
  });

});
