"use strict";
var Model = require( "./model" );

var Photo = class Photo extends Model {

  static typifyResponse( response ) {
    return super.typifyResponse( response, Photo );
  }

  photoUrl( size ) {
    this.cachedPhotos = this.cachedPhotos || {};
    size = size || "square";
    if ( this.cachedPhotos[size] ) {
      return this.cachedPhotos[size];
    }
    if ( !this.url ) { return }
    else {
      this.cachedPhotos[size] = this.url.replace( /square.(jpe?g|png|gif|\?)/i, ( match, $1 ) => {
        return `${size}.${$1}`;
      });
      this.cachedPhotos[size] = this.cachedPhotos[size].replace( /\/square\//, `/${size}/` );
    }
    return this.cachedPhotos[size];
  }
}

module.exports = Photo;
