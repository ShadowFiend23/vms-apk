import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Select } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';


const Dropdown = ({ label, list, onSelectValue }) => {
    const [selectedPurpose, setSelectedPurpose] = useState();
    const [listOfPurposes, setListOfPurpses] = useState( list ?? []);
    const [placeholder, setPlaceholder] = useState("Select a purpose");

    const onChangeValue = (val, i) => {
        if(val){
            setSelectedPurpose(val)
            onSelectValue(val);
        }
    }

    
    return (
        <View style={styles.container}>
            <Text>{ label }</Text>
            <RNPickerSelect
                onValueChange={onChangeValue}
                style={styles.input}
                items={listOfPurposes}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },

    input: {
      width:  '100%',
      borderWidth: 1,
      borderRadius: 8,
      height: 48,
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      marginVertical: 5
    },
});

export default Dropdown
