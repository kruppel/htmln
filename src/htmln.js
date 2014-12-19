(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['simple-html-tokenizer'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('simple-html-tokenizer'));
  } else {
    root.htmln = factory(root.HTML5Tokenizer);
  }
}(this, function(HTML5Tokenizer) {
  var INLINE_TAGS = ['title', 'p', 'span', 'button'];

  function indent(size) {
    var str = '';

    while (size--) {
      str += ' ';
    }

    return str;
  }

  return function(html) {
    var textwidth = 80;
    var indentsize = 2;

    var converted = filtered = '',
        i = indents = 0,
        len,
        docType,
        tokens,
        token;

    filtered = html.replace(/<!doctype[^>]+>\n?/i, function(match) {
      docType = match;

      return '';
    });

    tokens = HTML5Tokenizer.tokenize(filtered);
    len = tokens.length;

    if (docType) {
      converted += docType;
    }

    for (; i < len; i++) {
      token = tokens[i];

      if (token.type === 'StartTag') {
        converted += indent(indentsize * indents);

        if (!token.selfClosing) {
          indents++;
        }

        converted += '<' + token.tagName;

        if (token.attributes.length) {
          converted += ' ' + HTML5Tokenizer.Generator.prototype.Attributes(token.attributes);
        }

        converted += '>';

        if (INLINE_TAGS.indexOf(token.tagName) === -1) {
          converted += '\n';
        }
      } else if (token.type === 'EndTag') {
        indents--;

        if (INLINE_TAGS.indexOf(token.tagName) === -1) {
          converted += indent(indentsize * indents);
        }

        converted += '</' + token.tagName + '>';
        converted += '\n';
      } else if (token.type === 'Chars' && token.chars !== '\n') {
        converted += token.chars;
      }
    }

    return converted;
  };
}));
