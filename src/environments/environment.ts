/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  firebase: {
    projectId: 'pos-sandro',
    appId: '1:487347874541:web:ed7318c8eca78fbbe13ae4',
    databaseURL: 'https://pos-sandro-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'pos-sandro.appspot.com',
    locationId: 'asia-southeast1',
    apiKey: 'AIzaSyDvAc6RCKu_Hq0_SiZv3c603Mbpq-bpKY8',
    authDomain: 'pos-sandro.firebaseapp.com',
    messagingSenderId: '487347874541',
    measurementId: 'G-H7HBT8NSX7',
  },
  production: false,
};
