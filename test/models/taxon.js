"use strict";
var expect = require( "chai" ).expect,
    Taxon = require( "../../lib/models/taxon" );

describe( "Taxon", function( ) {

  describe( "iconicTaxonName", function( ) {
    it( "returns the iconic_taxon_name", function( ) {
      var t = new Taxon({ iconic_taxon_name: "test" });
      expect( t.iconicTaxonName( ) ).to.eq( "test" );
    });

    it( "returns unknown if there is no iconic taxon name", function( ) {
      var t = new Taxon({ iconic_taxon_name: "" });
      expect( t.iconicTaxonName( ) ).to.eq( "Unknown" );
    });
  });

});
