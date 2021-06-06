import React, {FC} from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors, Pixel} from "../../constants/styleConstants";
import {useTranslation} from "react-i18next";
import {useNavigation, useRoute} from "@react-navigation/native";
import {BuyIcon, HomeIcon, MoreIcon, SaleIcon, UserIcon} from "../../assets/icons/SvgIcons";
import {commonStyles} from "../../styles/styles";
import FooterTab from "../FooterTab";

const Footer: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/mask.png')} resizeMode={'cover'} style={{
        // flex: 1,
        // justifyContent: "center",
        // width:'100%',
        // height:'100%',
        flexDirection:'row'
      }}>
        <FooterTab
          active={route.name === 'Sale'}
          label={t('Sale')}
          Icon={() => <SaleIcon fill={route.name === 'Sale' ? Colors.secondColor : Colors.mainColor}/>}
          onPress={() => navigate('Sale')}
        />
        <FooterTab
          active={route.name === 'Buy'}
          label={t('Purchase')}
          Icon={() => <BuyIcon fill={route.name === 'Buy' ? Colors.secondColor : Colors.mainColor}/>}
          onPress={() => navigate('Buy')}
        />

        <TouchableOpacity
          onPress={() => navigate('Home')}
          style={styles.homeTab}
        >
          <View
            style={[styles.buttonLinear, {backgroundColor: Colors.secondColor}]}>
            <HomeIcon/>
          </View>
        </TouchableOpacity>

        <FooterTab
          active={route.name === 'Profile'}
          label={t('Profile')}
          Icon={() => <UserIcon fill={route.name === 'Profile' ? Colors.secondColor : Colors.mainColor}/>}
          onPress={() => navigate('Profile')}
        />

        <FooterTab
          active={route.name === 'More'}
          label={t('More')}
          Icon={() => <MoreIcon fill={route.name === 'More' ? Colors.secondColor : Colors.mainColor}/>}
          onPress={() => navigate('More')}
        />
      </ImageBackground>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    height: Pixel(180),
    paddingBottom: Pixel(50),
    // paddingTop: Pixel(30),
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    position: 'absolute',
    bottom: 0,
    right:0,
    left:0
  },
  tabContainer: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeTab: {
    // backgroundColor: Colors.white,
    alignSelf: 'center',
    paddingTop: 25,
    paddingBottom: 60,
    // borderRadius: 80,
    paddingHorizontal: 10,
  },
  buttonLinear: {
    ...commonStyles.rowBox,
    flexDirection: 'row',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  homeIcon: {
    fontSize: 30,
    color: Colors.white,
  },
});
