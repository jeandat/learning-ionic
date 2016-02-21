var fs = require('fs');

module.exports = function () {
    var manifestPath = 'platforms/android/AndroidManifest.xml';
    var manifest = fs.readFileSync(manifestPath, 'utf8');

    console.log('Android manifest file found');

    manifest = manifest.replace(/android:windowSoftInputMode="[^"]+"/, 'android:windowSoftInputMode="adjustPan"');

    fs.writeFileSync(manifestPath, manifest, 'utf8');

    console.log('Android manifest updated. Changed windowSoftInputMode to adjustPan');
};
