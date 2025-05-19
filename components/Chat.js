import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

const Chat = ({ route, navigation }) => {
    const { name, bgColor } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: bgColor || '#fff' }]}>
            <Text style={styles.chatText}>Chat</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff'
    },
});

export default Chat;