# CozyChat

**CozyChat** is a chat app built with React Native. It is optimized for both Android an iOS devices. The app will provide users with a chat interface and options to take and share photos and their location.

---

## Getting started
To set up **CozyChat** in your own system, please follow these steps:
#### **Development environment setup**
- install the latest LTS Node version
- run  `npm install expo-cli --global`
- to run **CozyChat** on Windows or Linux, install [Android studio](https://developer.android.com/studio) 
- to run **CozyChat** on Mac, install [XCode](https://developer.apple.com/xcode/) 
- to run **CozyChat** on your phone, get the ExpoApp [for iOS](https://apps.apple.com/de/app/expo-go/id982107779) / 
     [for Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US)
#### **Database configuration**
- Create a [Firebase](https://firebase.google.com/) account, and sign in.
- Click on "create a project" and follow the steps. Start in test mode, then start a collection. Select "Auto-ID" to generate a random Document ID.
- Open up "Settings", then "General" tab. Under the section "Your apps", link Firebase to the app by clicking the tag icon.
- Click "Firestore for Web" and then copy the contents of the config object info your .js script. Follow the instructions to initialize the App.

#### **Installation of the necessary libraries (here using npm and expo)**
- `npm install react`
- `npm install react-native`
- `npm install react-native-gifted-chat`
- `npm install @react-native-community/netinfo`
- `npm install @react-native-async-storage/async-storage`
- `npm install react-navigation`
- `npm install firebase`
- `npm install cookies`
- `npm install expo-module-scripts`
- `expo install expo-permissions`
- `expo install expo-image-picker`
- `expo install expo-location`
- `expo install react-native-maps`
- `expo install expo-camera`

#### **Start Expo project**
- From project folder, run `npm start` or `expo start`

---


## Key Features
- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.


## User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.