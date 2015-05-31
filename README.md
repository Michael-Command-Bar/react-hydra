What is Hydra?
================

Hydra exposes the renderToString() and renderToStaticMarkup() methods within React.js as a service. It is intended as a way of using a React.js front-end without losing the benefits of SEO in non-javascript server languages.

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

Copyright (c) 2015, Adam Kent
All rights reserved.

This project is licensed under the terms of the Modified BSD License.
