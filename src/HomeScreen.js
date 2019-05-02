import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';
var isComingFromUpdateScreen = false;
var isComingFromAppendScreen = false;
export class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    dataSource: [],
  };

  componentWillMount() {
    console.log('componentWillMount');
    this.fetchData();
  }

  componentWillReceiveProps(prop) {
    isComingFromUpdateScreen = prop.navigation.getParam('isComingFromUpdateScreen');
    isComingFromAppendScreen = prop.navigation.getParam('isComingFromUpdateScreen');
    if (isComingFromUpdateScreen || isComingFromAppendScreen) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    fetch('http://localhost:3000/profiles/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: responseJson });
        console.log(this.state.dataSource);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteRow = (e) => {
    console.log("eee=====", e);
    var temp = this.state.dataSource;
    var values = temp.findIndex(item => item.id === e)
    console.log("values=====", values);
    temp.splice(values, 1);
    this.setState({ dataSource: temp });
    console.log(this.state.dataSource);
  }

  editRow = (e) => {
    console.log("eee=====", e);
    var temp = this.state.dataSource;
    var values = temp.findIndex(item => item.id === e)
    console.log("values=====", values);
    this.props.navigation.navigate('update',
      {
        ProfileId: e.item.id,
        FName: e.item.FName,
        LName: e.item.LName,
        Gender: e.item.Gender,
        PrimarySkill: e.item.PrimarySkill
      },
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    // Buttons
    var swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { this.deleteRow(rowId) }
      }
    ]

    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 5, height: 30, backgroundColor: 'steelblue' }}>
          <Text>{'Id'}</Text>
          <Text>{'First Name'}</Text>
          <Text>{'Last Name'}</Text>
          <Text>{'Gender'}</Text>
          <Text>{'Primary Skill'}</Text>
        </View>

        <FlatList
          data={this.state.dataSource}
          keyExtractor={item => item.id}
          renderItem={item => (
            <Swipeout right={[{
              text: 'Delete',
              backgroundColor: 'red',
              onPress: () => { this.deleteRow(item.item.id) }
            },
            {
              text: 'Edit',
              backgroundColor: 'blue',
              onPress: () => { this.editRow(item) }
            }
            ]}
              backgroundColor='transparent' >
              <TouchableOpacity onPress={() => this.editRow(item)}>
                <View style={{ flex: 1, width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#0002' }}>
                  <Text style={{ alignSelf: 'center', width: 30 }}>{item.item.id}</Text>
                  <Text style={{ alignSelf: 'center', width: 100 }}>{item.item.FName}</Text>
                  <Text style={{ alignSelf: 'center', width: 100 }}>{item.item.LName}</Text>
                  <Text style={{ alignSelf: 'center', width: 30 }}>{item.item.Gender}</Text>
                  <Text style={{ alignSelf: 'center', marginRight: 100 }}>{item.item.PrimarySkill}</Text>
                </View>
              </TouchableOpacity>
            </Swipeout>
          )}
        />
      </View>
    );
  }
}