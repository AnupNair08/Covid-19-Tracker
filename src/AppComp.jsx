import React from 'react';
import {  BottomNavigation} from 'react-native-paper'
import HomeRoute from './Home'
import TrackRoute from './Track'
import AboutRoute from './About'


export default class AppComp extends React.Component {
  
  state = {
    index: 0,
    routes: [
      { key: 'Home', title: 'Home', icon: 'home', color: 'black' },
      { key: 'Track', title: 'Track', icon: 'album', color: 'grey' },
      { key: 'About', title: 'About', icon: 'star', color: 'rgb(145,135,120)' },
    ]
  };

  _handleIndexChange = index => this.setState({index});

  _renderscene = BottomNavigation.SceneMap({
    Home : HomeRoute,
    Track :TrackRoute,
    About : AboutRoute, 
  });
  render() {
  return (
      <BottomNavigation navigationState = {this.state}
       onIndexChange = {this._handleIndexChange} 
       renderScene = {this._renderscene}
         shifting
       />
  );
}
}


