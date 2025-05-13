import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from 'react-native';
import { useState } from 'react';
import Icon from '../assets/icon.svg'; // Import the SVG icon

const Start = ({ navigation }) => {
    const [name, setName] = useState('');

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
                    <Button title='Go to Chat' onPress={() => navigation.navigate('Chat', { name: name })} />
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
        height: '44%',
        backgroundColor: '#ffffff',
        position: 'absolute',
        top: '40%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#757083',
        padding: 10,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 20,
        marginRight: 20,
    },
    icon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    },
});

export default Start;