What is Hydra?
================

Hydra exposes the renderToString() and renderToStaticMarkup() methods within React.js as a HTTP service. It is intended as a way of using a React.js front-end without losing the benefits of SEO in non-javascript server languages.

Installation
================

Install it with npm along with your other node_modules

```
npm install react-hydra
```

Configuration
===============

Hydra can be configured via two methods:

 - a *react-hydra.json* file placed in the same location as hydras *app.js*
 - a custom json file with a command line argument supplied with the call to node e.g. *node app.js config="path/to/config"*

Default Configuration
--------------

```
{
    "port": 10054
}
```

Sample Setup
==============

Here is a sample *package.json* file, the important part is the hydra script, this allows us to run the *npm run-script hydra* command and the service will share its react components with the main project without modification to require calls.

```
{
  "name": "impl",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "hydra": "node ./node_modules/react-hydra/app.js config=\"path/to/my/custom/hydra.json\""
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.12.4",
    "react-hydra": "1.0.0"
  }
}
```

Usage
=============

The Hydra service is a simple HTTP server that is listening for requests on *http://localhost:<port>/renderToString/<react_component_name>* and *http://localhost:<port>/renderToStaticMarkup/<react_component_name>*. Where *<react_component_name>* is the same string you would use in a require statement.

Requests
-------------

Requests have the following rules:

 - the request must be a POST
 - the body of the request must be the *application/json* type
 - the body of the request must be at least an empty json object

The body of the request is the object that is passed to the react components props.

```
POST /renderToString/test/foo.js HTTP/1.1
Host: localhost:10054
Content-Type: application/json
Cache-Control: no-cache

{
    "name": "test"
}
```

Responses
-------------

If the request is valid the response is a HTML string containing the rendered markup. Otherwise the appropriate HTTP code is returned.





Copyright (c) 2015, Adam Kent
All rights reserved.

This project is licensed under the terms of the Modified BSD License.
