import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderStyleInterpolators, TransitionSpecs,} from '@react-navigation/stack';
import {shallowEqual, useSelector} from 'react-redux';
import {Colors} from '../constants/styleConstants';

import Home from '../screens/Home';
import Login from "../screens/auth/Login";
import Forget from "../screens/auth/Forget";
import PhoneCode from "../screens/auth/PhoneCode";
import NewPassword from "../screens/auth/NewPassword";
import Register from "../screens/auth/Register";
import Success from "../screens/auth/Success";
import More from "../screens/More";
import Profile from "../screens/Profile";
import Buy from "../screens/Buy";
import Sale from "../screens/Sale";
import Notifications from "../screens/Notifications";
import NotificationDetail from "../screens/NotificationDetail";
import EditProfile from "../screens/auth/EditProfile";
import ChangePassword from "../screens/auth/ChangePassword";
import About from "../screens/About";
import Banks from "../screens/banks/Banks";
import Terms from "../screens/content/Terms";
import ContactUs from "../screens/ContactUs";
import Privacy from "../screens/content/Privacy";
import Faq from "../screens/content/Faq";
import Onboarding from "../screens/Onboarding";
import {getItem} from "../constants/helpers";
import NewBank from "../screens/banks/NewBank";
import EditBank from "../screens/banks/EditBank";
// import {onboarding} from "../store/selectors/SettingsSelectors";

const Stack = createStackNavigator();
const navigationTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.9],
              })
              : 1,
          },
        ],
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
        backgroundColor: Colors.mainColor,
      },
    };
  },
};
const TabsAnimation = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        opacity: 1,
      },
      overlayStyle: {
        opacity: 1,
      },
    };
  },
};
// console.log('onboarding',onboarding())

const Stacks = () => {
  const {isLogin} = useSelector((state) => state.auth, shallowEqual);
  const {onboarding} = useSelector((state) => state.settings, shallowEqual);

  return (
    <Stack.Navigator
      screenOptions={(props) => {
        global.Navigation = props;
        return {headerShown: false, ...navigationTransition};
      }}
      initialRouteName={
        onboarding === null ? 'Onboarding' : isLogin ? 'Home' : 'Login'
        // isLogin ? 'Home' : !walkthroughVisible ? 'Onboarding' : 'Login'
      }
    >
      {!isLogin && onboarding === null &&<Stack.Screen name="Onboarding" component={Onboarding}/>}
      {!isLogin &&<Stack.Screen name="Login" component={Login}/>}
      <Stack.Screen name="Home" component={Home} options={{...TabsAnimation}}/>
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="Forget" component={Forget}/>
      <Stack.Screen name="PhoneCode" component={PhoneCode}/>
      <Stack.Screen name="NewPassword" component={NewPassword}/>
      <Stack.Screen name="ChangePassword" component={ChangePassword}/>
      <Stack.Screen name="Success" component={Success}/>
      <Stack.Screen name="More" component={More} options={{...TabsAnimation}}/>
      <Stack.Screen name="Profile" component={Profile} options={{...TabsAnimation}}/>
      <Stack.Screen name="EditProfile" component={EditProfile}/>
      <Stack.Screen name="Sale" component={Sale} options={{...TabsAnimation}}/>
      <Stack.Screen name="Buy" component={Buy} options={{...TabsAnimation}}/>
      <Stack.Screen name="Notifications" component={Notifications}/>
      <Stack.Screen name="NotificationDetail" component={NotificationDetail}/>
      <Stack.Screen name="About" component={About}/>
      <Stack.Screen name="Banks" component={Banks}/>
      <Stack.Screen name="NewBank" component={NewBank}/>
      <Stack.Screen name="EditBank" component={EditBank}/>
      <Stack.Screen name="ContactUs" component={ContactUs}/>
      <Stack.Screen name="Terms" component={Terms}/>
      <Stack.Screen name="Privacy" component={Privacy}/>
      <Stack.Screen name="Faq" component={Faq}/>
    </Stack.Navigator>
  );
};

/**
 * @return {JSX.Element}
 */

const initNavgtion = () => {
  return (
    <NavigationContainer>
      <Stacks/>
    </NavigationContainer>
  );
};

export default initNavgtion;
