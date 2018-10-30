const iNaturalistAPI = require( "../inaturalist_api" );
const ControlledTerm = require( "../models/controlled_term" );

const controlledTerms = class controlledTerms { // eslint-disable-line camelcase
  static for_taxon( params ) { // eslint-disable-line camelcase
    return iNaturalistAPI.get( "controlled_terms/for_taxon", params ).then( response => {
      const typifiedResponse = ControlledTerm.typifyResultsResponse( response );
      for ( let i = 0; i < typifiedResponse.results.length; i += 1 ) {
        if ( typifiedResponse.results[i] && !typifiedResponse.results[i].values ) {
          typifiedResponse.results[i].values = typifiedResponse.results[i].values.map(
            v => ( new ControlledTerm( v ) )
          );
        }
      }
      return typifiedResponse;
    } );
  }

  static search( params ) {
    return iNaturalistAPI.get( "controlled_terms", params, { } ).then( response => {
      const typifiedResponse = ControlledTerm.typifyResultsResponse( response );
      for ( let i = 0; i < response.results.length; i += 1 ) {
        if ( typifiedResponse.results[i] && !typifiedResponse.results[i].values ) {
          typifiedResponse.results[i].values = typifiedResponse.results[i].values.map(
            v => ( new ControlledTerm( v ) )
          );
        }
      }
      return typifiedResponse;
    } );
  }
};

module.exports = controlledTerms; // eslint-disable-line camelcase
