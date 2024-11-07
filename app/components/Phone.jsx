import React, { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import PhoneInput from 'react-native-international-phone-number';

const Phone = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [inputValue, setInputValue] = useState('');

    function handleInputValue(phoneNumber) {
        setInputValue(phoneNumber);
    }

    function handleSelectedCountry(country) {
        setSelectedCountry(country);
    }

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text>Enter Your Mobile Number</Text>
            </View>
            <PhoneInput
                value={inputValue}
                onChangePhoneNumber={handleInputValue}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={handleSelectedCountry}
                defaultCountry='PH'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        paddingVertical: 5
    },
});
export default Phone
