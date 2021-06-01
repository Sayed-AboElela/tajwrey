import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container} from "../components/containers/Containers";
import Footer from "../components/containers/Footer";
import {useTranslation} from "react-i18next";
import {DropdownArrowIcon, EditProfileIcon, NotificationIcon} from "../assets/icons/SvgIcons";
import {commonStyles} from "../styles/styles";
import Header from "../components/header/Header";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../constants/styleConstants";
import {useNavigation} from "@react-navigation/native";
import Button from "../components/touchables/Button";

const Profile: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();

  return (
    <Container>
      <Header noBack/>
      <View style={styles.container}>
        <View style={styles.header}>
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
            </View>
            <DropdownArrowIcon width={7.5} height={12} style={commonStyles.rtlRotate}/>
          </TouchableOpacity>

        </View>
        <Button
          style={styles.logoutBtn}
          styleTitle={styles.logoutBtnText}
          title={t('Logout')}
          onPress={() => {
            console.log('Confirm the payment')
          }}
        />
      </View>
      <Footer/>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 25,
    justifyContent:'space-between',
    paddingBottom:145
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
});
export default Profile;
