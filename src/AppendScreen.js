import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native';
export class AppendScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add New Profile'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      TextInput_Profile_Id: '',
      TextInput_FName: '',
      TextInput_LName: '',
      TextInput_Gender: '',
      TextInput_Primary_Skill: '',
    }
  }

  AddNewProfileUsingFetch = () => {
    fetch('http://localhost:3000/profiles/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        id: this.state.TextInput_Profile_Id,
        FName: this.state.TextInput_FName,
        LName: this.state.TextInput_LName,
        Gender: this.state.TextInput_Gender,
        PrimarySkill: this.state.TextInput_Primary_Skill
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
      }).catch((error) => {
        console.error(error);
      });
  }

  AddNewProfile = () => {
    if (this.state.TextInput_Profile_Id.length == 0 || this.state.TextInput_FName.length == 0
      || this.state.TextInput_LName.length == 0 || this.state.TextInput_Gender.length == 0
      || this.state.TextInput_Primary_Skill.length == 0) {
      Alert.alert("Alert", "Please fill complete Information !!", [{ text: "Cancel", onPress: () => { } }]);
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:3000/profiles',
        data: {
          id: this.state.TextInput_Profile_Id,
          FName: this.state.TextInput_FName,
          LName: this.state.TextInput_LName,
          Gender: this.state.TextInput_Gender,
          PrimarySkill: this.state.TextInput_Primary_Skill
        },
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(() => {
          Alert.alert("Message", "New Profile Addedd Successfully...", [{ text: "OK", onPress: () => this.handleUpdateOK() }]);
        })
        .catch(error => {
          console.log('error', error);
        }
        );
    }
  }

  handleUpdateOK() {
    this.props.navigation.navigate("home", isComingFromAppendScreen = true);
  }

  render() {
    return (
      <View style={{ marginTop: 40 }}>
        {/* style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding:20 }}> */}
        <View style={styles.row}>
          <Text style={styles.textLabel}>ID</Text>
          <TextInput style={styles.textInput} autoFocus = {true}
            onChangeText={TextInputValue => this.setState({ TextInput_Profile_Id: TextInputValue })}>
          </TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.textLabel}>First Name</Text>
          <TextInput style={styles.textInput}
            onChangeText={TextInputValue => this.setState({ TextInput_FName: TextInputValue })}>
          </TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.textLabel}>Last Name</Text>
          <TextInput style={styles.textInput}
            onChangeText={TextInputValue => this.setState({ TextInput_LName: TextInputValue })}>
          </TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.textLabel}>Gender</Text>
          <TextInput style={styles.textInput}
            onChangeText={TextInputValue => this.setState({ TextInput_Gender: TextInputValue })}>
          </TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.textLabel}>Primary Skill</Text>
          <TextInput style={styles.textInput}
            onChangeText={TextInputValue => this.setState({ TextInput_Primary_Skill: TextInputValue })}>
          </TextInput>
        </View>

        <Button title="Add" onPress={this.AddNewProfile} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 20,
    justifyContent: 'space-between'
  },
  textLabel: {
    fontSize: 14,
  },
  textInput: {
    fontSize: 14,
    borderColor: "#cccccc",
    width: 150,
    height: 20,
    borderBottomWidth: 1,
    color: "#6a4595"
  },
});