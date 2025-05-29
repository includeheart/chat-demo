import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Icon from '../assets/icon.svg';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [bgColor, setBgColor] = useState('#090C08');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9CBE5'];
    const auth = getAuth();
    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate('Chat', { userID: result.user.uid, name: name, bgColor: bgColor });
                Alert.alert('You are signed in anonymously');
            })
            .catch((error) => {
                Alert.alert('Error signing in', error.message);
            })
    }

    return (
        <ImageBackground source={require('../assets/Background-Image.png')} style={[styles.container, styles.background]}>
            <View style={styles.container}>
                <Text style={styles.title}>Chat App</Text>
                <View style={styles.box}>
                    <View style={styles.inputContainer}>
                        <Icon width={20} height={20} style={styles.icon} />
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={setName}
                            placeholder='Your Name'
                            placeholderTextColor='#757083'
                        />
                    </View>
                    <Text style={styles.chooseBackgroundColorText}>Choose Background Color:</Text>
                    <View style={styles.colorButtonsContainer}>
                    {colors.map((color) => (
                        <TouchableOpacity
                            key={color}
                            style={[
                                styles.chooseBackgroundColorButton,
                                { backgroundColor: color },
                                bgColor === color && styles.selectedColorButton
                            ]}
                            onPress={() => setBgColor(color)}
                        />
                    ))}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={signInUser}>
                        <Text style={styles.chatButtonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        resizeMode: 'cover',
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
        position: 'absolute',
        top: 50,
    },
    box: {
        width: '88%',
        height: '34%',
        backgroundColor: '#ffffff',
        position: 'absolute',
        top: '55%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#757083',
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 20,
    },
    icon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    },
    chooseBackgroundColorText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1,
        marginVertical: 15,
        marginHorizontal: 20,
    },
    colorButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    chooseBackgroundColorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 8,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedColorButton: {
        borderColor: '#757083',
    },
    button: {
        backgroundColor: '#757083',
        borderRadius: 5,
        padding: 10,
        marginVertical: 20,
        marginHorizontal: 20,
    },
    chatButtonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Start;