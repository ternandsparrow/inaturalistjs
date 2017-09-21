"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Taxon = require( "../models/taxon" );

var computervision = class computervision {
  static score_image( params ) {
    return iNaturalistAPI.upload( "computervision/score_image", params ).then( response => {
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

  static score_observation( params ) {
    return iNaturalistAPI.get( "computervision/score_observation/:id", params, { useAuth: true } ).
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
