import React, {useState} from 'react';
import Map from '../components/Map';
import SearchBar from '../components/Search';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, TextInput, IconButton } from 'react-native-paper';
import { Avatar , Colors, Button, List, Portal, Modal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import AccountScreen from './AccountScreen'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F0C414',
    secondary: 'grey'
  },
};



export default function MainScreen({navigation}) {
  function arr_to_route(a){
    let r = []
    a.forEach((v)=>{
      r.push({latitude: v[0], longitude: v[1]})
    })
    return r
  }
const [startMarkerLatitude, SetStartMarkerLatitude] = useState(53.25209)
const [startMarkerLongitude, SetStartMarkerLongitude] = useState(34.37167)
const [finishMarkerLatitude, SetFinishMarkerLatitude] = useState(53.2)
const [finishMarkerLongitude, SetFinishMarkerLongitude] = useState(34.4)
const [route, SetRoute] = useState([{latitude: startMarkerLatitude, longitude: startMarkerLongitude},{latitude: finishMarkerLatitude, longitude: finishMarkerLongitude}])
const [finishMarkerText, SetFinishMarkerText] = useState('')
const [startMarkerText, SetStartMarkerText] = useState('')
const [confirmationVisible, setConfirmationVisible] = React.useState(false);
const [dealsVisible, setDealsVisible] = React.useState(false);
const [open, setOpen] = useState(false)
const [numberOfPeople, setPeople] = useState(1)
const [dateVisible, setDateVisible] = React.useState(false);
const [timeVisible, setTimeVisible] = React.useState(false);
const [cost, setCost] = useState(0)
const [date, setDate] = useState(new Date(1598051730000));
const [username, setUsername] = React.useState('');
const [password, setPassword] = React.useState('');
const [userType, setUserType] = React.useState(0);
const [drivers_info, setDriversInfo] = useState([{'start': 'Брянск, улица Ромашина 15', 'finish': 'Брянск, площадь Ленина 3', 'name': 'Тимур', 'datetime': '12:00 13.04.2023', 'cost': '350', 'num_passenger': '5'}, {'start': 'Брянск, улица Ромашина 15', 'finish': 'Брянск, площадь Ленина 3', 'name': 'Тимур', 'datetime': '12:00 13.04.2023', 'cost': '350', 'num_passenger': '5'}])
const [passengers_info, setPassengerInfo] = useState([{'start': 'Брянск, улица Ромашина 15', 'finish': 'Брянск, площадь Ленина 3', 'name': 'Тимур', 'datetime': '12:00 13.04.2023', 'cost': '350', 'num_passenger': '5'}, {'start': 'Брянск, улица Ромашина 15', 'finish': 'Брянск, площадь Ленина 3', 'name': 'Тимур', 'datetime': '12:00 13.04.2023', 'cost': '350', 'num_passenger': '5'}])
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    (false);
    setDate(currentDate);
    setDateVisible(false);setTimeVisible(false)
  };

function geocode(lat, lng, type){
  if(type == 0){
    fetch('http://dev.virtualearth.net/REST/v1/Locations/'+lat.toString()+','+lng.toString()+'?o=json&key=AnUwsJHYzaXvThcoeyV3M13SSsPeeWjMAXPh6S567SOJ613fuMBgJzUy8RuLr9SU').then(resp=>resp.json()).then(json=>SetFinishMarkerText(json['resourceSets'][0]['resources'][0]['name']))
  }else{
    fetch('http://dev.virtualearth.net/REST/v1/Locations/'+lat.toString()+','+lng.toString()+'?o=json&key=AnUwsJHYzaXvThcoeyV3M13SSsPeeWjMAXPh6S567SOJ613fuMBgJzUy8RuLr9SU').then(resp=>resp.json()).then(json=>SetStartMarkerText(json['resourceSets'][0]['resources'][0]['name']))
  }
}
 function geo_get_path(lat0, lng0, lat1, lng1){
   fetch('http://dev.virtualearth.net/REST/V1/Routes?wp.0='+lat0.toString()+','+lng0.toString()+'&wp.1='+lat1.toString()+','+lng1.toString()+'&o=json&key=AsY5q0V1uMj7_fPr-3vhVPngftZ1eGgDJjnoPIgPQ1hI5n8tqbuViuYKccdKAugA&routePathOutput=Points&routeAttributes=routePath').then(resp=>resp.json()).then(json=>{(SetRoute(arr_to_route(json['resourceSets'][0]['resources'][0]['routePath']['line']['coordinates'])))})
 }
