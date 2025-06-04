# Chat Demo

A React Native chat app built with Expo, Firebase, and Gifted Chat.

## Features

- Anonymous sign-in with Firebase
- Real-time chat with Firestore
- Send images and share location
- Offline message caching
- Customizable chat background color

## Setup

1. Clone the repo and install dependencies:
   ```sh
   npm install
   ```

2. Start the Expo development server:
   ```sh
   npm start
   ```

3. Run on your device:
   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

## Project Structure

- [`App.js`](App.js): App entry, navigation, and Firebase setup
- [`components/Start.js`](components/Start.js): Start screen (sign-in, color selection)
- [`components/Chat.js`](components/Chat.js): Chat UI and logic
- [`components/CustomActions.js`](components/CustomActions.js): Image/location sharing

## Dependencies

- React Native & Expo
- Firebase
- react-native-gifted-chat
- react-native-maps