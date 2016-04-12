# ngnono-web-client-g [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> 

## Installation

```sh
$ npm install --save ngnono-web-client-g
```

## Usage

```js

    var ngnonoWebClient = require('ngnono-web-client-g');
```

### 配置



```js

    let setting = {
    consumerKey: 'xxxxdefault'
    secretKey: '998998'
    baseUrl: 'http://192.168.18.31:8080/api'
    };

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


```

### GET


```js

            

            var p = gsbClient.sign.testGet({
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

                //OK
            }, function (err) {
                // reject
            }).catch(function (err) {
                //err
            });

```

### POST

```js

            var p = gsbClient.sign.testPost( {
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

                //OK
            }, function (err) {
                //reject
            }).catch(function (err) {
                //error
            });

```

### upload files

```js

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

                //ok
            }, function (err) {
                //reject
            }).catch(function (err) {
                console.error(err);
                //error
            });

```



## License

Apache-2.0 © [lianghongpeng](https://github.com/ngnono)




[npm-image]: https://badge.fury.io/js/ngnono-web-client-g.svg
[npm-url]: https://npmjs.org/package/ngnono-web-client-g
[travis-image]: https://travis-ci.org/ngnono/ngnono-web-client-g.svg?branch=master
[travis-url]: https://travis-ci.org/ngnono/ngnono-web-client-g
[daviddm-image]: https://david-dm.org/ngnono/ngnono-web-client-g.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ngnono/ngnono-web-client-g
