import { NativeEventEmitter } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Vibration } from 'react-native';
import 'react-native-gesture-handler/jestSetup';

beforeAll(() => {
    jest.spyOn(Vibration, 'vibrate').mockReturnValue(undefined);
});

jest.mock('react-native-device-info', () => {
    return {
      __esModule: true,
      default: {
        getVersion: jest.fn(() => {}),
        getBuildNumber: jest.fn(() => {}),
      },
    };
  });
jest.mock('@react-native-community/netinfo', () => {
    return {
        addEventListener: jest.fn(),
        fetch: jest.fn(),
        removeEventListener: jest.fn(),
    };
});
jest.mock('react-native', () => {
    return {
        ...jest.requireActual('react-native'),
        AsyncStorage: {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
        },
        Vibration: {
            vibrate: jest.fn(),
            cancel: jest.fn(),
        }
    };
});

jest.mock('react-native/Libraries/Settings/Settings', () => {
    return {
        settings: {
            AppleLocale: 'en-US',
            AppleLanguages: ['en-US'],
        },
    };
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('aws-amplify', () => {
    return {
        API: {
            graphql: jest.fn(),
        },
        Amplify: {
            configure: jest.fn()
        },
        graphqlOperation: jest.fn(),
    };
});

jest.mock('aws-amplify', () => ({
    API: {
      graphql: jest.fn(),
    },
    graphqlOperation: jest.fn(),
    Amplify: {
        configure: jest.fn()
    }
  }));

jest.mock('@aws-amplify/core', () => ({
	__esModule: true,
	...jest.requireActual('@aws-amplify/core'),
	browserOrNode() {
		return {
			isBrowser: false,
			isNode: true,
		};
	},
}));
  
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

afterAll(() => {
    jest.spyOn(Vibration, 'vibrate').mockRestore();
});