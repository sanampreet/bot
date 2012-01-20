/*!
 * Bot - Feeling lonely? You personal bot is here.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Stop words.
 * 
 * @type {Array} 
 */
var stopWords = require('./stop_words');

/**
 * Text constructor.
 * 
 * @param {String} Text.
 */
function Text(text) {
  this._text = text.trim();
  this.analyze(this._text);
};

/**
 * Analyzes text.
 * 
 * @param {String} text.
 * @api private
 */
Text.prototype.analyze = function(text) {
  var type = null;
  var words = [];
  
  switch (text.charAt(text.length -1)) {
    case '!': 
      type = 'exclamatory'; 
      break;
    case '?':
      type = 'interrogative';
      break;
    default: 
      type = 'imperative';
  }
  
  this._type = type;
  
  text.split(/\s+/).forEach(function(word) {
    word = word.toLowerCase().replace(/\W+/g, '');
    if (~stopWords.indexOf(word)) return;
    words.push(word);
  });
  
  this._words = words;
};

/**
 * Returns text type.
 * 
 * @returns {String}
 */
Text.prototype.type = function() {
  return this._type;
};

/**
 * Returns text words.
 * 
 * @returns {Array}
 */
Text.prototype.words = function() {
  return this._words;
};

/**
 * Exposing `Text`.
 */
module.exports = Text;