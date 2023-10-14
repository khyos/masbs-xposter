import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var srcUIDir = path.join(__dirname, "./src/ui");
var destDir = path.join(__dirname, "./dist-extension");
var srcBundleJSLib = path.join(__dirname, "./dist/bundle.js");
var destBundleJSLib = path.join(destDir, "./bundle.js");

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir);
}

fsExtra.copySync(srcUIDir, destDir);
fs.copyFileSync(srcBundleJSLib, destBundleJSLib);