import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {HomeScreen} from './src/HomeScreen';
import {AppendScreen} from './src/AppendScreen';
import {UpdateScreen} from './src/UpdateScreen';

const MainNavigator = createStackNavigator({
  home: {screen: HomeScreen,
    navigationOptions: ({navigation}) =>({
      title: "Profile List",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('append')}>
          <Text style={{ fontSize: 24, paddingRight: 30, color:'blue' }}>＋</Text>
        </TouchableOpacity>
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => alert('Click on row to edit and swipeout to delete!!')}>
          <Text style={{ fontSize: 16, paddingLeft: 30, color: 'blue',}}>Edit</Text>
        </TouchableOpacity>
      ),
    }),
  },
  append: {screen: AppendScreen},
  update: {screen: UpdateScreen},
});

const App = createAppContainer(MainNavigator);

export default App;