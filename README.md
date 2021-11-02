
<p align="center"><a href="https://analytics.caspercommunity.io" target="_blank"><img src="https://analytics.caspercommunity.io/assets/icon/android-chrome-512x512.png" width="150"></a></p>

## About Casper Analytics App

The app is especially design to use the associated API.
It's build with Ionic so it can be easily exported as an iOS and Android application.

## How to install

Step by step guide of How-To install the app

### Install dependecies
```
npm install -g @ionic/cli
cd /path/to/project
npm install
```

### Environment settings

If you have define your own API, you can change the URL.
For the firebaseWebNotifications property, Check the [Firebase documentation](http://firebase.google.com/)
You can also define a specific MapId for the Goolge Map displayed on the main page.
```
export const environment = {
  production: false,
  analyticsCasperApiUrl: 'https://api.caspercommunity.io/',
  analyticsTestnetCasperApiUrl: 'https://testnet.api.caspercommunity.io/',
  contactUsUrl: 'https://caspercommunity.io/contact-us',
 mapId : '',
firebaseWebNotifications: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
    vapidKey: '',
  }
};
```
You have to define 2 environment files in the folder **/src/environments** :
- environment.ts
- envionrment.prod.ts

### index.html

Define a new "index.html" (based on the template below) under the folder **"/src"**, you have to specify your Google Maps API Key.

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>Casper Analytics</title>

  <base href="/" />

  <meta name="color-scheme" content="light dark" />
  <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="msapplication-tap-highlight" content="no" />

  <link rel="apple-touch-icon" sizes="180x180" href="assets/icon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/icon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/icon/favicon-16x16.png">

  <!-- add to homescreen for ios -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
</head>

<body>

  <app-root></app-root>
</body>
<script src="https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY]"></script>

</html>
```

### Notifications
Create a file called **"./src/firebase-messagin-sw.js"** with these informations :

```
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

```
You'll find the values for each property when you configure the firebase's notifcations

### Start the app
```
ionic serve
```
### Build the web version
```
ionic build --prod
```

## How to test

Run the following command :

```
ng test
```

## iOS Application

The iOS application is ready to use. The only thing that you have to do is adding the GoogleService-Info.plist for the notifications via XCode.

Check the [Firebase documentation](http://firebase.google.com/) for more info.

### Build
To build the iOS Application, I use Ionic Appflow (which is a paid version of Ionic). You can also build it using XCode.

## Android Application

The Android application is ready to use. The only thing that you have to do is adding the google-services.json for the notifications via Android Studio (or manually).

Check the [Firebase documentation](http://firebase.google.com/) for more info.

### Build
To build the iOS Application, I use Ionic Appflow (which is a paid service of Ionic). You can also build it using Android Studio.

## License

The Casper Analytics App is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
The Ionic framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
