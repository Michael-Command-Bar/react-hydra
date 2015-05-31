var path = require('path');

module.exports = function (app, jsonParser, react) {

    var _handleRender = function (includeChecksums, req, res) {

        if (!req.body) {

            // no body, malformed request

            res.status(400)
               .json({

                error: {

                    message: 'no viewmodel was supplied with the request, you must supply a json object in the body of the request (even if it is an empty object)'

                }

            });

            return;

        }

        var componentPath = req.params[0];

        var component;

        try {

            component = require(componentPath);

        } catch (ex) {

            // component missing, try a local path

            try {

                component = require(
                    path.join(process.cwd(), componentPath));

            } catch (ex2) {

                // component doesnt exist

                res.status(404)
                   .json({

                    error: {

                        message:
                            'the requested component "{0}" could not be found/loaded\nreason: "{1}"'
                                .replace('{0}', componentPath)
                                .replace('{1}', ex2.message)

                    }

                });

                return;

            }

        }

        var html;

        if (includeChecksums) {

            html = react.renderToString(
                react.createElement(component, req.body));

        } else {

            html = react.renderToStaticMarkup(
                react.createElement(component, req.body));

        }

        res.send(html);

    };

    app.post(
        '/renderToString/*',
        jsonParser,
        function (req, res) {

            return _handleRender(true, req, res);

        });

    app.post(
        '/renderToStaticMarkup/*',
        jsonParser,
        function (req, res) {

            return _handleRender(false, req, res);

        });

}
