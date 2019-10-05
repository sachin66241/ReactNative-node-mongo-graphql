import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



class MainScreen extends React.Component{
  render(){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>WELCOME TO MAIN SCREEN</Text>
        <Text>
          ITEM ID :{JSON.stringify(this.props.navigation.getParam('id'))}
        </Text>
        <Text>
          PASS ID :{JSON.stringify(this.props.navigation.getParam('pasid'))}
        </Text>
      </View>
    )
  }
}

class HomeScreen extends React.Component{
  render(){
    return(
   
    <View style={styles.container}>
    <Text style={styles.headerText}>WELCOME TO ME</Text>


    <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
      <Button
        onPress={()=>this.props.navigation.navigate('Login')}
        title="LOGIN"
        color="#00FF00"
      />
    </View>

    <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
      <Button
        onPress={this.buttonClickListener}
        title="SIGNUP"
        color="#FF3D00"
      />
    </View>
 
  </View>

    )
  }
}
class LoginScreen extends React.Component {
  state = { text: '', pas: '' };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text style={styles.headerText}>WELCOME TO LOGIN PAGE</Text>
        <View style={{margin:-10,width:'70%'}}>
        <TextInput
          style={{ margin: 15,
            height: 30,
            borderColor: '#7a42f4',
            borderWidth: 3}}
          placeholder="Email"
          onChangeText={text => this.setState({ text })}/>
        </View>
        
        <View style={{margin:-10,width:'70%'}}>
        <TextInput
          style={{ margin: 15,
            height: 30,
            borderColor: '#7a42f4',
            borderWidth: 3 }}
          placeholder="Password"
          onChangeText={pas => this.setState({ pas })}/>
        </View>

        <Button style={{margin:10}}
          title="OK"
          onPress={() =>
            this.props.navigation.navigate('Main', {
              id: this.state.text,
              pasid: this.state.pas,
            })
          }
        />
      </View>
    );
  }
}

class SignupScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>WELCOME TO SIGNUP PAGE</Text>
      </View>
    );
  }
}


const RootStack = createStackNavigator({
  Home:HomeScreen,
  Main:MainScreen,
  Login:LoginScreen,
  Signup:SignupScreen
},{initialRouteName:'Home',})

const AppContainer = createAppContainer(RootStack)


export default class App extends React.Component {
  render() {
    return (
        <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
 
});