var nock = require( "nock" ),
    projects = require( "../../lib/endpoints/projects" ),
    expect = require( "chai" ).expect,
    testHelper = require( "../../lib/test_helper" );

describe( "Projects", function( ) {

  describe( "fetch", function( ) {
    it( "fetches projects by ID", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/projects/1" ).
        reply( 200, testHelper.mockResponse );
      projects.fetch( 1 ).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/projects/1" );
        expect( r.constructor.name ).to.eq( "iNaturalistAPIResponse" );
        expect( r.total_results ).to.eq( 1 );
        expect( r.results[0].constructor.name ).to.eq( "Project" );
        expect( r.results[0].id ).to.eq( 1 );
        done( );
      });
    });
  });

  describe( "join", function( ) {
    it( "posts to /projects/:id/join", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/projects/1/join" ).
        reply( 200, { } );
      projects.join({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "leave", function( ) {
    it( "deletes to /projects/:id/leave", function( done ) {
      nock( "http://localhost:3000" ).
        delete( "/projects/1/leave?id=1" ).
        reply( 200, { } );
      projects.leave({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "add", function( ) {
    it( "posts to /projects/:id/add", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/projects/1/add" ).
        reply( 200, { id: 1 } );
      projects.add({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "update", function( ) {
    it( "deletes to /projects/:id/remove", function( done ) {
      nock( "http://localhost:3000" ).
        delete( "/projects/1/remove?id=1" ).
        reply( 200, { id: 1 } );
      projects.remove({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "autocomplete", function( ) {
    it( "gets autocomplete results", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/projects/autocomplete?q=Animals" ).
        reply( 200, testHelper.mockResponse );
      projects.autocomplete({ q: "Animals" }).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/projects/autocomplete?q=Animals" );
        done( );
      });
    });
  });

  describe( "create", function( ) {
    it( "posts to /projects", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/projects" ).
        reply( 200, { id: 1 } );
      projects.create({ body: "testbody" }).then( function( ) {
        done( );
      });
    });
  });

  describe( "update", function( ) {
    it( "puts to /projects/:id", function( done ) {
      nock( "http://localhost:3000" ).
        put( "/projects/1" ).
        reply( 200, { id: 1 } );
      projects.update({ id: 1, body: "testbody" }).then( function( ) {
        done( );
      });
    });
  });

  describe( "delete", function( ) {
    it( "deletes to /projects/:id", function( done ) {
      nock( "http://localhost:3000" ).
        delete( "/projects/1?id=1", { id: 1 }).
        reply( 200, { id: 1 } );
      projects.delete({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "posts", function( ) {
    it( "gets posts", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/projects/1/posts?id=1" ).
        reply( 200, testHelper.mockResponse );
      projects.posts( { id: 1 } ).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/projects/1/posts?id=1" );
        done( );
      });
    });
  });

  describe( "subscribe", function( ) {
    it( "posts to /subscriptions/Project/:id/subscribe", function( done ) {
      nock( "http://localhost:3000" ).
        post( "/subscriptions/Project/1/subscribe" ).
        reply( 200, { id: 1 } );
      projects.subscribe({ id: 1 }).then( function( ) {
        done( );
      });
    });
  });

  describe( "subscriptions", function( ) {
    it( "gets posts", function( done ) {
      nock( "http://localhost:4000" ).
        get( "/v1/projects/1/subscriptions?id=1" ).
        reply( 200, testHelper.mockResponse );
      projects.subscriptions( { id: 1 } ).then( function( r ) {
        expect( r.test_uri ).to.eq( "/v1/projects/1/subscriptions?id=1" );
        done( );
      });
    });
  });

});
