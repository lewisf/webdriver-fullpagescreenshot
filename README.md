# Webdriver Full Page Screenshot

Take a full page screenshot with any selenium driver using WebdriverIO.

### Installation

This requires graphics-magick. Refer to here to install graphicsmagick: https://www.npmjs.com/package/gm

```
npm install --save webdriver-fullpagescreenshot
```

Registering the command:
```
var saveFullPageScreenshot = require('saveFullPageScreenshot');
client.addCommand(saveFullPageScreenshot.name, saveFullPageScreenshot.command);
```

You can also override the default saveScreenshot command:
```
var saveFullPageScreenshot = require('saveFullPageScreenshot');
client.addCommand('saveScreenshot', saveFullPageScreenshot.command, true);
```

### Developing

```
npm install
npm install -g webdriverio
npm install -g selenium-standalone

selenium-standalone install
```
