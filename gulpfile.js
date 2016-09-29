var gulp = require( "gulp" ),
    mocha = require( "gulp-mocha" ),
    webpack = require( "webpack-stream" );

gulp.task( "webpack", function( ) {
  return gulp.src( "" )
    .pipe( webpack( require( "./webpack.config.js" ) ) )
    .pipe( gulp.dest( "build" ) );
});

gulp.task( "watch", function( ) {
  gulp.watch( [ "lib/**/*.js" ], [ "webpack" ] );
});

gulp.task( "watch-mocha", function( ) {
  gulp.watch( [ "lib/**/*.js", "./test/**/*.js" ], [ "mocha" ] );
});

gulp.task( "mocha", function( ) {
  return gulp.src( [ "./test/**/*.js" ], { read: false })
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe( mocha( { recursive: true, reporter: "nyan" } ) )
});

gulp.task( "test", [ "webpack", "mocha" ] );

gulp.task( "default", [ "webpack", "watch", "watch-mocha" ] );
