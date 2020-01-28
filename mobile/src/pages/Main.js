import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main( { navigation } ) {
    const [name, setName] = useState('bruno');
    const [email, setEmail] = useState('bruno_diego5@hotmail.com');
    
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });            

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });

                console.log('main currentRegion:', currentRegion);
            }
        }

        loadInitialPosition();
    }, []);

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null;
    }

    async function handleSubmit() {
        const response = await api.post('users', {
            name,
            email,
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude
        });
        
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        navigation.navigate('Chat');
    }

    return (
        <>
          <View style={styles.inputBlock}>
            <Text>Nome</Text>
            <TextInput 
              required
              value={name}
              onChangeText={setName} />
          </View>

          <View style={styles.inputBlock}>
            <Text>Email</Text>
            <TextInput 
              value={email}
              onChangeText={setEmail}/>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text>Latitude</Text>
              <TextInput 
                value={`${currentRegion.latitude}`}
                onChangeText={latitude => setCurrentRegion({latitude})}/>
            </View>

            <View style={styles.inputBlock}>
              <Text>Longitude</Text>
              <TextInput 
                value={`${currentRegion.longitude}`}
                onChangeText={longitude => setCurrentRegion({longitude})}/>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
                    <MaterialIcons name="lock" size={20} color="#fff"/>
                </TouchableOpacity>
          </View>
          
        </>
    );
}

const styles = StyleSheet.create({
   map: {
       flex: 1
   },
   avatar: {
       width: 54,
       height: 54,
       borderRadius: 4,
       borderWidth: 4,
       borderColor: '#fff'
   },
   callout: {
       width: 260
   },
   devName: {
       fontWeight: 'bold',
       fontSize: 16
   },
   devBio: {
       color: '#666',
       marginTop: 5,
   },
   devTechs: {
       marginTop: 5,
   },
   searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',

   },
   searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
   },
   loadButton: {
       width: 50,
       height: 50,
       backgroundColor: '#8e4dff',
       borderRadius: 25,
       justifyContent: 'center',
       alignItems: 'center',
       marginLeft: 15,

   },
   inputBlock: {
    marginTop: 20,
   },
   inputGroup: {
    marginTop: 20,
    display: 'flex',
   },
   loginButton: {
       width: 50,
       height: 50,
       backgroundColor: '#8e4dff',
       borderRadius: 25,
       justifyContent: 'center',
       alignItems: 'center',
       marginLeft: 15,

   }
});

export default Main;