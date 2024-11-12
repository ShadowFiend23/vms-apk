import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const Settings = ({ onClick }) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles.btn}>
        <View style={styles.btnContainer}>
            <Feather name="settings" size={24} color="black" style={styles.btn} />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn: {
        paddingTop: 25,
        paddingHorizontal: 30,
        textAlign: 'right'
    }
});

export default Settings
