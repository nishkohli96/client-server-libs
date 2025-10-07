# Firebase

1.  You can add multiple **web**, **android** or **ios** apps for a single firebase project.

2.  Generate the Admin SDK credentials for your project under `Project Settings > Service Accounts > Firebase Admin SDK`. These credentials must never be exposed.

3.  The Firebase JS SDK does not allow `initializeApp()`to be called more than once in the same runtime context (i.e., browser tab or Node.js instance). `getApps()` is used to check if Firebase has already been initialized.

## Analytics

1.  Google analytics will only be enabled in the `production` environment.

2.  Event names in Google Analytics (GA4) are **case-sensitive**. Stick to **lowercase snake_case** for all event names, e.g.: `logEvent(analytics, 'user_signed_up');`

3.  **MeasurementId**: This ID is automatically created when you enable Analytics in your Firebase project and register a web app, and it's required to use Analytics. Note: For apps using the Firebase JavaScript SDK **v7.20.0 and later**, Firebase dynamically fetches the `measurementId` when your app initializes Analytics. Having this ID in your config object is optional, but it does serve as a fallback in the rare case that the dynamic fetch fails.

4.  **Custom parameters** can be used as dimensions or metrics in Analytics reports. Once you've logged a custom parameter using the SDK, register the dimension or metric to ensure those custom parameters appear in Analytics reports. Do this via: `Analytics > Events > Manage Custom Definitions > Create Custom Dimensions`. Refer the list of [recommended events](https://support.google.com/analytics/answer/9267735).

5.  Analytics automatically logs some user properties; you don't need to add any code to enable them. If you need to collect additional data, you can set up to 25 different user properties per project.

6.  You should set user properties and user ID:
    - After authentication (e.g., after login/signup).
    - Or when you have meaningful user metadata (e.g. preferences, subscription level, role).

    ```
    setUserId(analytics, user.id);
    setUserProperties(analytics, {
      theme: user.theme,
      plan: user.plan,
    });
    ```

7.  ✅ Automatically collected:
    - IP Address (used internally for geolocation).
    - Location Data (country, city, region).
    - Device info (platform, browser, etc).
    - Language and timezone.

		This is part of the default collection — you don’t need to manually log these.

8.  🔍 What does firebase_screen_class do?
    - It lets you group multiple screens logically under a class/category.
    - Originally used in mobile SDKs (Android/iOS), where screens map to Activities or ViewControllers.
    - In the web context, it's less important — but still useful for:
        - Debugging
        - GA4 custom reporting
        - Segmenting similar screens

    ```
    logEvent(analytics, 'screen_view', {
      firebase_screen: 'settings_page',
      firebase_screen_class: 'SettingsComponent'
    });
    ```

    `firebase_screen_class` is optional but helpful for structure. It's not required to track screen views.

9.  The value of `trackingId` for Google Analytics SDK is the value for the `measurementId` of your firebase app. The `anonymizeIP: true` config tells Google Analytics to anonymize the user's IP by zeroing out the last part of the address (for IPv4) before storing it. It improves user privacy and helps comply with privacy regulations like GDPR. Geolocation data is less precise, but still generally good at the country or region level.


## Authentication

1.  Enable different authentication methods for your app by going to `Project Shortcuts > Authentication > Sign-in method`. You can also customise the signup templates in the templates tab. For external auth providers like Github, you need to paste the App/Client Id and secret of the authenticating applications at their end.

2.  


## Web Push Notifications

🧩 **Step 1: Enable Web Push in Firebase Console**
  - Go to Firebase Console → Project Settings → Cloud Messaging.
  - In the Web configuration section, click Generate Key Pair to create a VAPID key pair.
  - Copy the Public key — you’ll need it in your web app.
