import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Input = ({ label, placeholder }) => {
  return (
    <View style={styles.container}>
        <Text styles={styles.label}>
            { label }
        </Text>
        <TextInput 
            style={styles.input}
            placeholder={placeholder}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
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

export default Input
