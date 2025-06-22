import React from 'react'
import {View} from 'react-native'
import {TextInput} from 'react-native-paper'
export default function SearchBar(){
    return <View style={{ position: 'absolute', top: 10, width: '100%' }}>
    <TextInput
      style={{
        borderRadius: 10,
        margin: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
      }}
      placeholder={'Search'}
      placeholderTextColor={'#666'}
    />
  </View>
}