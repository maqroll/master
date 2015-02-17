var Builder = require('systemjs-builder'),
 path = require('path');

var builder = new Builder();

builder.config({
  "paths": {
    "react": "lib/react/react.js",
    "jquery": "lib/jquery/jquery.js",
    "spin": "lib/ladda/spin.min.js",
    "ladda": "lib/ladda/ladda.min.js",
    "main": "main.js",
    "issueTable": "IssueTable.js",
    "reloadButton": "ReloadButton.js"
  }
});

return builder.buildSFX('main', './bundle.js', { minify: false, sourceMaps: true});