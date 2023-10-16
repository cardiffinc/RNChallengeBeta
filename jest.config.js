module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.js"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-native-community' +
      '|@react-navigation' +
      '|react-navigation-tabs' +
      '|react-native-splash-screen' +
      '|react-native-screens' +
      '|react-native-reanimated' +
      ')/)',
  ],
  fakeTimers: {
    "advanceTimers": true,
    "doNotFake": [
      "Date",
      "hrtime",
      "nextTick",
      "performance",
      "queueMicrotask",
      "requestAnimationFrame",
      "cancelAnimationFrame",
      "requestIdleCallback",
      "cancelIdleCallback",
      "setImmediate",
      "clearImmediate",
      "setInterval",
      "clearInterval",
      "setTimeout",
      "clearTimeout"
    ],
    "enableGlobally": true,
    "legacyFakeTimers": false,
    "now": 1483228800000,
    "timerLimit": 1000
  }
};
