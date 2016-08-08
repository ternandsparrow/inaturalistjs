"use strict";
var expect = require( "chai" ).expect,
    Taxon = require( "../../lib/models/taxon" );

describe( "Taxon", function( ) {

  describe( "constructor", function( ) {
    it( "creates a defaultPhoto", function( ) {
      var t = new Taxon({ id: 11, default_photo: { id: 22, url: "testurl" } });
      expect( t.defaultPhoto.constructor.name ).to.eq( "Photo" );
      expect( t.defaultPhoto.id ).to.eq( 22 );
      expect( t.defaultPhoto.url ).to.eq( "testurl" );
    });
  });

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

  describe( "photoTag", function( ) {
    it( "returns the default_photo square url if available", function( ) {
      var t = new Taxon({ default_photo: { square_url: "testsquareurl" } });
      expect( t.photoTag( ) ).to.include( "testsquareurl" );
    });

    it( "uses the iconic taxon icon by default", function( ) {
      var t = new Taxon({ iconic_taxon_name: "testiconicname" });
      expect( t.photoTag( ) ).to.include( "testiconicname" );
    });
  });


});
