# Firebase

1.  You can add multiple **web**, **android** or **ios** apps for a single firebase project.

2.  Generate the Admin SDK credentials for your project under `Project Settings > Service Accounts > Firebase Admin SDK`. These credentials must never be exposed.

3.  The Firebase JS SDK does not allow `initializeApp()`to be called more than once in the same runtime context (i.e., browser tab or Node.js instance). `getApps()` is used to check if Firebase has already been initialized.

4.  **MeasurementId**: This ID is automatically created when you enable Analytics in your Firebase project and register a web app, and it's required to use Analytics. Note: For apps using the Firebase JavaScript SDK **v7.20.0 and later**, Firebase dynamically fetches the `measurementId` when your app initializes Analytics. Having this ID in your config object is optional, but it does serve as a fallback in the rare case that the dynamic fetch fails.
