"use strict";
var expect = require( "chai" ).expect,
    Identification = require( "../../lib/models/identification" );

describe( "Identification", function( ) {

  describe( "constructor", function( ) {
    it( "creates a taxon", function( ) {
      var i = new Identification({ id: 11, taxon: { id: 22, name: "testtaxon" } });
      expect( i.taxon.constructor.name ).to.eq( "Taxon" );
      expect( i.taxon.id ).to.eq( 22 );
      expect( i.taxon.name ).to.eq( "testtaxon" );
    });
  });

});
