var gulp = require( "gulp" ),
    webpack = require( "webpack-stream" );

gulp.task( "webpack", function( ) {
  return gulp.src( "" )
    .pipe( webpack( require( "./webpack.config.js" ) ) )
    .pipe( gulp.dest( "build" ) );
});

gulp.task( "watch", function( ) {
  gulp.watch( [ "lib/**/*.js" ], [ "webpack" ] );
});

gulp.task( "default", [ "webpack", "watch" ] );
