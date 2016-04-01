var expect = require( "chai" ).expect,
    Model = require( "../../lib/models/model" );

describe( "Model", function( ) {
  describe( "constructor", function( ) {
    it( "populates model attributes", function( ) {
      var o = new Model({ name: "modelname" });
      expect( o.constructor.name ).to.eq( "Model" );
      expect( o.name ).to.eq( "modelname" );
    });
  });

  describe( "typifyResultsResponse", function( ) {
    it( "turns response results into types", function( ) {
      var r = { results: [{ name: "modelname" }] };
      expect( r.results[0].constructor.name ).to.eq( "Object" );
      Model.typifyResultsResponse( r, Model );
      expect( r.results[0].constructor.name ).to.eq( "Model" );
      expect( r.results[0].name ).to.eq( "modelname" );
    });

    it( "does nothing if there are no results", function( ) {
      var r = { count: 156 };
      Model.typifyResultsResponse( r, Model );
      expect( r ).to.deep.eq({ count: 156 });
    });
  });
});
