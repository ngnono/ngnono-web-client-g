'use strict';

require('./bootstrap')();
const env = process.env.NODE_ENV || 'development';

var fs = require('fs');
var config = require('config');

var chai = require('chai');

var GsbClient = require('../index');

var expect = chai.expect;
var assert = chai.assert;

let setting = config.sdk;
let route = {
    'sign.testGet': {
        uri: '/sign/testGet',
        method: 'GET',
        json: true
    },
    'sign.testPost': {
        uri: '/sign/testPost',
        method: 'POST',
        json: true
    },
    'upload.upload': {
        uri: '/upload/upload',
        method: 'POST'
    },
    'upload.upload1': {
        uri: '/upload/upload1',
        method: 'POST'
    }
};

let gsbClient = new GsbClient(setting, route);
gsbClient.use(function (options, done) {
    options = options || {};
    if (options.params && options.params.httpToken) {
        options.requestOptions = options.requestOptions || {};
        options.requestOptions.headers = options.requestOptions.headers || {};
        options.requestOptions.headers['X-Token'] = options.params.httpToken;
    }

    done(null, options);
});

gsbClient.on('error', function (err) {
    console.error(err);
});

describe('gsbClient', function () {
    describe('# test get post', function () {
        it('testGet', function (done) {
            this.token = 'xxxxx';

            var p = gsbClient.sign.testGet.call(this, {
                qs: {
                    a: 1,
                    b: 'adadf'
                },
                headers: {
                    'X-Token': 'sxxxx'
                }
            });

            p.then(function (body) {
                //console.log('body:%s', JSON.stringify(body));
                expect(body).to.not.equal(null);
                expect(body).to.have.property('status').that.equal(true);

                done();
            }, function (err) {
                done(err);
            }).catch(function (err) {
                done(err);
            });
        });

        it('testPost_0', function (done) {
            var p = gsbClient.sign.testPost.call(this, {
                qs: {
                    a: 1,
                    b: 'adadf'
                },
                body: {
                    json: 'xxfffasdf', ppppp: 12343434,
                    xml: '没有'
                },
                headers: {
                    'X-Token': 'sxxxx'
                }
            });

            p.then(function (body) {
                //console.log('body:%s', JSON.stringify(body));
                expect(body).to.not.equal(null);
                expect(body).to.have.property('status').that.equal(true);

                done();
            }, function (err) {
                done(err);
            }).catch(function (err) {
                done(err);
            });
        });

        it('testPost_1', function (done) {
            var p = gsbClient.sign.testPost.call(this, {
                qs: {
                    a: 1,
                    b: 'adadf'
                },
                body: {
                    json: 'xxfffasdf', ppppp: 12343434, awp2: 122,
                    '1xml': '没有'
                },
                headers: {
                    'X-Token': 'sxxxx'
                }
            });

            p.then(function (body) {
                //console.log('body:%s', JSON.stringify(body));
                expect(body).to.not.equal(null);
                expect(body).to.have.property('status').that.equal(true);

                done();
            }, function (err) {
                done(err);
            }).catch(function (err) {
                done(err);
            });
        });


    })
});


describe('gsbClientV2', function () {
    describe('# test upload', function () {
        it('testUploadFiles', function (done) {

            this.timeout(20000);

            var formData = {
                my_field: 'my_value',
                my_file: fs.createReadStream(__dirname + '/config/default.yml')
            };
            var p = gsbClient.upload.upload1({
                formData: formData,
                json: true,
                qs: {a: 'w', xy: 6, c: 5}
            });

            p.then(function (body) {
                //console.log('body:%s', JSON.stringify(body));
                expect(body).to.not.equal(null);
                expect(body).to.have.property('status').that.equal(true);

                done();
            }, function (err) {
                done(err);
            }).catch(function (err) {
                console.error(err);
                done(err);
            });
        });

    })
});