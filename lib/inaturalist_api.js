"use strict";
var fetch = require( "isomorphic-fetch" ),
    querystring = require( "querystring" ),
    util = require( "./util" ),
    iNaturalistAPIResponse = require( "./models/inaturalist_api_response" );

var iNaturalistAPI = class iNaturalistAPI {
  static fetch( route, ids, params ) {
    if( !Array.isArray( ids ) ) { ids = [ ids ]; }
    var query = "";
    if( params ) {
      query = `?${ querystring.stringify( params ) }`;
    }
    return fetch( `${ iNaturalistAPI.apiHostProtocol }${ iNaturalistAPI.apiHost }` +
                  `/${ route }/${ ids.join(",") }${ query }` ).
      then( iNaturalistAPI.thenCheckStatus ).
      then( iNaturalistAPI.thenText ).
      then( iNaturalistAPI.thenJson ).
      then( iNaturalistAPI.thenWrap );
  }

  static get( route, params ) {
    var query = "";
    if( params ) {
      query = `?${ querystring.stringify( params ) }`;
    }
    return fetch( `${ iNaturalistAPI.apiHostProtocol }${ iNaturalistAPI.apiHost }` +
                  `/${ route }${ query }` ).
      then( iNaturalistAPI.thenCheckStatus ).
      then( iNaturalistAPI.thenText ).
      then( iNaturalistAPI.thenJson ).
      then( iNaturalistAPI.thenWrap );
  }

  static post( route, params, options ) {
    options = options || { };
    params = Object.assign( { }, params );
    // interpolate path params, e.g. /:id => /1
    var interpolated = iNaturalistAPI.interpolateRouteParams( route, params );
    if( interpolated.err ) { return interpolated.err; }
    var thisRoute = interpolated.route;
    // set up request headers
    var headers = {
      Accept: "application/json",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE, HEAD"
    };
    // set up authentication
    var csrf = iNaturalistAPI.csrf( );
    var apiToken = iNaturalistAPI.apiToken( options );
    if ( apiToken ) {
      headers.Authorization = apiToken;
    } else if( csrf ) {
      params[ csrf.param ] = csrf.token;
    }
    // get the right host to send requests
    var host = iNaturalistAPI.methodHostPrefix( options );
    // make the request
    var body;
    if( options.upload ) {
      body = new FormData( );
      for( var k in params ) {
        body.append( k, params[ k ] );
      }
    } else {
      headers[ "Content-Type" ] = "application/json";
      body = JSON.stringify( params );
    }
    let fetchOpts = {
      method: ( options.method || "post" ),
      credentials: ( options.same_origin ? "same-origin" : undefined ),
      headers: headers
    };
    if ( options.method !== "head" ) {
      fetchOpts.body = body;
    }
    return fetch( `${ host }/${ thisRoute }`, fetchOpts ).
      then( iNaturalistAPI.thenCheckStatus ).
      then( iNaturalistAPI.thenText ).
      then( iNaturalistAPI.thenJson );
  }

  // a variant of post using the http PUT method
  static head( route, params, options ) {
    options = Object.assign( { }, options, { method: "head" } );
    return iNaturalistAPI.post( route, params, options );
  }

  // a variant of post using the http PUT method
  static put( route, params, options ) {
    options = Object.assign( { }, options, { method: "put" } );
    return iNaturalistAPI.post( route, params, options );
  }

  // a variant of post using the http DELETE method
  static delete( route, params, options ) {
    options = Object.assign( { }, options, { method: "delete" } );
    return iNaturalistAPI.post( route, params, options );
  }

  static upload( route, params, options ) {
    options = Object.assign( { }, options, { method: "post", upload: true } );
    return iNaturalistAPI.post( route, params, options );
  }

  static methodHostPrefix( options ) {
    if( options.same_origin ) { return ""; }
    return `${ iNaturalistAPI.writeHostProtocol }${ iNaturalistAPI.writeApiHost }`;
  }

  static csrf( ) {
    var param = util.browserMetaTagContent( "csrf-param" );
    var token = util.browserMetaTagContent( "csrf-token" );
    if( param && token ) {
      return { param: param, token: token };
    }
  }

  static apiToken( options ) {
    var token = util.browserMetaTagContent( "inaturalist-api-token" );
    if( token ) { return token; }
    return options.api_token;
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

  static thenText( response ) {
    // not using response.json( ) as there may be no JSON
    return response.text( );
  }

  static thenJson( text ) {
    if( text ) { return JSON.parse( text ); }
    return text;
  }

  static thenWrap( response ) {
    return new iNaturalistAPIResponse( response );
  }

  static setConfig( config ) {
    config = config || { };
    var envHostConfig =
      util.browserMetaTagContent( "config:inaturalist_api_host" ) ||
      util.nodeENV( "API_HOST" );
    var envWriteHostConfig =
      util.browserMetaTagContent( "config:inaturalist_write_api_host" ) ||
      util.nodeENV( "WRITE_API_HOST" );
    iNaturalistAPI.apiHost =
      config.apiHost || envHostConfig || "localhost:4000/v1";
    iNaturalistAPI.writeApiHost =
      config.writeApiHost || envWriteHostConfig || "localhost:3000";
    iNaturalistAPI.apiHostProtocol = config.apiHostSSL ? "https://" : "http://";
    iNaturalistAPI.writeHostProtocol = config.writeHostSSL ? "https://" : "http://";
  }

  static interpolateRouteParams( route, params ) {
    var err, matches = route.match(/(:[a-z]+)(?=\/|$)/g);
    if( matches ) {
      matches.forEach( sym => {
        if( err ) { return; }
        var v = sym.substring( 1 );
        if( params && params[ v ] ) {
          route = route.replace( sym, params[ v ] );
        } else {
          err = new Promise( function( res, rej ) {
            rej( new Error( `${ v } required` ) );
          });
        }
      });
    }
    return { route: route, err: err };
  }

};

iNaturalistAPI.setConfig( );

module.exports = iNaturalistAPI;
