"use strict";
var expect = require( "chai" ).expect,
    Observation = require( "../../lib/models/observation" ),
    Taxon = require( "../../lib/models/taxon" );

describe( "Observation", function( ) {
  describe( "constructor", function( ) {
    it( "should assign latitude and longitude attributes", function( ) {
      const lat = "38";
      const lon = "-123";
      var o = new Observation( {
        geojson: {
          coordinates: [
            lon,
            lat
          ],
          type: "Point"
        }
      });
      expect( o.latitude ).to.eq( lat );
      expect( o.longitude ).to.eq( lon );
    });
  });

  describe( "typifyResultsResponse", function( ) {
    it( "turns response results into Observations", function( ) {
      var r = { results: [{ name: "modelname" }] };
      expect( r.results[0].constructor.name ).to.eq( "Object" );
      Observation.typifyResultsResponse( r );
      expect( r.results[0].constructor.name ).to.eq( "Observation" );
      expect( r.results[0].name ).to.eq( "modelname" );
    });
    it( "should be typify the taxon", function( ) {
      var r = {
        results: [
          {
            taxon: {
              name: "Taxon name"
            }
          }
        ]
      };
      expect( r.results[0].taxon ).to.be.an.instanceOf( Object );
      Observation.typifyResultsResponse( r );
      expect( r.results[0].taxon ).to.be.an.instanceOf( Taxon );
    });
  });

  describe( "photo", function( ) {
    it( "is null by default", function( ) {
      let o = new Observation( );
      expect( o.photo( ) ).to.eq( undefined );
    });

    it( "is the first photo if present", function( ) {
      let url1 = "http://localhost:3000/attachments/local_photos/files/519/square.jpg",
          url2 = "http://localhost:3000/attachments/local_photos/files/520/square/pic2.jpg"
      let o = new Observation({
        photos: [
          {
            attribution: "no rights reserved",
            id: 519,
            license_code: "cc0",
            url: url1
          },
          {
            attribution: "no rights reserved",
            id: 520,
            license_code: "cc0",
            url: url2
          }
        ]
      });
      expect( o.photo( ) ).to.eq( url1 )
      expect( o.photo( ) ).to.not.eq( url2 )
    });

    it( "takes optional sizes", function( ) {
      let o = new Observation({
        photos: [
          {
            attribution: "no rights reserved",
            id: 519,
            license_code: "cc0",
            url: "http://localhost:3000/attachments/local_photos/files/519/square/pic1.jpg"
          }
        ]
      });
      expect( o.photo( "medium" ) ).to.match( /medium/ );
      expect( o.photo( "large" ) ).to.match( /large/ );
      expect( o.photo( ) ).to.match( /square/ );
    });

    it( "returns if the photo has no url", function( ) {
      let o = new Observation({ photos: [{ url: null }] });
      expect( o.photo( ) ).to.be.undefined;
    });
  });

  describe( "hasPhotos", function( ) {
    it( "returns true if there are photos", function( ) {
      var w = new Observation({ photos: [ true ] });
      expect( w.hasPhotos( ) ).to.be.true;
      var wo = new Observation({ photos: [ ] });
      expect( wo.hasPhotos( ) ).to.be.false;
    });
  });

  describe( "hasSounds", function( ) {
    it( "returns true if there are sounds", function( ) {
      var w = new Observation({ sounds: [ true ] });
      expect( w.hasSounds( ) ).to.be.true;
      var wo = new Observation({ sounds: [ ] });
      expect( wo.hasSounds( ) ).to.be.false;
    });
  });

  describe( "hasMedia", function( ) {
    it( "returns true if there are photos or sounds", function( ) {
      var w = new Observation({ photos: [ true ] });
      expect( w.hasMedia( ) ).to.be.true;
      w = new Observation({ sounds: [ true ] });
      expect( w.hasMedia( ) ).to.be.true;
      var wo = new Observation({ photos: [ ], sounds: [ ] });
      expect( wo.hasMedia( ) ).to.be.false;
    });
  });

});
