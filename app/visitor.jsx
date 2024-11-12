import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Input from './components/Input';
import Cmr from './components/Camera';
import Phone from './components/Phone';
import Button from './components/Button';
import Dropdown from './components/Dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import FlashMessage, { showMessage } from "react-native-flash-message";
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API;

const getApiToken = async () => {
  try {
      const value = await AsyncStorage.getItem('token');
      API_TOKEN = value;
  } catch (error) {
      console.error("error geting api token,", error)
  }
}

getApiToken();

const Visitor = () => {
  const router = useRouter();
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const params = useLocalSearchParams();
  const [showSpinner, setShowSpinner] = useState(false);
  const [spinnerText, setSpinnerText] = useState('Loading...');
  
  const submitClick = async () => {
    setSpinner(true);
    try {
      const response = await axios({
        method: 'post',
        url: API_URL + `/api/apk/register`,
        data: params,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        }
      }).catch( (err) => {
        throw(err.response);
      });
      if(response.status == 200){
        setSpinner(false);
        showMessage({
          message: "Success",
          description: response.data.message,
          type: "success",
          icon: "success",
          position: 'center',
          floating: true
        });

        await sleep(2000);

        router.replace('/');
      }
    } catch (error) {
      setSpinner(false);
      if(error.data){
        console.error("Error submitting data: ", error.data.message)
      }
      console.error('Error ubmitting data:', error);
    }
  }

  const setSpinner = (val) => {
    setShowSpinner(val);
  }

  const goBack = () => {
    router.back();
  }

  const onChangeFirstName = (val) => {
    params.visitorFirstName = val;
  }

  const onChangeLastName = (val) => {
    params.visitorLastName = val;
  }

  const onChangeEmail = (val) => {
    params.visitorEmail = val;
  }

  const onChangePhone = (val) => {
    params.visitorPhone = val;
  }

  const onChangeDropdwn = (val) => {
    params.purpose = val;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        
          <FlashMessage />
          <Spinner
            visible={showSpinner}
            textContent={spinnerText}
            textStyle={styles.spinnerTextStyle}
          />

          <View style={styles.camera}>
            <Cmr />
          </View>
          <Input 
              label='Enter your first name' 
              placeholder='Enter your first name'
              onChangeValue={onChangeFirstName}
          />

          <Input 
              label='Enter your last name' 
              placeholder='Enter your last name'
              onChangeValue={onChangeLastName}
          />

          <Phone 
            label="Enter your mobile number" 
            onChangeValue={onChangePhone}
          />

          <Input 
              label='Enter your email' 
              placeholder='Enter your email'
              onChangeValue={onChangeEmail}
          />

          <Dropdown 
            label="Purpose"
            list={JSON.parse(params.purposes)}
            onSelectValue={onChangeDropdwn}
          />

          <View style={styles.footer}>
            <Button 
              style={styles.btn}
              title="Back"
              color="#2196f3"
              onClick={goBack}
            />
            <Button 
              style={styles.btn}
              title="Submit"
              color="#2196f3"
              onClick={submitClick}
            />
          </View>
      </View>
    </ScrollView>
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
    paddingHorizontal: 30,
    paddingVertical: 25
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  
  camera: {
    width: '100%'
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  spinnerTextStyle: {
    color: '#FFF'
  }
});

export default Visitor
