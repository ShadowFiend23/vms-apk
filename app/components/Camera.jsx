import { StyleSheet, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import IconBtn from './IconBtn';

const Cmr = () => {
    const router = useRouter();

    const uploadImg = () => {

    }
    
    const openCamera = () => {
        router.navigate('/picture');
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={require('../assets/default-user.png')}
            />
            <View style={styles.btnGroup}>
                <IconBtn
                    icon='camera'
                    onClick={openCamera}
                />
                <IconBtn
                    icon='upload'
                    onClick={uploadImg}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%'
    },

    img: {
        width: 200,
        height: 200
        // aspectRatio: 1
    },

    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: 150
    }
});

export default Cmr
