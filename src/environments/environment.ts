// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
  adminLogin: 'sellmobilesteam@mindtree.com',
  adminPassword : 'Admin@123',
  socketUrl: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyCGlfED_tpokJF-ZvdrKIGtKwnRd_f1xKE',
      authDomain: 'sellmobile-cbdc5.firebaseapp.com',
      projectId: 'sellmobile-cbdc5',
      storageBucket: 'sellmobile-cbdc5.appspot.com',
  },
  siteKey: '6Ld8R5wUAAAAAMvg0VtTGOvvVEmTbkxOOv7ZC8d8'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
