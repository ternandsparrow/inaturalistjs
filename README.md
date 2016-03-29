# inaturalistjs
[![Build Status](https://travis-ci.org/inaturalist/inaturalistjs.svg?branch=master)](https://travis-ci.org/inaturalist/inaturalistjs)
[![Coverage Status](https://coveralls.io/repos/github/inaturalist/inaturalistjs/badge.svg?branch=master)](https://coveralls.io/github/inaturalist/inaturalistjs?branch=master)

JavaScript package for iNaturalist.org. Supports CRUD for iNat data.

#### Searching Observations
```javascript
import iNaturalistJS from "inaturalistjs";

iNaturalistJS.observations.search({ taxon_id: 4 }).
  then( function( response ) { });
```

#### Creating Comments (with JWT api_token)
```javascript
var params = {
  comment: {
    body: "... comment body ...",
    parent_type: "Observation",
    parent_id: 12345,
    user_id: 67890
  }
};

var options = { api_token: "... iNaturalist API token ..." };

iNaturalistJS.comments.create( params, options ).
  then( function( comment ) { });
```

#### Creating Comments (intrasite, with csrf token)
```javascript
var params = {
  comment: {
    body: "... comment body ...",
    parent_type: "Observation",
    parent_id: 12345,
    user_id: 67890,
    authenticity_token: "... csrf token ..."
  }
};

var options = { same_origin: true };

iNaturalistJS.comments.create( params, options ).
  then( function( comment ) { });
```

#### Deleting Comments
```javascript
var params = { id: 123 };

var options = { api_token: "... iNaturalist API token ..." };

iNaturalistJS.comments.delete( params, options ).
  then( function( comment ) { });
```
