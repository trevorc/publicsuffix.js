var assert = require('assert');
var publicsuffix = require('./publicsuffix');


var tests =
  [ [ 'jp', { publicSuffix: 'jp' } ]
  , [ 'www.nht.ac.jp', { publicSuffix: 'ac.jp', domain: 'nht'
                       , subdomain: 'www'
                       } ]
  , [ 'www.dt.ntdent.ac.jp', { publicSuffix: 'ac.jp', domain: 'ntdent'
                             , subdomain: 'www.dt'
                             } ]
  , [ 'www.library.city.kameoka.kyoto.jp'
    , { publicSuffix: 'kameoka.kyoto.jp', domain: 'city'
      , subdomain: 'www.library'
      } ]
  , [ 'www.pref.kyoto.jp', { publicSuffix: 'kyoto.jp', domain: 'pref'
                           , subdomain: 'www'
                           } ]
  , [ 'metro.tokyo.jp', { publicSuffix: 'tokyo.jp', domain: 'metro' } ]
  , [ 'omg.yahoo.com', { publicSuffix: 'com', domain: 'yahoo'
                       , subdomain: 'omg'
                       } ]
  , [ 'trevor.caira.com', { publicSuffix: 'com', domain: 'caira'
                          , subdomain: 'trevor'
                          } ]
  , [ '西交利物浦大学.中国', { publicSuffix: '中国'
                             , domain: '西交利物浦大学'
                             } ]
  , [ 'www.bcd.pvt.k12.ma.us', { publicSuffix: 'pvt.k12.ma.us'
                               , domain: 'bcd'
                               , subdomain: 'www'
                               } ]
  ];

var i, netloc, parsed, expected;

for (i = 0; i < tests.length; ++i) {
  netloc = tests[i][0];
  expected = tests[i][1];
  parsed = publicsuffix.parse(netloc);
  assert.deepEqual(parsed, expected);
}
console.log('' + tests.length + ' tests passed.');