function geo_search(text, lat, lng, type){
  if(type==0){
    fetch('https://search-maps.yandex.ru/v1?text='+text+'&lang=ru_RU&ll='+lng.toString()+','+lat.toString()+'&spn=5,5&results=1&apikey=29f26da2-b8e5-4ae1-a126-5c25017136bb').then(resp=>resp.json()).then(json=>{
      SetFinishMarkerLatitude(json['features'][0]['geometry']['coordinates'][1]);SetFinishMarkerLongitude(json['features'][0]['geometry']['coordinates'][0]);SetFinishMarkerText(json['features'][0]['properties']['CompanyMetaData']['address'])
    })
  }else{
    fetch('https://search-maps.yandex.ru/v1?text='+text+'&lang=ru_RU&ll='+lng.toString()+','+lat.toString()+'&results=1&spn=5,5&apikey=29f26da2-b8e5-4ae1-a126-5c25017136bb').then(resp=>resp.json()).then(json=>{
      SetStartMarkerLatitude(json['features'][0]['geometry']['coordinates'][1]);SetStartMarkerLongitude(json['features'][0]['geometry']['coordinates'][0]);SetStartMarkerText(json['features'][0]['properties']['CompanyMetaData']['address'])
    })
  }
  
}
  function get_coords(type){
    try{
    navigator.geolocation.getCurrentPosition(location=>{
      if(type==1){
        SetStartMarkerLatitude(location.coords.latitude);SetStartMarkerLongitude(location.coords.longitude);
        geocode(startMarkerLatitude, startMarkerLongitude, 1)
      }else{
        SetFinishMarkerLatitude(location.coords.latitude);SetFinishMarkerLongitude(location.coords.longitude);
        geocode(finishMarkerLatitude, finishMarkerLongitude, 0)
      }
    }, ()=>{Alert.alert("Ошибке геолокации.","Ошибка! Не найдена геопозиция.")}, {enableHighAccuracy: true, timeout:20000, maximumAge:1000})
  }catch(e){
    Alert.alert("Ошибке геолокации.","Ошибка! Не найдена геопозиция.")
  }
  }
  const containerStyle = {backgroundColor: 'white', padding: 20};
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric" };
  return (
    <PaperProvider theme={theme}>
    <View style={styles.container}>
    <Portal>
        <Modal visible={dealsVisible} onDismiss={()=>setDealsVisible(false)} contentContainerStyle={containerStyle}>
          <ScrollView style={{width:"100%", height:"100%"}}>
        <Text style={styles.info_txt}>Вам может подойти (ближайшие маршруты):{'\n'}</Text>
            {route.params!= undefined? route.params['current_role'] == "driver" ? drivers_info.map((v, i)=>{return <List.Item key={i} style={{height: 100}}
            title={"Водитель "+v['name']}
            description={"Откуда: "+v['start']+"\nМесто прибытия: "+v["finish"]+"\nВремя: "+v['datetime']+"\n"+ v['cost']+" руб.\nПассажиров: "+v['num_passenger']}
            left={props => <List.Icon {...props} icon="taxi" />}
            onPress={()=>{Alert.alert("Успешно!", "Успешно! Вы присоединились к поездке с водителем по имени " + v["name"]+". Удачной дороги!"); setDealsVisible(false)}}
            />}) : passengers_info.map((v, i)=>{return <List.Item key={i} style={{height: 100}}
            title={"Пассажир "+v['name']}
            description={"Откуда: "+v['start']+"\nМесто прибытия: "+v["finish"]+"\nВремя: "+v['datetime']+"\nСтоимость: "+ v['cost']+" руб.\nМакс. Пассажиров: "+v['num_passenger']}
            left={props => <List.Icon {...props} icon="walking" />}
            onPress={()=>{Alert.alert("Успешно!", "Успешно! Вы присоединились к поездке с пешеходом по имени " + v["name"]+". Удачной дороги!"); setDealsVisible(false)}}
            />}) : <></>}
            <Button icon='flag' buttonColor='green' onPress={()=>{setDealsVisible(false); Alert.alert("Успешно!", "Успешно! Новая поездка создана. Удачной дороги!"); setDealsVisible(false)}}>Оформить новый маршрут</Button>
            </ScrollView>
        </Modal>
      </Portal>
      <Portal>
        <Modal visible={confirmationVisible} onDismiss={()=>setConfirmationVisible(false)} contentContainerStyle={containerStyle}>
          <Text style={styles.info_txt}>Старт: {startMarkerText}{'\n\n'}Финиш: {finishMarkerText}{'\n\n'}Выберите время отправления: {date.toLocaleDateString('ru', options)}</Text>
          <Button icon={'calendar'} textColor='white' buttonColor={theme.colors.primary} onPress={()=>setDateVisible(true)}></Button><Text style={styles.info_txt}></Text>
          <Button icon={'clock'} textColor='white' buttonColor={theme.colors.primary} onPress={()=>setTimeVisible(true)}></Button>
          {dateVisible ? <DateTimePicker 
          testID="dateTimePicker"
          value={date}
          onChange={onDateChange}
          mode={'date'}
          is24Hour={true}
        /> : <></>}
        {timeVisible ? <DateTimePicker 
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          onChange={onDateChange}
          is24Hour={true}
        /> : <></>}
          <TextInput style={styles.address_input} onEndEditing={(n)=>setCost(n)} placeholder='Стоимость (руб.)' keyboardType='number-pad'></TextInput>
          <TextInput style={styles.address_input} onEndEditing={(n)=>setPeople(n)} placeholder='Максимальное кол-во людей' keyboardType='number-pad'></TextInput>
          <Button icon='check' buttonColor='green' textColor='white' style={{marginTop:15}} onPress={()=>{setConfirmationVisible(false);setDealsVisible(true)}}>Продолжить оформление</Button>
        </Modal>
      </Portal>
    <MapView style={styles.map} initialRegion={{
            latitude: 53.25209,
            longitude: 34.37167,
            latitudeDelta: 1.5,
            longitudeDelta: 1.5,
            
          }} >
            <Marker title='Старт' draggable pinColor='gold' coordinate={{latitude:startMarkerLatitude, longitude:startMarkerLongitude}}
    onDragEnd={(e) => {SetStartMarkerLatitude(e.nativeEvent.coordinate.latitude)
      SetStartMarkerLongitude(e.nativeEvent.coordinate.longitude)
      geocode(startMarkerLatitude, startMarkerLongitude, 1)}}
  /><Marker title='Финиш' pinColor='tan' draggable coordinate={{latitude:finishMarkerLatitude, longitude:finishMarkerLongitude}}
  onDragEnd={(e) => {SetFinishMarkerLatitude(e.nativeEvent.coordinate.latitude)
    SetFinishMarkerLongitude(e.nativeEvent.coordinate.longitude)
    geocode(finishMarkerLatitude, finishMarkerLongitude, 0)}}
/><Polyline
          coordinates={route}
          strokeColor='orange'
          strokeColors={['#7F0000']}
          strokeWidth={6}
          lineDashPattern={[1,1,1,1,1,1,1,1,1,1]}
        />
          </MapView>
          
      
        <View style={styles.address_input_view}>
          <View style={styles.address_one_view}>
            <Avatar.Icon color="#e5cd40" icon="flag" size={70} style={styles.icon_flag}/> 
            <TextInput placeholder='Стартовый адрес' placeholderTextColor='#e0e0e0' onSubmitEditing={e=>{SetStartMarkerText(e.nativeEvent.text);geo_search(e.nativeEvent.text, startMarkerLatitude, startMarkerLongitude, 1)}} style={styles.address_input}></TextInput>
            <IconButton icon="map-marker"
            iconColor="orange"
            size={20}
            style={{borderWidth: 1, borderColor: "orange"}}
            onPress={() => get_coords(1)} />
          </View><View style={styles.address_one_view}>
            <Avatar.Icon color="#e89035" icon="flag" size={70} style={styles.icon_flag}/> 
            <TextInput placeholder='Конечный адрес' placeholderTextColor='#e0e0e0' onSubmitEditing={e=>{SetFinishMarkerText(e.nativeEvent.text);geo_search(e.nativeEvent.text, finishMarkerLatitude, finishMarkerLongitude, 0)}}  style={styles.address_input}></TextInput>
            <IconButton icon="map-marker"
            iconColor="orange"
            size={20}
            style={{borderWidth: 1, borderColor: "orange"}}
            onPress={() => get_coords(0)}></IconButton>
          </View>
          <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{width:'80%', backgroundColor:'white', marginLeft: 10, marginTop:5, height:80}}><Text style={styles.info_txt}>Старт: {startMarkerText == "" ? "Не задано" : startMarkerText}{'\n'}Финиш: {finishMarkerText== "" ? "Не задано" : finishMarkerText}</Text></ScrollView>
          <ScrollView style={{width:"100%", height: 50, top:0}}><List.Item
            title={"Улица Грибоедова 1"}
            left={props => <List.Icon {...props} icon="star" color='yellow'/>}
            onPress={()=>{SetStartMarkerText("Улица Грибоедова 1");SetFinishMarkerText("Улица Грибоедова 1")}}
            /><List.Item
            title={"Улица Ромашина 1"}
            left={props => <List.Icon {...props} icon="star" color='yellow'/>}
            onPress={()=>{SetStartMarkerText("Улица Ромашина 1");SetFinishMarkerText("Улица Ромашина 1")}}
            /><List.Item
            title={"Улица Грибоедова 1"}
            left={props => <List.Icon {...props} icon="star" color='yellow'/>}
            onPress={()=>{SetStartMarkerText("Улица Ленина 1");SetFinishMarkerText("Улица Ленина 1")}}
            /></ScrollView>

          <View style={{width:'100%', alignItems: 'center', position:'absolute', left: 0, right: 0, bottom: -50, flexDirection: 'row',height:50}}><Button icon="map" style={{borderWidth:2, marginLeft: 5, marginRight: 5,width: '45%' , borderColor:theme.colors.primary}} onPress={()=>geo_get_path(startMarkerLatitude, startMarkerLongitude, finishMarkerLatitude, finishMarkerLongitude)} disabled={false}>Проложить путь</Button>
          <Button icon="taxi" buttonColor={'#7d32ca'} textColor='#FFF' style={{borderWidth:2, borderColor: 'grey', width: '40%', flex:1, marginRight:5 }} onPress={()=>{
            if(startMarkerText && finishMarkerText) setConfirmationVisible(true)
            else Alert.alert("Ошибка", "Ошибка! Не заданы начало и конец маршрута!")
            }}>Создать запрос</Button></View>
        </View>
        <IconButton icon='account' iconColor='white'size={30} containerColor='grey' onPress={()=>navigation.navigate('Войти')} style={{position:"absolute", right:10, top:30}}></IconButton>
    
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '55%',
  },
  control_button:{
    width: '30%',
    height: 55
  },
  info_txt:{
    fontSize: 18,
    fontFamily: "Roboto",
    color: 'grey'
  },
  address_input:{
    width: '60%',
    height: 40,
    backgroundColor: '#FFF',
    color: '#000',
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingRight:0
  },
  address_input_view:{
    paddingTop:25,
    borderTopWidth:2,
    borderColor: 'grey',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  address_one_view:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  icon_flag:{
    width: 40,
    height: 40,
    marginRight:20,
    marginLeft: 7,
    fontSize: 40,
    color: 'white',
    backgroundColor: 'white',
    position: 'relative',
    textAlign: 'left',
    flexWrap: 'wrap',
    flexDirection: 'row',
  }
});