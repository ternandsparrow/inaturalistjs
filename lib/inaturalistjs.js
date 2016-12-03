var iNaturalistAPI = require( "./inaturalist_api" );

module.exports = {
  setConfig: iNaturalistAPI.setConfig,
  comments: require( "./endpoints/comments" ),
  identifications: require( "./endpoints/identifications" ),
  observationFieldValues: require( "./endpoints/observation_field_values" ),
  observations: require( "./endpoints/observations" ),
  photos: require( "./endpoints/photos" ),
  places: require( "./endpoints/places" ),
  posts: require( "./endpoints/posts" ),
  projects: require( "./endpoints/projects" ),
  taxa: require( "./endpoints/taxa" ),
  users: require( "./endpoints/users" ),
  Comment: require( "./models/comment" ),
  Identification: require( "./models/identification" ),
  Observation: require( "./models/observation" ),
  ObservationFieldValue: require( "./models/observation_field_value" ),
  Photo: require( "./models/photo" ),
  Place: require( "./models/place" ),
  Post: require( "./models/post" ),
  Project: require( "./models/project" ),
  Taxon: require( "./models/taxon" ),
  User: require( "./models/user" )
};
