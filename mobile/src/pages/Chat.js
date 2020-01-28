import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewMessages } from '../services/socket';

function Chat() {
    const [messages, setMessages ] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [message, setMessage] = useState([]);
    
    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });            

                console.log(coords);
                const { latitude, longitude } = coords;

                await setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });

                console.log('currentRegion: ',currentRegion );

                setupWebsocket();
            }
        }

        loadInitialPosition();
    }, []);

    useEffect(() => {
        subscribeToNewMessages(message => setMessages([...messages, message]));
    }, [messages]);

    function setupWebsocket() {
        disconnect();

        

        const { latitude, longitude } = currentRegion;

        if (!latitude) {
            console.log({ latitude, longitude });
        }
        

        connect(
            latitude,
            longitude
        );

    }  

    useEffect(() => {
        async function loadMessages() {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const response = await api.get('/searchmessages', {
              params: {
                  latitude: user.location.coordinates[1],
                  longitude: user.location.coordinates[0]
              }
            });
    
            setMessages(response.data.messages);
        }
    
        loadMessages();
    }, []);

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    async function handleAddMessage() {
        const { latitude, longitude } = currentRegion;    

        const { text } = message; 

        const user = JSON.parse(await AsyncStorage.getItem('user'));

        const response = await api.post('messages', { text, latitude, longitude, user });

        setMessages([...messages, response.data]);

        setupWebsocket();
    }

    if (!currentRegion) {
        return null;
    }

    /*onRegionChangeComplete={handleRegionChanged} 
    initialRegion={currentRegion} 
    style={styles.map} */

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {messages.map(messagetext => (
                    <View  key={messagetext._id} >
                        <Text style={styles.devBio}>{messagetext.user.name}</Text>
                        <Text style={styles.devName}>{messagetext.text}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Digite uma mensagem..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={message.text}
                    onChangeText={text => setMessage({text})}
                />
                <TouchableOpacity  onPress={handleAddMessage} style={styles.loadButton}>
                    <MaterialIcons name="send" size={20} color="#fff"/>
                </TouchableOpacity>
            </View>
        </ SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        bottom: 20,
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

   }
});

export default Chat;