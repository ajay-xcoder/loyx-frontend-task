import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Provider } from 'react-redux';  

import SplashScreen from './src/pages/splashScreen';
import CreateUserScreen from './src/pages/createUser';
import HomeScreen from './src/pages/homeScreen';
import BrandsScreen from './src/pages/brandsScreen';
import MyOffersScreen from './src/pages/myOffersScreen';
import WishListScreen from './src/pages/wishlistScreen';
import VerificationScreen from './src/pages/verficationScreen';
import PrivacyPolicy from './src/pages/termsConditionScreen';
import TermsAndCondition from './src/pages/termsConditionScreen';
import { store } from './redux/store';

type StackParamList = {
  Splash: undefined;
  CreateUser: undefined;
  Verification: undefined;
  HomeTabs: undefined;
};

type TabParamList = {
  Home: undefined;
  Brands: undefined;
  'My Offers': undefined;
  Wishlist: undefined;
};

const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let imageSource;

        if (route.name === 'Home') {
          imageSource = require('./src/assets/footericons/footer_home.png'); 
        } else if (route.name === 'Brands') {
          imageSource = require('./src/assets/footericons/footer_brand.png');
        } else if (route.name === 'My Offers') {
          imageSource = require('./src/assets/footericons/footer_offers.png');
        } else {
          imageSource = require('./src/assets/footericons/footer_wishlist.png');
        }

        return (
          <Image
            source={imageSource}
            style={{
              width: 24,
              height: 24,
              tintColor: color, 
              resizeMode : 'contain'
            }}
          />
        );
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Brands" component={BrandsScreen} options={{ headerShown: false }} />
    <Tab.Screen name="My Offers" component={MyOffersScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Wishlist" component={WishListScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const App: React.FC = () => {
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateUser" component={CreateUserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} options={{ headerShown: false }} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>  
  );
};

export default App;
