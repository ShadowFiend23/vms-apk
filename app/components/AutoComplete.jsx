import { useCallback, useRef, useState, useEffect }from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import axios from 'axios';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API;
let API_TOKEN = '';

const getApiToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    API_TOKEN = value;
  } catch (error) {
    console.error("error geting api token,", error)
  }
}

const AutoCompleteInput = ({ label, onChangeValueHandler, setSpinner }) => {
    const [loading, setLoading] = useState(false);
    const [suggestionsList, setSuggestionsList] = useState(null)
    const dropdownController = useRef(null);

    getApiToken();

    const filterData = async (query) => {
        try {
          const response = await axios({
            method: 'get',
            url: API_URL + `/api/apk/searchQuery?q=${query}`,
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${API_TOKEN}`
            }
          }).catch( (err) => {
            throw(err.response);
          });
           
          if(response.status == '200'){
            return response.data;
          }
          
        } catch (error) {
          console.error('Error autcomplete input:', error);
        }
    }

    const getData = async (id) => {
      try {
        const response = await axios({
          method: 'post',
          url: API_URL + `/api/apk/getData`,
          data: {
            id: id
          },
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          }
        }).catch( (err) => {
          throw(err.response);
        });

        if(response.status == 200){
          return response.data;
        }
        
      } catch (error) {
        console.error('Error autcomplete input:', error);
      }
    }

    const onSelectItem = async (val) => {
      if(val){
        setSpinner(true);
        let data = await getData(val.id);
        onChangeValueHandler(data);
      }
    }

    const searchRef = useRef(null)

    const getSuggestions = useCallback(async q => {
      // const filterToken = q.toLowerCase()
      if (typeof q !== 'string' || q.length < 3) {
        setSuggestionsList(null)
        return
      }
      setLoading(true);

      // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      // const items = await response.json()
      // const suggestions = items
      //   .filter(item => item.title.toLowerCase().includes(filterToken))
      //   .map(item => ({
      //     id: item.id,
      //     title: item.title,
      //   }))
      const suggestions = await filterData(q);
      // const suggestions = [
      //   {
      //     id    : 1,
      //     title : 'Test 1'
      //   },

      //   {
      //     id    : 2,
      //     title : 'Test 2'
      //   },
      // ]
      setSuggestionsList(suggestions);
      setLoading(false);
    }, [])

    const onClearPress = useCallback(() => {
      setSuggestionsList(null)
    }, [])

    const onOpenSuggestionsList = useCallback(isOpened => {}, [])

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{ label }</Text>
            <AutocompleteDropdown
              ref={searchRef}
              controller={controller => {
                dropdownController.current = controller
              }}
              dataSet={suggestionsList}
              onChangeText={getSuggestions}
              onSelectItem={onSelectItem}
              debounce={600}
              suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
              onClear={onClearPress}
              onOpenSuggestionsList={onOpenSuggestionsList}
              loading={loading}
              useFilter={false}
              textInputProps={{
                placeholder: 'Type 3+ letters ',
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  borderRadius: 8,
                  paddingHorizontal: 16,
                },
              }}
              rightButtonsContainerStyle={{
                right: 8,
                height: 30,

                alignSelf: 'center',
              }}
              inputContainerStyle={{
                borderRadius: 8,
              }}
              containerStyle={{ flexGrow: 1, flexShrink: 1 }}
              renderItem={(item, text) => <Text style={{  padding: 15 }}>{item.title}</Text>}
            //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
            //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
              inputHeight={50}
              showChevron={false}
              closeOnBlur={false}
              //  showClear={false}
            />
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },

    label: {
      paddingVertical: 5
    }
  });

export default AutoCompleteInput
