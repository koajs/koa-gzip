/**!
 * koa-gzip - index.js
 *
 * Copyright(c) 2014
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

var zlib = require('zlib');
var thunkify = require('thunkify-wrap');

var _gzip = thunkify(zlib.gzip);

module.exports = function (options) {
  return function *gzip(next) {
    yield next;

    var body = this.body;

    if (200 !== this.status || !body || this.acceptsEncodings('gzip') !== 'gzip') {
      return;
    }

    // TODO: Stream body
    if ('function' == typeof body.pipe) {
      return;
    }

    if (typeof body === 'string') {
      body = new Buffer(body);
    } else if (!Buffer.isBuffer(body)) {
      body = new Buffer(JSON.stringify(body));
    }

    var buf = yield _gzip(body);
    if (buf.length > body.length) {
      return;
    }

    this.set('content-encoding', 'gzip');
    this.body = buf;
  };
};
