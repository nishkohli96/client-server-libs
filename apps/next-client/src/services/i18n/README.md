# Next-intl Notes

- Locale is stored in a cookie with name **"NEXT_LOCALE"** which has a expiry of 1 year.

- Make sure to update __path-match__ for locales in `middleware.tsx` file while adding new locales.

- For navigation, always use `Link` component from the `i18n/routing.ts` import, as it correctly routes to the path corresponding to the locale currently set.

- Translations can also be used like,
```js
const t = useTranslations();
t('About.title');
```
For a signup page with json structure similar to,
```json
{
  "auth": {
    "SignUp": {
        "title": "Sign up",
    }
  }
}
```
It can be written as

```jsx
const t = useTranslations('auth.SignUp');
<h1>{t('title')}</h1>
```

- To dynamically iterate over all keys of a namespace, you can use the [useMessages](https://next-intl.dev/docs/usage/messages#arrays-varying-amount) hook to retrieve all messages of a given namespace and extract the keys from there

- Use `useFormatter` hook to format [numbers](https://next-intl.dev/docs/usage/numbers#formatting-plain-numbers) or [date](https://next-intl.dev/docs/usage/dates-times#dates-times) as per the selected locale.

- In case you require access to messages in a component, you can read them via useMessages() or getMessages() from your configuration:

```js
// Regular components
import {useMessages} from 'next-intl';
const messages = useMessages();
 
// Async Server Components
import {getMessages} from 'next-intl/server';
const messages = await getMessages();
```

- If you want to use no prefix for the default locale, you can configure your routing accordingly:

```js
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // ...
  localePrefix: 'as-needed'
});
```

Important: For this routing strategy to work as expected, you should additionally adapt your middleware matcher to detect unprefixed pathnames.

- To change route path names to improve SEO, define `pathnames` key in `defineRouting` like,

```js
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  pathnames: {
    // To keep same pathname for all locals 
    '/': '/',
    '/blog': '/blog',
 
    // If locales use different paths, you can
    // specify each external path per locale
    '/about': {
      en: '/about',
      de: '/ueber-uns'
    },
 
    // Dynamic params are supported via square brackets
    '/news/[articleSlug]-[articleId]': {
      en: '/news/[articleSlug]-[articleId]',
      de: '/neuigkeiten/[articleSlug]-[articleId]'
    },
 
    // Static pathnames that overlap with dynamic segments
    // will be prioritized over the dynamic segment
    '/news/just-in': {
      en: '/news/just-in',
      de: '/neuigkeiten/aktuell'
    },
 
    // Also (optional) catch-all segments are supported
    '/categories/[...slug]': {
      en: '/categories/[...slug]',
      de: '/kategorien/[...slug]'
    }
  }
});
```

- Refer the following link to setup [domain based routing](https://next-intl.dev/docs/routing#domains).

- [Turn off Locale Detection](https://next-intl.dev/docs/routing#locale-detection) and [Configure Locale Cookie](https://next-intl.dev/docs/routing#locale-cookie).
