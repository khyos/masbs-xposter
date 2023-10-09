# masbs-xposter

## Dev Env

* Install NodeJS
* run `npm install`
* Copy `user/config.template.json` to `user/config.json`
* Set your mastodon & bluesky configuration in this `user/config.json` file

### Build

* run `npm run build`

### Tests

* run `npm run test`

### Run a sample

* After building run `node ./dist/playground/index.js`

### Use html interface

* After building open `dist-extension/index.html` in the browser
* Input your Mastodon & BlueSky Settings and click on Update Settings
* Now compose your message and click on submit (Mastodon send a 422 error for now)

### Use Chrome extension

* After building load the folder `dist-extension` as an unpacked chrome extension
* Input your Mastodon & BlueSky Settings and click on Update Settings
* Now compose your message and click on submit