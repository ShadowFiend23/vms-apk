import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import Phone from './Phone';

const Form = () => {
  return (
    <View>
        <Input 
            label='Enter your name' 
            placeholder='Enter your name'
        />

        <Phone />

        <Input 
            label='Enter your email' 
            placeholder='Enter your email'
        />
    </View>
  )
}

export default Form
