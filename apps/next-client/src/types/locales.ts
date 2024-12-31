/**
 * While adding more locales, make sure to update the path matcher
 * for translations in the middleware.ts file.
 *
 * For different locales of a certain language for example English,
 * add "en-US", "en-IN", "en-AU" to this enum and create json files
 * with the corresponding name, eg. en-US.json
 */
export enum Locales {
  ENGLISH = 'en',
  HINDI = 'hi'
}
