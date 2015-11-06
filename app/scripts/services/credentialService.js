'use strict';

/**
 * @ngdoc service
 * @name kickerleagueClientApp.Games
 * @description
 * # Games
 * Factory in the kickerleagueClientApp.
 */
angular.module('kickerleagueClientApp')
        .factory('CredentialService', function (md5) {

            var name = null;
            var password = null;
            return {
                reset: function () {
                    name = null;
                    password = null;
                },
                setName: function (leName) {
                    name = leName;
                },
                getName: function () {
                    window.console.info('bubu');
                    return name;
                },
                setPassword: function (lePass) {
                    password = lePass;
                },
                getPassword: function () {
                    return password;
                },
                isSet: function () {
                    if (name === null && password === null) {
                        return false;
                    }
                    return true;
                },
                generateDigestHeader: function (headers, path, method) {
                    var name = this.getName();
                    var pass = this.getPassword();
                    var auth = headers('www-authenticate');
                    if (!auth) {
                        return null;
                    }

                    var nonce = auth.match('nonce="(.*?)"')[1];
                    var alg = auth.match('algorithm="(.*?)"')[1];
                    var realm = auth.match('realm="(.*?)"')[1];
                    var op = auth.match('opaque="(.*?)"')[1];
                    var qop = auth.match('qop="(.*?)"')[1];
                    var nc = '00000001'; // TODO: this needs to be count up
                    var cnonce = this.createNonce();

                    // create the hashes
                    var A1 = md5.createHash(name + ':' + realm + ':' + pass);
                    var A2 = md5.createHash(method + ':' + path);
                    var response = md5.createHash(A1 + ':' + nonce + ':' + nc + ':' + cnonce + ':' + qop + ':' + A2);
                    return {
                        'Authorization': 'Digest username="' + name + '", ' +
                                'realm="' + realm + '", ' +
                                'nonce="' + nonce + '", ' +
                                'cnonce="' + cnonce + '", ' +
                                'nc=' + nc + ', ' +
                                'qop=' + qop + ', ' +
                                'nonce="' + nonce + '", ' +
                                'opaque="' + op + '", ' +
                                'uri="' + path + '", ' +
                                'algorithm=' + alg + ', ' +
                                'response="' + response + '"'
                    };

                },
                /**
                 * copied and slightly changed from angular http digest
                 * @returns {String}
                 */
                createNonce: function () {
                    var length = 16;
                    var _chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var nonce = [];
                    var charsLength = _chars.length;
                    for (var i = 0; i < length; ++i)
                    {
                        nonce.push(_chars[Math.floor(Math.random() * charsLength)]);
                    }

                    return nonce.join('');
                }
            };
        });
