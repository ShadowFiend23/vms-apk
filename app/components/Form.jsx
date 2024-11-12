import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from './Button';
import Company from './Company';
import Host from './Host';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API;
let listOfPurposes = [];

const loadPurpose = async () => {
  try {
      const response = await axios({
          method: 'get',
          url: API_URL + `/api/apk/getPurpose`,
          headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
          }
      }).catch( (err) => {
          throw(err.response);
      });

      if(response.status == 200){
        listOfPurposes = response.data;
      }
  
  } catch (error) {
      console.error('Error loadpurpose input:', error);
  }
}

const getApiToken = async () => {
  try {
      const value = await AsyncStorage.getItem('token');
      API_TOKEN = value;
      loadPurpose();
  } catch (error) {
      console.error("error geting api token,", error)
  }
}

getApiToken();

const Form = ({ setSpinner }) => {
  const router = useRouter();
  const [isCondoMode, setIsCondoMode] = useState(false)
  const [firstPageForm, setFirstPageForm] = useState({});
  

  useEffect( () => {
    getCondoMode();
  })

  const getCondoMode = async () => {
    try {
      const value = await AsyncStorage.getItem('condoMode');
      setIsCondoMode(value);
    } catch (error) {
      // Error retrieving data
    }
  }

  const nextPage = () => {
    router.push({
      pathname: '/visitor',
      params: {
        companyInfo: JSON.stringify(firstPageForm.companyInfo),
        contactPerson: firstPageForm.contactPerson,
        contactPersonMobile: firstPageForm.contactPersonMobile,
        purposes: JSON.stringify(listOfPurposes)
      }
    });
  }

  const refresh = () => {

  }

  const formValues = (val) => {
    setFirstPageForm(val.data);
  }

  return (
    <View>
        {
          isCondoMode ? <Host setFormValues={formValues} setSpinner={setSpinner} /> : <Company setSpinner={setSpinner} setFormValues={formValues} />
        }

        <View style={styles.footer}>
          <Button 
            title="Refresh"
            color="#2196f3"
            onClick={refresh}
          />
          <Button 
              title="Next"
              color="#2196f3"
              onClick={nextPage}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  }
});

export default Form
