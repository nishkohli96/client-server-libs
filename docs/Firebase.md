# Firebase

1.  You can add multiple **web**, **android** or **ios** apps for a single firebase project.

2.  Generate the Admin SDK credentials for your project under `Project Settings > Service Accounts > Firebase Admin SDK`. These credentials must never be exposed.

3.  The Firebase JS SDK does not allow `initializeApp()`to be called more than once in the same runtime context (i.e., browser tab or Node.js instance). `getApps()` is used to check if Firebase has already been initialized.

## Analytics

1.   Event names in Google Analytics (GA4) are **case-sensitive**. Stick to **lowercase snake_case** for all event names, e.g.: `logEvent(analytics, 'user_signed_up');`

2.  **MeasurementId**: This ID is automatically created when you enable Analytics in your Firebase project and register a web app, and it's required to use Analytics. Note: For apps using the Firebase JavaScript SDK **v7.20.0 and later**, Firebase dynamically fetches the `measurementId` when your app initializes Analytics. Having this ID in your config object is optional, but it does serve as a fallback in the rare case that the dynamic fetch fails.

3.  **Custom parameters** can be used as dimensions or metrics in Analytics reports. Once you've logged a custom parameter using the SDK, register the dimension or metric to ensure those custom parameters appear in Analytics reports. Do this via: `Analytics > Events > Manage Custom Definitions > Create Custom Dimensions`. Refer the list of [recommended events](https://support.google.com/analytics/answer/9267735).

4.  Analytics automatically logs some user properties; you don't need to add any code to enable them. If you need to collect additional data, you can set up to 25 different user properties per project.

5.  You should set user properties and user ID:
    - After authentication (e.g., after login/signup).
    - Or when you have meaningful user metadata (e.g. preferences, subscription level, role).

    ```
    setUserId(analytics, user.id);
    setUserProperties(analytics, {
      theme: user.theme,
      plan: user.plan,
    });
    ```

6.  ✅ Automatically collected:
    - IP Address (used internally for geolocation).
    - Location Data (country, city, region).
    - Device info (platform, browser, etc).
    - Language and timezone.

		This is part of the default collection — you don’t need to manually log these.

7.  🔍 What does firebase_screen_class do?
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
