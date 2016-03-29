"use strict";
var Model = require( "./model" ),
    Taxon = require( "./taxon" );

var Observation = class Observation extends Model {

  static typifyResponse( response ) {
    const r = super.typifyResponse( response, Observation )
    r.results = r.results.map( o => {
      if ( o.taxon ) {
        o.taxon = new Taxon( o.taxon );
      }
      return o;
    });
    return r;
  }

  photo ( size ) {
    this.cachedPhotos = this.cachedPhotos || {};
    size = size || "square";
    if ( this.cachedPhotos[size] ) { 
      return this.cachedPhotos[size];
    }
    if ( this.photos && this.photos.length > 0 ) {
      let url = this.photos[0].url;
      if ( !url ) { return this.cachedPhotos[size]; }
      else {
        this.cachedPhotos[size] = url.replace( /square.(jpe?g|png|gif|\?)/i, ( match, $1 ) => {
          return `${size}.${$1}`;
        });
        this.cachedPhotos[size] = this.cachedPhotos[size].replace( /\/square\//, `/${size}/` );
      }
    }
    return this.cachedPhotos[size];
  }

  hasPhotos( ) {
    return this.photos && this.photos.length > 0;
  }

  hasSounds( ) {
    return this.sounds && this.sounds.length > 0;
  }

  hasMedia( ) {
    if ( this.hasPhotos( ) || this.hasSounds( ) ) {
      return true;
    }
    return false;
  }

};

module.exports = Observation;
