# inaturalistjs
JavaScript package for iNaturalist.org. Supports CRUD for iNat data.

#### Searching Observations
```javascript
import iNaturalistJS from "inaturalistjs";

iNaturalistJS.observations.search({ taxon_id: 4 }).
  then( function( response ) { });
```

#### Creating Comments
```javascript
var params = {
  comment: {
    body: "... comment body ...",
    parent_type: "Observation",
    parent_id: 12345,
    user_id: 67890
  },
  api_token: "... iNaturalist API token ..."
};

iNaturalistJS.comments.create( params ).
  then( function( comment ) { });
```
