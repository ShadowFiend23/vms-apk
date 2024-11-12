import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const IconBtn = ({ icon, onClick }) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.btnContainer}>
                <Feather name={icon} size={40} color="black" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
  });

export default IconBtn
