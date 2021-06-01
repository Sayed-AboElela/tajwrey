import React, {FC, useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container} from "../components/containers/Containers";
import Header from "../components/header/Header";
import {useTranslation} from "react-i18next";
import {commonStyles} from "../styles/styles";
import {FacebookIcon, InstagramIcon, SnapchatIcon, TwitterIcon} from "../assets/icons/SvgIcons";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../constants/styleConstants";
import Input from "../components/textInputs/Input";
import {InputErrorHandler} from "../constants/helpers";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import Button from "../components/touchables/Button";
import {LoginHandler} from "../store/actions/auth";

const {width, height} = Dimensions.get('window');
const ContactUs: FC = () => {
  const {t} = useTranslation();
  const {loginErrors} = useSelector((state: RootState) => state.auth);
  const [state, setstate] = useState({
    loader: false,
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    console.log(state, ' state');
    // dispatch(
    //   LoginHandler(state.phone, state.password, success => {
    //     setstate(old => ({...old, loader: false}));
    //     success && navigate('Home');
    //   }, () => navigate("PhoneCode")),
    // );
  };
  return (
    <Container>
      <Header title={t('Contact us')}/>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{t('Follow us on social media')}</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialItem}>
            <SnapchatIcon/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialItem}>
            <InstagramIcon/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialItem}>
            <TwitterIcon/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialItem}>
            <FacebookIcon/>
          </TouchableOpacity>
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.sectionTitle}>{t('Send us your inquiry')}</Text>

          <Input
            options={{
              value: state.fullName,
              onChangeText: value => {
                setstate(old => ({...old, fullName: value}));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Full name'),
            }}
            erorrMessage={InputErrorHandler(loginErrors, 'fullName')}
          />

          <Input
            options={{
              value: state.phone,
              onChangeText: value => {
                setstate(old => ({...old, phone: value}));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Phone'),
              keyboardType: 'phone-pad',
            }}
            erorrMessage={InputErrorHandler(loginErrors, 'phone')}
          />

          <Input
            options={{
              value: state.email,
              onChangeText: value => {
                setstate(old => ({...old, email: value}));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Email'),
              keyboardType: 'email-address',
            }}
            erorrMessage={InputErrorHandler(loginErrors, 'email')}
          />
          <Input
            contentContainerStyle={{borderRadius: Pixel(45)}}
            textInputContainer={{textAlignVertical: "top", height: Pixel(190),}}
            options={{
              value: state.message,
              onChangeText: value => {
                setstate(old => ({...old, message: value}));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Message'),
              multiline: true,
            }}
            erorrMessage={InputErrorHandler(loginErrors, 'message')}
          />
        </View>
        <View style={styles.submitContainer}>
          <Button
            title={t('Send')}
            onPress={submitHandler}
            loader={state.loader}
          />
        </View>

      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 25,
    marginTop:Pixel(60)
  },
  socialContainer: {
    ...commonStyles.rowBox,
    justifyContent:'center',
  },
  socialItem:{
    marginHorizontal:Pixel(10)
  },
  sectionTitle:{
    fontFamily:Fonts.bold,
    fontSize:Pixel(32),
    color:Colors.mainColor,
    textAlign:'center',
    marginBottom:Pixel(30)
  },
  inputsContainer:{
    marginTop:Pixel(80)
  },
  submitContainer: {
    marginVertical: Pixel(80),
  },
});
export default ContactUs;
