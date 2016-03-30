"use strict";
var expect = require( "chai" ).expect,
    util = require( "../lib/util" );

describe( "iNaturalistAPI", function( ) {

  describe( "isBrowser", function( ) {
    it( "returns true if document.querySelector is defined", function( ) {
      expect( util.isBrowser( ) ).to.be.false;
      global.document = { querySelector: function( ) { } };
      expect( util.isBrowser( ) ).to.be.true;
      global.document = undefined;
      expect( util.isBrowser( ) ).to.be.false;
    });
  });

  describe( "browserMetaTagContent", function( ) {
    it( "returns the content attribute of the selector", function( ) {
      global.document = { querySelector: function( ) {
        return { getAttribute: function( ) {
          return "test";
        }};
      }};
      expect( util.browserMetaTagContent( "attr" ) ).to.eq( "test" );
      global.document = undefined;
    });
  });

  describe( "nodeENV", function( ) {
    it( "returns nothing if isNode is false", function( ) {
      expect( util.isNode( ) ).to.be.true;
      var env = process.env;
      process.env = undefined;
      expect( util.isNode( ) ).to.be.false;
      expect( util.nodeENV( "NODE_ENV" ) ).to.be.undefined;
      process.env = env;
      expect( util.isNode( ) ).to.be.true;
    });
  });

});
