/**
 * User: ngnono
 * Date: 16-4-6
 * Time: 下午5:51
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var util = require('util');
var url = require('url');
var md5 = require('md5');
var qs = require('qs');
var debug = require('debug')('ngnono:webClient-g');

var Sdk = require('./lib/sdk');

const headerName = {
    consumerKeyName: 'X-ConsumerKey',
    signName: 'X-Sign'
};

function GsbClient(settings, routes) {
    Sdk.call(this, settings, routes);
    this.use(_signSdkMiddleware);
}

util.inherits(GsbClient, Sdk);

/**
 * 签名中间件
 * @param options
 * @param done
 * @private
 */
function _signSdkMiddleware(options, done) {

    debug(JSON.stringify(options));

    options = _verifyOptions(options);


    let method = options.requestOptions.method.toUpperCase();
    let pathAndQuery = url.parse(options.requestOptions.uri).path || '';
    let q = qs.stringify(options.requestOptions.qs || {}, {encode: false}) || '';

    let qsArr = [];
    //判断  path 是否有 ?

    qsArr.push(pathAndQuery);
    if (q && pathAndQuery.indexOf('?') === -1) {
        qsArr.push('?');
    } else {
        qsArr.push('&');
    }

    qsArr.push(q);


    let body;

    switch (method) {
        case 'PATCH':
        case 'POST':
        case 'PUT':
            body = options.requestOptions.body || '';
            break;
        default :
            body = '';
            break;
    }
    let consumerKey = options.settings.consumerKey || '';
    let secretKey = options.settings.secretKey || '';

    let vals = [
        method,
        qsArr.join(''),
        body,
        consumerKey,
        secretKey
    ];

    let signBefore = vals.join('').toUpperCase();
    debug('signBefore:%s', signBefore);
    let sign = md5(signBefore);
    debug('sign:%s', sign);

    options.requestOptions.headers[headerName.consumerKeyName] = consumerKey;
    options.requestOptions.headers[headerName.signName] = sign;

    done(null, options);
}

/**
 * 验证 options
 * @param options
 * @returns {*|{}}
 * @private
 */
function _verifyOptions(options) {
    options = options || {};
    options.requestOptions = options.requestOptions || {};
    options.settings = options.settings || {};
    options.requestOptions.headers = options.requestOptions.headers || {};

    return options;
}

/**
 * GSB WEB API client
 * @type {GsbClient}
 */
module.exports = GsbClient;
