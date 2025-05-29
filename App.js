import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDCvPsHXdB_YhM9p87agQad0SECgkxfhmo",
    authDomain: "chat-demo-4b460.firebaseapp.com",
    projectId: "chat-demo-4b460",
    storageBucket: "chat-demo-4b460.firebasestorage.app",
    messagingSenderId: "370676429535",
    appId: "1:370676429535:web:54966607a3f35a64b5ef6a",
    measurementId: "G-3VZ9B5VN52"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat' component={Chat} initialParams={{ db }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;