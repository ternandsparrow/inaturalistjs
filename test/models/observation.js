var expect = require( "chai" ).expect,
    Observation = require( "../../lib/models/observation" );

describe( "Observation", function( ) {
  describe( "typifyResponse", function( ) {
    it( "turns response results into Observations", function( ) {
      var r = { results: [{ name: "modelname" }] };
      expect( r.results[0].constructor.name ).to.eq( "Object" );
      Observation.typifyResponse( r );
      expect( r.results[0].constructor.name ).to.eq( "Observation" );
      expect( r.results[0].name ).to.eq( "modelname" );
    });
  });
});
