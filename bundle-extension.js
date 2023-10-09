var fs = require('fs');
var fsExtra = require('fs-extra');
var path = require('path');

var srcUIDir = path.join(__dirname, "./src/ui");
var destDir = path.join(__dirname, "./dist-extension");
var srcBundleJSLib = path.join(__dirname, "./dist/bundle.js");
var destBundleJSLib = path.join(destDir, "./bundle.js");

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir);
}

fsExtra.copySync(srcUIDir, destDir);
fs.copyFileSync(srcBundleJSLib, destBundleJSLib);