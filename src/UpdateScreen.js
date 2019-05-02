import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
export class UpdateScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Update Profile'
    }
  }

  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      TextInput_Profile_Id: this.props.navigation.getParam('ProfileId'),
      TextInput_FName: this.props.navigation.getParam('FName'),
      TextInput_LName: this.props.navigation.getParam('LName'),
      TextInput_Gender: this.props.navigation.getParam('Gender'),
      TextInput_Primary_Skill: this.props.navigation.getParam('PrimarySkill'),
    }
  }

  UpdateProfileRecordUsingAxios = () => {
    axios.put('http://localhost:3000/profiles/' + this.state.TextInput_Profile_Id,
      {
        FName: this.state.TextInput_FName,
        LName: this.state.TextInput_LName,
        Gender: this.state.TextInput_Gender,
        PrimarySkill: this.state.TextInput_Primary_Skill
      }
    ).then(res => { console.log(res) })
      .catch(error => {
        console.log('error', error);
      });
  }

  UpdateProfileRecord = () => {

    console.log("id===", this.state.TextInput_Profile_Id)

    fetch('http://localhost:3000/profiles/' + this.state.TextInput_Profile_Id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FName: this.state.TextInput_FName,
        LName: this.state.TextInput_LName,
        Gender: this.state.TextInput_Gender,
        PrimarySkill: this.state.TextInput_Primary_Skill

      })

    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert("Message", "Record Updated Successfully...", [{ text: "OK", onPress: () => this.handleUpdateOK() }]);
        //Alert.alert("Logout", "Are you sure you want to logout?", [{ text: "Cancel", onPress: () => {}, style: "cancel" }, { text: "Logout", onPress: () => this.handleUpdateOK() }], { cancelable: false });
      }).catch((error) => {
        console.error(error);
      });

  }

  handleUpdateOK() {
    this.props.navigation.navigate('home', { isComingFromUpdateScreen: true });
  }

  render() {
    return (
      <View style={{ marginTop: 40 }}>
        {/* style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding:20 }}> */}
        <View style={styles.row}>
          <Text style={styles.textLabel}>ID</Text>
          <TextInput style={styles.textInput} editable={false}>{this.props.navigation.getParam('ProfileId')}</TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.textLabel}>First Name</Text>
          <TextInput style={styles.textInput} editable={false}>{this.props.navigation.getParam('FName')}</TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.textLabel}>Last Name</Text>
          <TextInput style={styles.textInput} editable={false}>{this.props.navigation.getParam('LName')}</TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.textLabel}>Gender</Text>
          <TextInput style={styles.textInput} editable={false}>{this.props.navigation.getParam('Gender')}</TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.textLabel}>Primary Skill</Text>
          <TextInput style={styles.textInput} autoFocus = {true}
            onChangeText={TextInputValue => this.setState({ TextInput_Primary_Skill: TextInputValue })}>
            {this.props.navigation.getParam('PrimarySkill')}
          </TextInput>
        </View>

        <Button title="Update" onPress={this.UpdateProfileRecord} />

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
    color: 'steelblue'
  },
  textInput: {
    fontSize: 14,
    borderColor: "#cccccc",
    width: 150,
    height: 20,
    borderBottomWidth: 1,
    color: "#6a4595",
  },
});