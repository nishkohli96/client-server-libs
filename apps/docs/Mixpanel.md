# Mixpanel

Refer MixPanel's [Developer APIs](https://developer.mixpanel.com/reference/ingestion-api).

1.  Mixpanel is built on three key concepts:
    - **Events**: actions that happen in your product
    - **Users**: the people who use your product
    - **Properties**: attributes of your users and events

2.  If you want to make sure the data you’re collecting is accurate, you’ll want to do most of your tracking server-side, since Adblockers and browsers are making it harder and harder to track users on the client-side.

3.  To disable `geolocation`, set the geolocate config property to false  during the library initialization.
    You can also disable geolocation for individual requests by setting the ip to 0.

    ```js
    const mp = Mixpanel.init('<YOUR_TOKEN>', { geolocate: false });

    mp.track('event name', {
      distinct_id: 'sample_distinct_id',
      ip: '0'
    });
    
    mp.people.set('sample_distinct_id', {
      name: 'sam',
      plan: 'premium',
      ip: '0'
    });
    ```

3.  Call `.identify(<user_id>)` when a user signs up or logs in. Pass in  the user’s known identifier (eg: their ID from your database). Call `.reset()` when a user logs out.

4. Refer the [tracking flows](https://docs.mixpanel.com/docs/tracking-methods/id-management/identifying-users-simplified#example-user-flows) of anonymous and authenticated users.

5. **Generate an Anonymous ID**: Generate a UUID and storing that value in a cookie that persists during that user’s session. Avoid creating profiles for anonymous users. If possible, cache user profile properties update in cookie or local storage and only send them to Mixpanel after the user is identified (ie logged-in state).

6. Use database id as a value for `$user_id`. Avoid using email for this value, because if the user changes their email, they will count as a separate user.

7. Mixpanel strings are case-sensitive; `sign_up_completed` and `Sign_Up_Completed` are considered two separate events. Prefer using snake_case naming convention for event names which use the **(Object) (Verb)** format, like `song_played` or `page_viewed`.

8. Mixpanel accepts arbitrary JSON as properties, including strings, numbers, booleans, lists, and objects where each event can have up to 255 properties. Event property names/values can be at most 255 characters in length (longer names are truncated).

9. Create two separate Mixpanel projects for `development` and `production` environments. 
