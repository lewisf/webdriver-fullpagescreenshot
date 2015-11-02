import webdriverio from 'webdriverio';
import saveFullPageScreenshot from './lib/saveFullPageScreenshot';

const options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};

const client = webdriverio.remote(options);
client.addCommand(saveFullPageScreenshot.name, saveFullPageScreenshot.command);

client
  .init()
  .url('https://www.google.com/intl/en/about/')
  .setViewportSize({width: 480, height: 600}, false)
  .saveFullPageScreenshot('googleAbout')
  .title((err, res) => {
    console.log('Title was ' + res.value);
  })
  .end();
