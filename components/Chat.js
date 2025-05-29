import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, isConnected, db }) => {
    const { name, bgColor, userID } = route.params || {};
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    };

    const loadCachedMessages = async () => {
        try {
            const cachedMessages = await AsyncStorage.getItem('messages');
            if (cachedMessages) {
                setMessages(JSON.parse(cachedMessages));
            }
        } catch (error) {
            console.log('Failed to load cached messages:', error);
        }
    };

    useEffect(() => {
        let unsubscribe;
        if (isConnected) {
            const messagesQuery = query(
                collection(db, "messages"),
                orderBy("createdAt", "desc")
            );
            unsubscribe = onSnapshot(messagesQuery, async (querySnapshot) => {
                const messagesFirestore = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        _id: doc.id,
                        text: data.text || '',
                        createdAt: data.createdAt && data.createdAt.toDate ? data.createdAt.toDate() : new Date(),
                        user: data.user || {},
                    };
                });
                setMessages(messagesFirestore);
                try {
                    await AsyncStorage.setItem('messages', JSON.stringify(messagesFirestore));
                } catch (error) {
                    console.log('Failed to cache messages:', error);
                }
            });
        } else {
            loadCachedMessages();
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [db, isConnected]);

    useEffect(() => {
        navigation.setOptions({ title: name })
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: bgColor || '#fff' }]}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
                }}
                renderInputToolbar={renderInputToolbar}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    }
});

export default Chat;