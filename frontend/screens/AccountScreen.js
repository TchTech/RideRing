import React, { useState } from 'react';
import LoginScreen from "react-native-login-screen";
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, TextInput, IconButton } from 'react-native-paper';
export default function AccountScreen({route, navigation}) {
  function checkPassword(password){
    return password.length>7
  }
    const [phone_number, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [input, setInput] = useState("")
    return <ScrollView style={{height:"100%"}}><LoginScreen
    logoImageSource={require('../assets/icon.png')}
    onLoginPress={() => {if(checkPassword(input)){
      setPassword(input)
      fetch("http://127.0.0.1:8000/user/user", {}).then()
      Alert.alert("Успешно!", "Успешно! Вы зашли под аккаунтом " + phone_number + ".")
      navigation.navigate("Главная", {password: password, phone_number:phone_number, current_role: ["driver", "passenger"][Math.random()]});

    }else{
      Alert.alert("Ошибка!","Ошибка! Неверные пароль/логиин.")
    }}}
    onSignupPress={() => {navigation.navigate("Регистрация")}}
    onEmailChange={(a)=>{setPhoneNumber(a)}}
    emailPlaceholder='Phone Number'
    emailTextInputProps={{keyboardType:'phone-pad'}}
    loginButtonText={'Войти в аккаунт'}
    onPasswordChange={(a)=>{setInput(a)}}
  /></ScrollView>
}