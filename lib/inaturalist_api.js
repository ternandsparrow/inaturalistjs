"use strict";
var fetch = require( "isomorphic-fetch" ),
    querystring = require( "querystring" ),
    iNaturalistAPIResponse = require( "./models/inaturalist_api_response" );

var iNaturalistAPI = class iNaturalistAPI {
  static basicFetch( route, ids ) {
    if( !Array.isArray( ids ) ) { ids = [ ids ]; }
    return fetch( `http://${ iNaturalistAPI.nodeApiHost }/${ route }/${ ids.join(",") }` ).
      then( iNaturalistAPI.thenCheckStatus ).
      then( iNaturalistAPI.thenJson ).
      then( iNaturalistAPI.thenWrap );
  }

  static basicSearch( route, params ) {
    var query = "";
    if( params ) {
      query = `?${ querystring.stringify( params ) }`;
    }
    return fetch( `http://${ iNaturalistAPI.nodeApiHost }/${ route }${ query }` ).
      then( iNaturalistAPI.thenCheckStatus ).
      then( iNaturalistAPI.thenJson ).
      then( iNaturalistAPI.thenWrap );
  }

  static basicPost( route, params, options ) {
    options = options || { };
    params = params || { };
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    if( options.api_token ) {
      headers.Authorization = options.api_token;
    }
    var host = iNaturalistAPI.railsApiHost;
    return fetch( `http://${ host }/${ route }`, {
      method: ( options.method || "post" ),
      credentials: ( options.same_origin ? "same-origin" : null ),
      headers: headers,
      body: JSON.stringify( params ) }).
      then( iNaturalistAPI.thenCheckStatus ).
      then( iNaturalistAPI.thenJson );
  }

  static basicUpdate( route, params, options ) {
    if( !params || !params.id ) {
      var p1 = new Promise( function( res, rej ) {
        rej( new Error( "ID required" ) );
      });
      return p1;
    }
    options = options || { };
    options = Object.assign( { }, options, { method: "put", rails: true } );
    return iNaturalistAPI.basicPost( `${ route }/${ params.id }`, params, options );
  }

  static basicDelete( route, params, options ) {
    if( !params || !params.id ) {
      var p1 = new Promise( function( res, rej ) {
        rej( new Error( "ID required" ) );
      });
      return p1;
    }
    options = options || { };
    options = Object.assign( { }, options, { method: "delete", rails: true } );
    return iNaturalistAPI.basicPost( `${ route }/${ params.id }`, params, options );
  }

  static thenCheckStatus( response ) {
    if( response.status >= 200 && response.status < 300 ) {
      return response;
    } else {
      var error = new Error( response.statusText );
      error.response = response;
      throw error;
    }
  }

  static thenJson( response ) {
    return response.json( );
  }

  static thenWrap( response ) {
    return new iNaturalistAPIResponse( response );
  }
};

iNaturalistAPI.nodeApiHost = "localhost:4000/v1";
iNaturalistAPI.railsApiHost = "localhost:3000";

module.exports = iNaturalistAPI;
