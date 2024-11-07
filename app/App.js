import { StatusBar } from 'expo-status-bar';
import { React, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import Form from './components/Form';
import TwemojiMozilla from './assets/TwemojiMozilla.ttf';

export default function App() {

  useEffect(() => {
    const loadFonts = async () => {
        await Font.loadAsync({
          TwemojiMozilla,
        })
      }
      
    loadFonts()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Form></Form>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
  },

  form: {
    padding: 20
  }
});
