const fs = require('fs')

// Due to template compilation error in multiformats we are editing multiformats/types/src/cid.d.ts so that the build works
const pathToCid = 'node_modules/multiformats/types/src/cid.d.ts';
fs.readFile(pathToCid, 'utf8', function (readError, fileContent) {
    if (readError) {
        console.log('postinstall.js error:');
        console.log(readError);
        return;
    }
    let result = fileContent.replace(/export type MultibaseDecoder<Prefix>/g, 'export type MultibaseDecoder<Prefix extends string>');
    result = result.replace(/export type MultibaseEncoder<Prefix>/g, 'export type MultibaseEncoder<Prefix extends string>');

    fs.writeFile(pathToCid, result, 'utf8', function (writeError) {
        if (writeError) {
            console.err('postinstall.js error:');
            return console.err(writeError);
        }
    });
});