var path = require('path');
var should = require('should');

var _ = require('underscore');
var react = require('react');

var createRenderToStringHandlerMock = function (req, res) {

    return require(
        path.join(process.cwd(), './app/renderHandler'))({

            post: function (a, b, cb) {

                if (a === '/renderToString/*') {

                    cb(req, res);

                }

            }

        }, {}, react);

};

var createRenderToStaticMarkupHandlerMock = function (req, res) {

    return require(
        path.join(process.cwd(), './app/renderHandler'))({

            post: function (a, b, cb) {

                if (a === '/renderToStaticMarkup/*') {

                    cb(req, res);

                }

            }

        }, {}, react);

};

var createReqMock = function (body) {

    return {

        'body': body

    };

};

var createResMock = function (onStatus, onJson, onSend) {

    var m = {

        json: function (obj) {

            if (typeof onJson === 'function') {

                onJson(obj);

            }

        },


        send: function (html) {

            if (typeof onSend === 'function') {

                onSend(html);

            }

        }

    };

    m.status = function (stat) {

        if (typeof onStatus === 'function') {

            onStatus(stat);

        }

        return m;

    };

    return m;

};

describe('render', function () {

    describe('#handleRender', function () {

        it('should return a 400 if no json body has been supplied', function (done) {

            var rh = createRenderToStringHandlerMock(

                createReqMock(),


                createResMock(

                    function (stat) {

                        stat.should.equal(400);

                        done();

                    }

                )

            );

        });

        it('should return a 404 if the component could not be loaded/found', function (done) {

            var rh = createRenderToStringHandlerMock(

                _.extend(createReqMock({}), {

                    params: ['nonexistantcomponent']

                }),


                createResMock(

                    function (stat) {

                        stat.should.equal(404);

                        done();

                    }

                )

            );

        });

        it('should find a local module if one isnt installed to the node_modules folder', function (done) {

            var rh = createRenderToStringHandlerMock(

                _.extend(createReqMock({

                    name: 'test'

                }), {

                    params: ['test/foo.js']

                }),


                createResMock(null, null, function (html) {

                    html.should.be.ok;

                    done();

                })

            );

        });

        it('should return a string of markup if the component path and viewmodel are valid', function (done) {

            var rh = createRenderToStringHandlerMock(

                _.extend(createReqMock({

                    name: 'test'

                }), {

                    params: ['test/foo.js']

                }),


                createResMock(null, null, function (html) {

                    html.should.be.type('string');

                    done();

                })

            );

        });

    });

    describe('POST /renderToString', function () {

        it('should return a string of markup containing data-reactid values', function (done) {

            var rh = createRenderToStringHandlerMock(

                _.extend(createReqMock({

                    name: 'test'

                }), {

                    params: ['test/foo.js']

                }),


                createResMock(null, null, function (html) {

                    var t = /^\<div data\-reactid.*\>\<span.*\>Hello\ \<\/span\>\<span.*\>test\<\/span\>\<\/div\>$/.test(html);

                    t.should.equal(true);

                    done();

                })

            );

        });

    });

    describe('POST /renderToStaticMarkup', function () {

        it('should return a string of markup without data-reactid values', function (done) {

            var rh = createRenderToStaticMarkupHandlerMock(

                _.extend(createReqMock({

                    name: 'test'

                }), {

                    params: ['test/foo.js']

                }),


                createResMock(null, null, function (html) {

                    html.should.equal("<div>Hello test</div>");

                    done();

                })

            );

        });

    });

});
