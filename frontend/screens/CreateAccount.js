import React, { useState } from 'react';
import LoginScreen from "react-native-login-screen";
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, TextInput, IconButton, Switch, Text } from 'react-native-paper';
export default function CreateAccount({route, navigation}) {
  function checkPassword(password){
    return password.toString().length>7
  }
    const [phone_number, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [input, setInput] = useState("")
    const [name, setName] = useState("")
    const [carBrand, setCarBrand] = useState("")
    const [carModel, setCarModel] = useState("")
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return <ScrollView style={{height:"100%"}}><LoginScreen
    logoImageSource={require('../assets/icon.png')}
    onLoginPress={() => {
      if(checkPassword(input) && name!= "" && phone_number!=""){
        setPassword(input)
        fetch("http://127.0.0.1:8000/user/user", {
      method: "POST",
      body: JSON.stringify({
        "first_name": name,
        "middle_name": name,
        "last_name": name,
        "link_to_photo": "string",
        "phone_number": phone_number,
        "registered_at": "2023-04-12T21:17:47.206Z",
        "current_role": isSwitchOn ? "driver": "passenger",
        "password": password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      } 
    }).then(Alert.alert('Успешно!', "Успешно! У вас получилось создать аккаунт") );navigation.navigate("Главная", {password: password, phone_number:phone_number, current_role: isSwitchOn ? "driver": "passenger"})
      }
      }}
    onEmailChange={(a)=>{setPhoneNumber(a)}}
    emailPlaceholder='Phone Number'
    emailTextInputProps={{keyboardType:'phone-pad'}}
    loginButtonText={'Зарегистрироваться'}
    disableSignup
    onPasswordChange={(a)=>{setInput(a)}}
    textInputChildren={<View style={{width: "100%"}}><View style={{marginTop: 16, width: "100%"}}>
    <TextInput underlineColor='#F0C414'
      style={styles.input}
      placeholder="First, Middle and Last Name"
      onChangeText={(a)=>{setName(a)}}
    />
  </View><View style={{alignItems:'center'}}><Text style={{fontSize:18, color: isSwitchOn ? 'purple' : '#F0C414'}}>{'\n'}Вы водитель?</Text><Switch value={isSwitchOn} style={{transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]}} color='purple' onValueChange={onToggleSwitch}></Switch></View>
{isSwitchOn ? <View style={{marginTop: 16, width: "100%"}}>
  <TextInput underlineColor='#F0C414'
    style={styles.input}
    placeholder="Car Brand"
    onChangeText={(a)=>{setCarBrand(a)}}
  />
  <View style={{marginTop: 16, width: "100%"}}>
  <TextInput underlineColor='#F0C414'
    style={styles.input}
    placeholder="Car Model"
    onChangeText={(a)=>{setCarModel(a)}}
  />
</View>
</View> : <></>}
</View>

}
  /></ScrollView>
}

const styles = StyleSheet.create({
    input:{
        width: '90%',
        marginLeft:20,
        height: 40,
        backgroundColor: '#FFF',
        color: '#000',
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingRight:0
      },
})