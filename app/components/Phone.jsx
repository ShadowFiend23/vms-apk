import { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import PhoneInput from 'react-native-international-phone-number';

const Phone = ({ label, isDisabled, newValue, onChangeValue }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [inputValue, setInputValue] = useState(newValue);

    function handleInputValue(phoneNumber) {
        setInputValue(phoneNumber);
        onChangeValue(phoneNumber);
    }

    function handleSelectedCountry(country) {
        setSelectedCountry(country);
    }

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text>{ label }</Text>
            </View>
            <PhoneInput
                value={inputValue}
                onChangePhoneNumber={handleInputValue}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={handleSelectedCountry}
                defaultCountry='PH'
                disabled={isDisabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },

    label: {
        paddingVertical: 5
    },
});
export default Phone
