// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: true,
  analyticsCasperApiUrl: 'https://api.caspercommunity.io/',
  analyticsTestnetCasperApiUrl: 'https://testnet.api.caspercommunity.io/',
  contactUsUrl: 'https://caspercommunity.io/contact-us',
  mapId: 'GMap_Id',
  firebaseWebNotifications: {
    apiKey: 'API_KEY',
    authDomain: 'AUTH_DOMAIN',
    databaseURL: 'https://PROJECT.firebaseio.com',
    projectId: 'PROJECT_ID',
    storageBucket: 'PROJECT.appspot.com',
    messagingSenderId: 'MSG_SENDER_ID'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
