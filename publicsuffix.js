var fs = require('fs');
var path = require('path');


var SKIP_LINE = /^\s*(\/\/|$)/;
var suffixTree = {};
var suffixList = path.join(__dirname, 'effective_tld_names.dat');


function simplify(node) {
  for (k in node) if (node.hasOwnProperty(k) && node[k] &&
                      node[k].constructor === Object) {
    if (node[k] === {}) node[k] = true;
    else simplify(node[k]);
  }
}

function parseSuffixes(list) {
  var items = list.split('\n');
  var entry;
  var tree = {};

  items.forEach(function(entry) {
    var i;
    var part;
    var parts;
    var subtree = tree;

    if (SKIP_LINE.exec(entry)) return;
    parts = entry.trim().split('.').reverse();

    parts.forEach(function(part) {
      if (part[0] === '!') {
        if (!subtree['!']) subtree['!'] = [];
        subtree['!'].push(part.slice(1));
      } else {
        if (!subtree[part]) subtree[part] = {}
        subtree = subtree[part];
      }
    });
  });
  return tree;
}

function parse(domain) {
  var i;
  var res = {};
  var node = suffixTree;
  var part;
  var parts = domain.split('.').reverse();

  for (i = 0; node && i < parts.length; ++i, node = node[part]) {
    part = parts[i];
    if (!(node && part && (node[part] || node['*']) &&
          !(node['!'] && node['!'].indexOf(part) >= 0))) break;
  }
  i = parts.length - i;
  parts.reverse();
  res.publicSuffix = parts.slice(i).join('.');
  if (i > 0) res.domain = parts.slice(i-1, i).join('.');
  if (i > 1) res.subdomain = parts.slice(0, i-1).join('.');

  return res;
}

suffixTree = parseSuffixes(fs.readFileSync(suffixList, 'UTF-8'));
simplify(suffixTree);

exports.parse = parse;
