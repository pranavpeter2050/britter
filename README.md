# Britter (britter)

Twitter clone using Quasar

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### Faced Issue as below while creating Android app

```bash
// Command to build android app:
quasar dev -m cordova -T android

// Issue message:
No usable Android build tools found. Highest 30.x installed version is 30.0.2; Recommended version is 30.0.3. - cordova, quasar
```

#### Suggested fix found through ChatGPT

This error message suggests that you need to update your Android build tools to version 30.0.3 in order to use the Quasar Framework with Cordova.

To update your Android build tools, you can follow these steps:

Open the Android SDK Manager in Android Studio by clicking on the SDK Manager icon in the toolbar or by selecting "SDK Manager" from the "Welcome to Android Studio" screen.
In the SDK Platforms tab, scroll down to the Android 10.0 (Q) section and make sure that the "Android SDK Build-Tools 30.0.3" checkbox is selected.
Click the "Apply" button to install the selected packages.
Alternatively, you can update your Android build tools from the command line by running the following command:

```
// Run below code in the Directory where Android SDK is installed; eg: C:\Users\user\AppData\Local\Android\Sdk
sdkmanager "build-tools;30.0.3"
```

Once you have updated your Android build tools to version 30.0.3, you should be able to use the Quasar Framework with Cordova without encountering the error message you mentioned.
