import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Container} from "../components/containers/Containers";
import Footer from "../components/containers/Footer";
import {useTranslation} from "react-i18next";
import {DropdownArrowIcon, EditProfileIcon, NotificationIcon} from "../assets/icons/SvgIcons";
import {commonStyles} from "../styles/styles";
import Header from "../components/header/Header";
import {Colors, ColorWithOpacity, Fonts, Images, Pixel} from "../constants/styleConstants";
import {useNavigation} from "@react-navigation/native";
import Button from "../components/touchables/Button";
import {LogoutHandler} from "../store/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";

const Profile: FC = () => {
  const userData: any = useSelector((state: RootState) => state.auth.userData);
  const notifications: any = useSelector((state: RootState) => state.auth.notifications);

  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const [state, setstate] = useState({
    loader: false,
  });

  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    console.log(state, ' state');
    dispatch(LogoutHandler());
  };
  return (
    <Container>
      <Header noBack/>
      <View style={styles.container}>
        <View style={styles.header}>

          <View style={styles.userContainer}>
            <View style={styles.userImage}>
              <FastImage
                style={{...commonStyles.image}}
                resizeMode={'contain'}
                source={(userData.avatar && userData.avatar !== "") ? {uri: userData.avatar} : Images.userImage}
              />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{userData.name}</Text>
              <Text style={styles.phone}>{userData.phone}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.btnContainer} onPress={() => navigate('EditProfile')}>
            <View style={{...commonStyles.rowBox, justifyContent: 'space-between'}}>
              <EditProfileIcon/>
              <Text style={styles.btnTitle}>{t('Edit profile')}</Text>
            </View>
            <DropdownArrowIcon width={7.5} height={12} style={commonStyles.rtlRotate}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnContainer} onPress={() => navigate('Notifications')}>
            <View style={{...commonStyles.rowBox, justifyContent: 'space-between'}}>
              <NotificationIcon fill={ColorWithOpacity(Colors.dark, 0.6)}/>
              <Text style={styles.btnTitle}>{t('Notifications')}</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{!!notifications && notifications.length}</Text>
              </View>
            </View>
            <DropdownArrowIcon width={7.5} height={12} style={commonStyles.rtlRotate}/>
          </TouchableOpacity>

        </View>

        <Button
          style={styles.logoutBtn}
          styleTitle={styles.logoutBtnText}
          title={t('Logout')}
          onPress={submitHandler}
          loader={state.loader}
        />
      </View>
      <Footer/>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    paddingBottom: 145
  },
  header: {},
  btnContainer: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: ColorWithOpacity('#707070', 0.2),
    paddingHorizontal: Pixel(15),
    paddingBottom: Pixel(30),
    marginTop: Pixel(40),
  },
  btnTitle: {
    marginStart: Pixel(30),
    fontFamily: Fonts.bold,
    fontSize: Pixel(31),
    color: ColorWithOpacity(Colors.dark, 0.6),
  },
  logoutBtn: {
    backgroundColor: '#CCCCCC',
    marginTop: Pixel(60),
  },
  logoutBtnText: {
    color: '#878787',
    fontSize: Pixel(36),
    fontFamily: Fonts.medium
  },
  notificationBadge: {
    width: 15,
    height: 15,
    backgroundColor: Colors.secondColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    top: -4,
    left: -5,
    zIndex: 100
  },
  notificationBadgeText: {
    color: Colors.white,
    fontSize: Pixel(17),
    fontFamily: Fonts.bold,
    textAlign: 'center'
  },
  userContainer: {
    ...commonStyles.rowBox,
    alignItems: 'center',
    marginBottom: Pixel(30),
  },
  userImage: {
    width: Pixel(150),
    height: Pixel(150),
    borderRadius: Pixel(75),
    overflow: 'hidden'
  },
  userInfo: {
    marginLeft: 20
  },
  name: {
    color: Colors.mainColor,
    fontSize: Pixel(35),
    fontFamily: Fonts.bold,
    marginBottom: Pixel(5),
  },
  phone: {
    color: ColorWithOpacity(Colors.dark, 0.6),
    fontSize: Pixel(28),
    fontFamily: Fonts.regular,
  }
});
export default Profile;
