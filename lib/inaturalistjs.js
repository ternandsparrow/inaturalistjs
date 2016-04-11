module.exports = {
  comments: require( "./endpoints/comments" ),
  identifications: require( "./endpoints/identifications" ),
  observations: require( "./endpoints/observations" ),
  observationFieldValues: require( "./endpoints/observation_field_values" ),
  photos: require( "./endpoints/photos" ),
  projects: require( "./endpoints/projects" ),
  taxa: require( "./endpoints/taxa" ),
  Comment: require( "./models/comment" ),
  Identification: require( "./models/identification" ),
  Observation: require( "./models/observation" ),
  ObservationFieldValue: require( "./models/observation_field_value" ),
  Photo: require( "./models/photo" ),
  Taxon: require( "./models/taxon" )
};
