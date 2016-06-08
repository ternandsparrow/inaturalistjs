"use strict";
var expect = require( "chai" ).expect,
    Photo = require( "../../lib/models/photo" )

describe( "Photo", function( ) {

  describe( "photoUrl", function( ) {
    it( "should return undefined if no photo present", function( ) {
      let p = new Photo({ url: null });
      expect( p.photoUrl( ) ).to.be.undefined;
    });

    it( "takes optional sizes", function( ) {
      let p = new Photo({
        attribution: "no rights reserved",
        id: 519,
        license_code: "cc0",
        url: "http://localhost:3000/attachments/local_photos/files/519/square/pic1.jpg"
      });
      expect( p.photoUrl( "medium" ) ).to.match( /medium/ );
      expect( p.photoUrl( "large" ) ).to.match( /large/ );
      expect( p.photoUrl( ) ).to.match( /square/ );
    });

    it( "caches the photoUrl by size", function( ) {
      let p = new Photo({ url: "test" });
      expect( p.photoUrl( ) ).to.eq( "test" );
      p.url = "changed";
      expect( p.photoUrl( ) ).to.eq( "test" );
      expect( p.photoUrl( "medium" ) ).to.eq( "changed" );
    });

    it( "should return multiple sizes regardless of file extension", function( ) {
      let p = new Photo({
        attribution: "no rights reserved",
        id: 519,
        license_code: "cc0",
        url: "http://static.inaturalist.org/photos/3789931/square.bmp"
      });
      expect( p.photoUrl( "medium" ) ).to.match( /medium/ );
      expect( p.photoUrl( "large" ) ).to.match( /large/ );
      expect( p.photoUrl( ) ).to.match( /square/ );
    });

    it( "should return multiple sizes with no file extension", function( ) {
      let p = new Photo({
        attribution: "no rights reserved",
        id: 519,
        license_code: "cc0",
        url: "http://static.inaturalist.org/photos/3789931/square"
      });
      expect( p.photoUrl( "medium" ) ).to.match( /medium/ );
      expect( p.photoUrl( "large" ) ).to.match( /large/ );
      expect( p.photoUrl( ) ).to.match( /square/ );
    });
  });

});
