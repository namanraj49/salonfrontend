import { registerRootComponent } from 'expo';
import App from './app/App';
import TrackPlayer from 'react-native-track-player';
import {playbackService} from "./musicPlayerService";
import {name as appName} from './app.json';
import {AppRegistry} from 'react-native';


//registerRootComponent(App);
AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
