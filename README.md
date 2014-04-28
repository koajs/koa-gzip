koa-gzip
=======

[![Build Status](https://secure.travis-ci.org/node-modules/koa-gzip.png)](http://travis-ci.org/node-modules/koa-gzip)

[![Dependency Status](https://gemnasium.com/node-modules/koa-gzip.png)](https://gemnasium.com/node-modules/koa-gzip)

[![NPM](https://nodei.co/npm/koa-gzip.png?downloads=true&stars=true)](https://nodei.co/npm/koa-gzip/)

![logo](https://raw.github.com/node-modules/koa-gzip/master/logo.png)

`gzip` support for [koa](https://github.com/koajs/koa) responses.

## Install

```bash
$ npm install koa-gzip
```

## Usage

```js
var koa = require('koa');
var gzip = require('koa-gzip');

var app = koa();
koa.use(gzip());
```

### gzip always be the last middleware

If you using other response middlewares, like [etag](https://github.com/koajs/etag), just use `gzip` be the first.

```js
app.use(gzip());
app.use(fresh());
app.use(etag());

client => request => gzip() => fresh() => etag() => logic codes
                                                        ||
            client <= gzip() <= fresh() <= etag() <= response
```

## License

(The MIT License)

Copyright (c) 2014 fengmk2 &lt;fengmk2@gmail.com&gt; and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
