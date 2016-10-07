"use strict";
var expect = require( "chai" ).expect,
    ConservationStatus = require( "../../lib/models/conservation_status" );

describe( "Taxon", function( ) {

  describe( "iucnStatus", function( ) {
    it( "returns IUCN equivalent status for not evaluated", function( ) {
      var cs = new ConservationStatus( { iucn: 0 } );
      expect( cs.iucnStatus( ) ).to.eq( "not evaluated" );
    } );
  } );

  describe( "iucnStatusCode", function( ) {
    it( "returns CR for critically endangered", function( ) {
      var cs = new ConservationStatus( { iucn: 50 } );
      expect( cs.iucnStatusCode( ) ).to.eq( "CR" );
    } );
  } );

  describe( "statusText", function( ) {
    it( "returns critically endangered for IUCN CR", function( ) {
      var cs = new ConservationStatus( { iucn: 50, authority: "IUCN Red List" } );
      expect( cs.statusText( ) ).to.eq( "critically endangered" );
    } );
    it( "returns imperiled for NatureServe G2G3", function( ) {
      var cs = new ConservationStatus( { status: "G2G3", authority: "NatureServe" } );
      expect( cs.statusText( ) ).to.eq( "imperiled" );
    } );
    it( "returns amenazada for Norma A", function( ) {
      var cs = new ConservationStatus( { status: "A", authority: "Norma Oficial 059" } );
      expect( cs.statusText( ) ).to.eq( "amenazada" );
    } );
    it( "returns endangered for e", function( ) {
      var cs = new ConservationStatus( { status: "E" } );
      expect( cs.statusText( ) ).to.eq( "endangered" );
    } );
    it( "returns threatened for t", function( ) {
      var cs = new ConservationStatus( { status: "T" } );
      expect( cs.statusText( ) ).to.eq( "threatened" );
    } );
    it( "defaults to description (code)", function( ) {
      var cs = new ConservationStatus( { status: "foo", description: "bar" } );
      expect( cs.statusText( ) ).to.eq( "bar (foo)" );
    } );
  } );

});
