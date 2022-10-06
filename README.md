# Restaurant Details App using React Native

An app build using React native at frontend and Yelp API as the data provider using React native as the frontend technology.
Before starting the project make sure you have the react native environment setup. If not follow the steps for Expo Go Quickstart in this link: https://reactnative.dev/docs/environment-setup

## Installation

To get the app up and running follow the below step:

Clone the repository using the following command

```bash
  git clone https://github.com/sranvare007/restaurant-app-react-native
```

Change current working directory using following command

```bash
  cd restaurant-app-react-native
```

Install the dependencies using following command

```bash
  npm install
```

To use the app you need to get API key from Yelp which is the data provider for the app.
Follow the below steps to get API key.

1. Go to https://www.yelp.com/developers/documentation/v3/get_started and signin/Login to get your API key.
2. Create a new file in the root folder in the project with the name as ".env"
3. Copy the API key and paste it in the .env file as:

```bash
  REACT_APP_YELP_API_KEY=/*Yelp API Key from your account*/
```

4. Run the app using npm start

To build the app using EAS add this config file in eas.json in the root folder:
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "env": {
        "REACT_APP_YELP_API_KEY": %YELP_API_KEY%
      }
    }
  }	
}

