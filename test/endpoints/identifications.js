var nock = require( "nock" ),
    expect = require( "chai" ).expect,
    identifications = require( "../../lib/endpoints/identifications" );

describe( "Identifications", function( ) {

  describe( "create", function( ) {
    it( "posts to /identifications", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/identifications", { body: "testbody" } ).
        reply( 200, { id: 1 } );
      identifications.create({ body: "testbody" }).then( function( ) {
        done( );
      });
    });
  });

  describe( "update", function( ) {
    it( "puts to /identifications", function( done ) {
      nock( "http://localhost:3000" ).
        put( "/identifications/1", { id: 1, body: "testbody" }).
        reply( 200, { id: 1 } );
      identifications.update({ id: 1, body: "testbody" }).then( function( ) {
        done( );
      });
    });
  });

  describe( "delete", function( ) {
    it( "deletes to /identifications", function( done ) {
      nock( "http://localhost:3000" ).
        delete( "/identifications/1", { id: 1 }).
        reply( 200, { id: 1 } );
      identifications.delete({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "similar_species", function( ) {
    it( "returns Taxon objects", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/identifications/similar_species?taxon_id=4778").
        reply( 200, {
          total_results: 1,
          page: 1,
          per_page: 1,
          results: [ {
            count: 5,
            taxon: {
              observations_count: 5749,
              is_active: true,
              iconic_taxon_id: 3,
              rank_level: 10,
              parent_id: 4755,
              name: "Cathartes aura",
              rank: "species",
              id: 4756,
              iconic_taxon_name: "Aves",
              preferred_common_name: "Turkey Vulture"
            }
          } ]
        } );
      identifications.similar_species( { taxon_id: 4778 } ).then( function( r ) {
        expect( r.results[0].taxon.constructor.name ).to.eq( "Taxon" );
        expect( r.results[0].taxon.name ).to.eq( "Cathartes aura" );
        expect( r.results[0].count ).to.eq( 5 );
        done( );
      } );
    } );
  } );

  describe( "identifiers", function( ) {
    it( "returns objects with users", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/identifications/identifiers" ).
        reply( 200, {
          total_results: 6,
          page: 1,
          per_page: 1,
          results: [
            {
              count: 10,
              user: {
                id: 6,
                login: "finn",
                login_autocomplete: "finn",
                name: "",
                name_autocomplete: "",
                icon: null,
                observations_count: 3403,
                identifications_count: 0,
                journal_posts_count: 0,
                activity_count: 3403
              }
            }
          ]
        } );
      identifications.identifiers( ).then( function( r ) {
        expect( r.results[0].user.constructor.name ).to.eq( "User" );
        done( );
      } );
    } );
  } )

});
