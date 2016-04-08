/**
 * User: ngnono
 * Date: 16-4-8
 * Time: 下午8:50
 * To change this template use File | Settings | File Templates.
 *
 * Copy li-sdk
 *
 * edit _handler fn
 */

'use strict';

var events = require('events');
var util = require('util');
var _ = require('lodash');
var request = require('request');
var async = require('async');
var promise = Promise || require('promise');

/**
 * sdk constructor
 * @param routes  routes of api
 * @param settings the options of api
 * @constructor
 */
function Sdk(settings, routes) {

    this._settings = settings || {};
    this._request = settings.request || request;
    this._baseUrl = settings.baseUrl || '';
    this._routes = routes || [];
    this._handlers = [];

    events.EventEmitter.call(this);
    this._initRoutes();
}

util.inherits(Sdk, events.EventEmitter);

/**
 * init Routes
 * @private
 */
Sdk.prototype._initRoutes = function () {
    var self = this;
    var routes = self._routes;

    Object.keys(routes).forEach(function (key) {
        var route = routes[key];
        var spaces = key.split('.');

        var context = self;
        spaces.forEach(function (space) {
            context[space] = (context[space] === undefined) ? self._handler(key, route, self._baseUrl) : context[space];
            context = context[space];
        });
    });
};


/**
 * handler the api interface
 * @param route
 * @param baseUrl
 * @private
 */
Sdk.prototype._handler = function (name, route, baseUrl) {

    var self = this;
    return function (params) {
        return new promise(function (resolve, reject) {

            /**
             * http method (default: "GET")
             * @type {*|string}
             */
            route.method = route.method || 'GET';

            /**
             * params default { qs,body,header.....} like request.
             * @type {*|{}}
             */
            params = params || {};

            /**
             * 'HEAD', 'GET', 'DELETE'
             * if route contains ':' to process route url
             * example:/users/:id
             */
            var qs = params.qs = params.qs || {};

            var uri = (route.uri || '').replace(/:(\w+)/g, function (all, name) {
                var result = qs[name] === undefined ? all : qs[name];
                delete qs[name];

                return result;
            });

            //default
            var requestOptions = {
                uri: uri.indexOf('http://') > -1 ? uri : baseUrl + uri,
                json: true,
                method: route.method
            };

            _.merge(requestOptions, params);

            var processRequestCallback = function (error, response, body) {

                self.emit('after', error, body);
                self.emit(name + ':after', error, body);

                if (error) {
                    self.emit('error', error);
                    return reject(error);
                }

                return resolve(body);
            };

            var processRequest = function (error, options) {
                self.emit('before', error, options);
                self.emit(name + ':before', error, options);

                if (error) {
                    return reject(error);
                }

                self._request(options.requestOptions, processRequestCallback);
            };

            var steps = _.union([function (callback) {
                callback(null, {
                    params: params,
                    requestOptions: requestOptions,
                    settings: self._settings,
                    api: name
                });
            }], self._handlers);

            async.waterfall(steps, processRequest);
        });
    };
};

/**
 * 设置中间件
 * @param handler Function(options,next)
 * options:{params:params,options:options api:api}
 * @api public
 */
Sdk.prototype.use = function (handler) {
    if (!_.isFunction(handler)) {
        throw new Error('use argument must be Function');
    }
    this._handlers.push(handler);
};

module.exports = Sdk;
