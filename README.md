# inaturalistjs
[![Build Status](https://travis-ci.org/inaturalist/inaturalistjs.svg?branch=master)](https://travis-ci.org/inaturalist/inaturalistjs)
[![Coverage Status](https://coveralls.io/repos/github/inaturalist/inaturalistjs/badge.svg?branch=master)](https://coveralls.io/github/inaturalist/inaturalistjs?branch=master)

JavaScript package for iNaturalist.org. Supports CRUD for iNat data. This
is an isomorphic library that can be used in the browser and within
node.js code. Each method returns a JavaScript Promise

#### Simple Example
```javascript
import inatjs from "inaturalistjs";
inatjs.observations.search({ taxon_id: 4 }).then( rsp => { });
```

#### Creating Records

Create and update methods accept a JSON object with the new instance properties
nested under the instance class name

```javascript
var params = {
  comment: {
    body: "... comment body ...",
    parent_type: "Observation",
    parent_id: 12345,
    user_id: 67890
  }
};
inatjs.comments.create( params ).then( c => { } );
```

#### Updating Records

Updates also need the ID of the record being updated

```javascript
var params = {
  id: 1,
  comment: { ... }
};
inatjs.comments.update( params ).then( c => { } );
```

#### Deleting Records

Deletes only need the ID

```javascript
inatjs.comments.delete({ id: 1 }).then( () => { } );
```

#### Errors

Any non-200 response code is considered an error, and the promise will fail. Be
sure to catch these errors:

inatjs.comments.delete({ id: 0 }).then( () => { }).catch( e => {
  console.log( "Delete failed:", e );
})

#### API Token

In order to use methods requiring authentication, you'll need to use an
iNaturalist API Token. For now, these are found at
http://www.inaturalist.org/users/api_token . If running in the browser,
iNaturalistJS will look for an `inaturalist-api-token` meta tag and use that for
authenticating requests

```
<meta name="inaturalist-api-token" content="... api token ...">
```

Alternatively, the token can be passed as an option

```javascript
var options = { api_token: "... iNaturalist API token ..." };
inatjs.comments.create( params, options ).then( c => { } );
```

#### CSRF Token (intrasite only)

If you happen to be running the iNaturalist Rails codebase, CSRF tokens can
be used for authenticating requests made from the browser. If a CSRF token is
available, all requests will be made to the same origin from which the call
was made. iNaturalistJS will look for the following meta tags

```
<meta name="csrf-param" content="... param ...">
<meta name="csrf-token" content="... token ...">
```

Alternatively, the token can be passed as a parameter (use the actual
name of the paramater and not csrf_param)

```javascript
var params = {
  csrf_param: "... csrf token ..."
  comment: { ... }
};
inatjs.comments.create( params ).then( c => { } );
```

#### Available Methods

##### Public

```
inatjs.observations.fetch( params, opts ).then( rsp => { ... } );
inatjs.observations.search( params, opts ).then( rsp => { ... } );

inatjs.taxa.fetch( params, opts ).then( rsp => { ... } );
inatjs.taxa.autocomplete( params, opts ).then( rsp => { ... } );
```

##### Authenticated

```
inatjs.comments.create( params, opts ).then( c => { ... } );
inatjs.comments.update( params, opts ).then( c => { ... } );
inatjs.comments.delete( params, opts ).then( () => { ... } );

inatjs.identifications.create( params, opts ).then( i => { ... } );
inatjs.identifications.update( params, opts ).then( i => { ... } );
inatjs.identifications.delete( params, opts ).then( () => { ... } );

inatjs.observations.create( params, opts ).then( o => { ... } );
inatjs.observations.update( params, opts ).then( o => { ... } );
inatjs.observations.delete( params, opts ).then( () => { ... } );

inatjs.projects.join( params, opts ).then( () => { ... } );
inatjs.projects.leave( params, opts ).then( () => { ... } );
```