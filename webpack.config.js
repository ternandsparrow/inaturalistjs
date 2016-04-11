var path = require( "path" );

var config = {
  entry: "./lib/inaturalistjs.js",
  output: {
    filename: "inaturalistjs.js",
    path: path.resolve( __dirname, "../build" ),
    libraryTarget: "commonjs"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: { presets: [ "es2015" ] }
      }
    ]
  }
};

module.exports = config;
