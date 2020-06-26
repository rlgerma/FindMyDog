/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native'
import App from './src'
import { name as appName } from './app.json'

import Amplify from 'aws-amplify'
import config from './aws-exports'
YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps',
  'RCTRootView cancelTouches',
  'not authenticated',
  'Sending `onAnimatedValueUpdate`'
])
Amplify.configure(config)
AppRegistry.registerComponent(appName, () => App)
