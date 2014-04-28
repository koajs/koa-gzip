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
  options = options || {};
  // https://developers.google.com/speed/docs/best-practices/payload#GzipCompression
  options.minLength = Number(options.minLength) || 150;

  return function *gzip(next) {
    yield *next;

    var body = this.body;

    if (200 !== this.status
        || !body
        || this.acceptsEncodings('gzip') !== 'gzip'
        || this.response.header['content-encoding']) {
      return;
    }

    // TODO: Stream body
    if ('function' === typeof body.pipe) {
      this.set('content-encoding', 'gzip');
      this.remove('content-length');
      this.body = body.pipe(zlib.createGzip());
      return;
    }

    if (typeof body === 'string') {
      body = new Buffer(body);
    } else if (!Buffer.isBuffer(body)) {
      body = new Buffer(JSON.stringify(body));
    }

    if (body.length < options.minLength) {
      return;
    }

    var buf = yield _gzip(body);
    if (buf.length > body.length) {
      return;
    }

    this.set('content-encoding', 'gzip');
    this.body = buf;
  };
};
