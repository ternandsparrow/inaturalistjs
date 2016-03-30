"use strict";
var expect = require( "chai" ).expect,
    iNaturalistAPI = require( "../lib/inaturalist_api" );

describe( "iNaturalistAPI", function( ) {

  describe( "thenJson", function( ) {
    it( "does nothing without text", function( ) {
      expect( iNaturalistAPI.thenJson( ) ).to.be.undefined;
    });
  });

});
