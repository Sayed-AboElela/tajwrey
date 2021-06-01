import React, {FC} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import {Colors} from '../constants/styleConstants';
import {SplashLogo} from "../assets/icons/SvgIcons";

const {width, height} = Dimensions.get('window');
const Splash: FC = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        width,
        height,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <SplashLogo/>
    </SafeAreaView>
  );
};

export default Splash;
