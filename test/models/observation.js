"use strict";
var expect = require( "chai" ).expect,
    Observation = require( "../../lib/models/observation" ),
    Taxon = require( "../../lib/models/taxon" );

describe( "Observation", function( ) {
  describe( "typifyResponse", function( ) {
    it( "turns response results into Observations", function( ) {
      var r = { results: [{ name: "modelname" }] };
      expect( r.results[0].constructor.name ).to.eq( "Object" );
      Observation.typifyResponse( r );
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
      Observation.typifyResponse( r );
      expect( r.results[0].taxon ).to.be.an.instanceOf( Taxon );
    });
  });

  describe( "photo", function( ) {
    it( "is null by default", function( ) {
      let o = new Observation( );
      expect( o.photo( ) ).to.eq( undefined );
    });

    it( "is the first photo if present", function( ) {
      let url1 = "http://localhost:3000/attachments/local_photos/files/519/square/pic1.jpg",
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
    });
  });

});
