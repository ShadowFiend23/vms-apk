import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Button = ({ title, color, onClick, labelColor = 'white'}) => {
    const styles = StyleSheet.create({
        btn: {
            backgroundColor: color,
            paddingVertical: 10,
            paddingHorizontal: 50,
            borderRadius: 8
        },

        label: {
            color: labelColor
        }
    });

  return (
    // <View>
        <TouchableOpacity style={styles.btn} onPress={onClick}>
            <Text style={styles.label}>{ title }</Text>
        </TouchableOpacity>
    // </View>
  )
}

export default Button
