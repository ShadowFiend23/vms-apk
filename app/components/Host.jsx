import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AutoCompleteInput from './AutoComplete';
import Input from './Input';
import Phone from './Phone';


const Host = () => {
  return (
    <View>
        <AutoCompleteInput 
          label={"Search Host"}
        />

        <Input
          label="Tower"
          placeholder="Tower"
          isDisabled={true}
        />

        <Input
          label="Unit"
          placeholder="Unit"
          isDisabled={true}
        />

        <Phone 
          isDisabled={true}
        />
    </View>
  )
}

export default Host
