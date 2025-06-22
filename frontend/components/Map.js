import React, {useState} from 'react';
import { StyleSheet } from 'react-native';


export default function Map(){
  const [startMarkerLatitude, SetStartMarkerLatitude] = useState(53.25209)
  const [startMarkerLongitude, SetStartMarkerLongitude] = useState(34.37167)
  const [finishMarkerLatitude, SetFinishMarkerLatitude] = useState(53.2)
  const [finishMarkerLongitude, SetFinishMarkerLongitude] = useState(34.4)

      return (
        <MapView style={styles.map} initialRegion={{
            latitude: 53.25209,
            longitude: 34.37167,
            latitudeDelta: 1.5,
            longitudeDelta: 1.5,
            
          }} >
            <Marker title='Старт' draggable pinColor='gold' coordinate={{latitude:startMarkerLatitude, longitude:startMarkerLongitude}}
    onDragEnd={(e) => {SetStartMarkerLatitude(e.nativeEvent.coordinate.latitude)
      SetStartMarkerLongitude(e.nativeEvent.coordinate.longitude)}}
  /><Marker title='Финиш' pinColor='linen' draggable coordinate={{latitude:finishMarkerLatitude, longitude:finishMarkerLongitude}}
  onDragEnd={(e) => {SetFinishMarkerLatitude(e.nativeEvent.coordinate.latitude)
    SetFinishMarkerLongitude(e.nativeEvent.coordinate.longitude)}}
/>
          </MapView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '77%',
    },
  });

