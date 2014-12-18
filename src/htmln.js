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
    var converted = '',
        i = 0;

    var textwidth = 80;

    while (i < len) {
      converted += html[i++];
    }

    return converted;
  };
}));
