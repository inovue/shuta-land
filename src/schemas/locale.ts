const locales = [
  {
    title: "Japanese",
    value: "ja-JP",
  },
  {
    title: "English",
    value: "en-US",
  },
];
const displayModes =  [
  'browser',
  'fullscreen',
  'minimal-ui',
  'standalone',
]

const locale = {
  type: "string",
  name: "locale",
  title: "Language",
  description:
    "used for informing the browser the site's language. Should be a valid bcp47 language code like en, 'en-US', 'no' or 'nb-NO'",
  options: {
    list: locales
  },
  initialValue: locales[0].value,
  group: ['meta', 'og'],
}

export default locale;