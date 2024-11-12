import { StatusBar } from 'expo-status-bar';
import { React, useEffect, useState} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import Form from './components/Form';
import TwemojiMozilla from './assets/TwemojiMozilla.ttf';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

const API_URL = process.env.EXPO_PUBLIC_API;

const apiLogin = async () =>{
  try {
    const response = await axios.post(API_URL + '/api/login',{
      username : process.env.EXPO_PUBLIC_USER,
      password : process.env.EXPO_PUBLIC_PASS
    });
    await AsyncStorage.setItem('token',response?.data.accessToken);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

apiLogin();

export default function App() {
  const [apiToken, setApiToken] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [spinnerText, setSpinnerText] = useState('Loading...');

  useEffect(() => {
    getToken();
    // getSettings();

    const loadFonts = async () => {
      await Font.loadAsync({
        TwemojiMozilla,
      })
    }
      
    loadFonts();
  },[]);

  const getSettings = async () =>{
    try {
      const response = await axios({
        method: 'get',
        url: API_URL + '/api/apk/getConfig',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        }
      }).catch( (err) => {
        console.error('error axios:', err.response);
      });

      if(response?.data){
        setCondoMode(response.data?.condoMode);
        await AsyncStorage.setItem('condoMode',condoMode);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const showHideSpinner = (val) => {
    setShowSpinner(val);
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      setApiToken(value);
    } catch (error) {
      // Error retrieving data
    }
  }

  // const settingClicked = () => {
  //   setModalVisible(true)
  // }

  // const toggleCondoMode = () => {
  //   setCondoMode(previousState => !previousState);
  // }

  // const cancelSettings = () => {
  //   setModalVisible(!modalVisible);
  // }

  // const submitSettings = () => {
  //   cancelSettings();
  // }

  return (
    <AutocompleteDropdownContextProvider>
      
      <ScrollView contentContainerStyle={styles.container}>
        <View >
          
          {/* <Settings 
            onClick={settingClicked}
          /> */}

        <Spinner
            visible={showSpinner}
            textContent={spinnerText}
            textStyle={styles.spinnerTextStyle}
          />
          
          <View style={styles.form}>
            <Form setSpinner={showHideSpinner} ></Form>
            <StatusBar style="auto" />
          </View>

          {/* <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.input}>
                    <Input 
                      label="URL/IP"
                      placeholder={ "URL/IP address of vms server" }
                      newValue={API_URL}
                    />
                  </View>
                  <View style={styles.condoMode}>
                    <Text style={styles.condoLabel}>Condo Mode</Text>
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={isCondoMode ? '#81b0ff' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleCondoMode}
                      value={isCondoMode}
                    />
                  </View>
                  <View style={styles.modalBtns}>
                    <Button 
                      style={styles.btn2}
                      title="Cancel"
                      color="white"
                      labelColor='black'
                      onClick={cancelSettings}
                    />
                    <Button 
                      style={styles.btn}
                      title="Submit"
                      color="#2196f3"
                      onClick={submitSettings}
                    />
                  </View>
                </View>
              </View>
          </Modal> */}
        </View>
        </ScrollView>
    </AutocompleteDropdownContextProvider>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    paddingTop: 45,
    paddingHorizontal: 30
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  form: {
    paddingHorizontal: 30
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    width: 500,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  spinnerTextStyle: {
    color: '#FFF'
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  input: {
    width: '100%'
  },

  condoMode: {
    width: '100%',
    flexDirection: 'row'
  },

  condoLabel: {
    marginTop: 15,
    paddingRight: 15
  },

  modalBtns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },

  btn2: {
    borderWidth: 1,
    borderColor: 'black'
  }
});
