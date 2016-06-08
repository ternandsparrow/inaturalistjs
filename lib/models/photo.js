"use strict";
var Model = require( "./model" );

var Photo = class Photo extends Model {

  photoUrl( size ) {
    this.cachedPhotos = this.cachedPhotos || {};
    size = size || "square";
    if ( this.cachedPhotos[size] ) {
      return this.cachedPhotos[size];
    }
    if ( !this.url ) { return }
    else {
      this.cachedPhotos[size] = this.url.replace( "square", size );
    }
    return this.cachedPhotos[size];
  }
}

module.exports = Photo;
