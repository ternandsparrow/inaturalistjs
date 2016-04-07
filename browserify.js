module.exports = {
  comments: require( "./lib/endpoints/comments" ),
  identifications: require( "./lib/endpoints/identifications" ),
  observations: require( "./lib/endpoints/observations" ),
  observationFieldValues: require( "./lib/endpoints/observation_field_values" ),
  photos: require( "./lib/endpoints/photos" ),
  projects: require( "./lib/endpoints/projects" ),
  taxa: require( "./lib/endpoints/taxa" ),
  Comment: require( "./lib/models/comment" ),
  Identification: require( "./lib/models/identification" ),
  Observation: require( "./lib/models/observation" ),
  ObservationFieldValue: require( "./lib/models/observation_field_value" ),
  Photo: require( "./lib/models/photo" ),
  Taxon: require( "./lib/models/taxon" )
};
