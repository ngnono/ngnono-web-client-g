/**
 * User: ngnono
 * Date: 16-4-11
 * Time: 下午2:13
 * To change this template use File | Settings | File Templates.
 */

'use strict';


var debug = require('debug')('ngnono:bootstrap');

process.env.NODE_CONFIG_DIR = __dirname + '/config';
debug(process.env.NODE_CONFIG_DIR);

/**----------------------------------------------------------
 * set default config folder
 ----------------------------------------------------------*/
var Bootstrap = module.exports = function () {
    if (!(this instanceof Bootstrap)) return new Bootstrap;
};

Bootstrap.prototype.init = function () {
    debug('bootstrap.init');
};
