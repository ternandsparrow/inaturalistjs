"use strict";
var expect = require( "chai" ).expect,
    nock = require( "nock" ),
    computervision = require( "../../lib/endpoints/computervision" );

describe( "Computervision", function( ) {

  describe( "score_image", function( ) {
    it( "posts to score_image", done => {
      nock( "http://localhost:3000" ).
        post( "/computervision/score_image" ).
        reply( 200, { results: [ { taxon: { id: 1 } } ] } );
      computervision.score_image({ body: "testbody" }).then( r => {
        expect( r.results[0].taxon.id ).to.eq( 1 );
        done( );
      });
    });
  });

});
