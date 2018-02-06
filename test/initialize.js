var iNaturalistAPI = require( "../lib/inaturalist_api" );

beforeEach( function( ) {
  iNaturalistAPI.setConfig({
    apiURL: "http://localhost:4000/v1",
    writeApiURL: "http://localhost:3000"
  })
});

