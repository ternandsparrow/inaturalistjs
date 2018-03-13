"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Taxon = require( "../models/taxon" );

var computervision = class computervision {
  static score_image( params, options ) {
    options = options || {};
    options.useAuth = true;
    options.apiURL = iNaturalistAPI.apiURL; // force the host to be the Node API
    return iNaturalistAPI.upload( "computervision/score_image", params, options ).then( response => {
      response.results = response.results.map( r => {
        r.taxon = new Taxon( r.taxon );
        return r;
      } );
      if ( response.common_ancestor ) {
        response.common_ancestor.taxon = new Taxon( response.common_ancestor.taxon );
      }
      return response;
    } );
  }

  static score_observation( params, options ) {
    options = options || {};
    options.useAuth = true;
    return iNaturalistAPI.get( "computervision/score_observation/:id", params, options ).
      then( response => {
        response.results = response.results.map( r => {
          r.taxon = new Taxon( r.taxon );
          return r;
        } );
        if ( response.common_ancestor ) {
          response.common_ancestor.taxon = new Taxon( response.common_ancestor.taxon );
        }
        return response;
      }
    );
  }

};

module.exports = computervision;
