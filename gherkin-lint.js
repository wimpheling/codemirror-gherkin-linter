// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Depends on jsonlint.js from https://github.com/zaach/jsonlint

// declare global: jsonlint

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.registerHelper("lint", "gherkin", function(text) {
  var found = [];
  var parser = new Gherkin.Parser();
  try { parser.parse(text, new Gherkin.TokenMatcher('en')); } 
  catch (e) { 
    for (var err in e.errors){
      err = e.errors[err];
      var loc = err.location;
      found.push({
        from: CodeMirror.Pos(loc.line - 1, loc.column),
        to: CodeMirror.Pos(loc.line - 1, loc.column),
        message: err.message
      });
    }
  }
  
  return found;
});

});
