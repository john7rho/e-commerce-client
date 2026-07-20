// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /** Mock API from `demo-api/server.js` (npm run api) */
  apiBaseUrl: 'http://localhost:3333/api',
  /** Host:port for JwtModule allowedDomains (no scheme) */
  apiHost: 'localhost:3333',
  /** Offline demos: do not open SignalR to a missing hub */
  realtimeEnabled: false,
  productHubUrl: 'http://localhost:3333/products-hub',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
