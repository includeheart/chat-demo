import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';

const Chat = ({ route, navigation }) => {
    const { name, bgColor, userID, db } = route.params || {};
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    }

    useEffect(() => {
        const messagesQuery = query(
            collection(db, "messages"),
            orderBy("createdAt", "desc")
        );
        const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
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
        });

        return () => unsubscribe();
    }, [db]);

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