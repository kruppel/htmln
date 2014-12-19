(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['simple-html-tokenizer'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('simple-html-tokenizer'));
  } else {
    root.htmln = factory(root.HTML5Tokenizer);
  }
}(this, function(HTML5Tokenizer) {
  return function(html) {
    var textwidth = 80;

    var converted = '',
        filtered = '',
        len = html.length,
        i = 0,
        docType,
        tokens;

    filtered = html.replace(/<!doctype[^>]+>\n?/i, function(match) {
      docType = match;

      return '';
    });
    tokens = HTML5Tokenizer.tokenize(html);

    if (docType) {
      converted += docType;
    }

    while (i < len) {
      converted += html[i++];
    }

    return converted;
  };
}));
