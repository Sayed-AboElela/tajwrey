import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AuthLogo, EyeIcon, LockIcon, TelephoneIcon} from "../../assets/icons/SvgIcons";
import {Container} from "../../components/containers/Containers";
import Header from "../../components/header/Header";
import {useTranslation} from "react-i18next";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../../constants/styleConstants";
import Input from "../../components/textInputs/Input";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {InputErrorHandler} from '../../constants/helpers';
import {LoginHandler} from '../../store/actions/auth';
import IconTouchableContainer from "../../components/touchables/IconTouchableContainer";
import Button from "../../components/touchables/Button";
import {commonStyles} from "../../styles/styles";

const Login = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const {loginErrors} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [state, setstate] = useState({
    secureTextEntry: true,
    loader: false,
    phone: '',
    password: '',
  });
  const PasswordIcon = () => {
    return (
      <IconTouchableContainer
        onPress={() => {
          setstate(old => ({...old, secureTextEntry: !old.secureTextEntry}));
        }}>
        <EyeIcon/>
      </IconTouchableContainer>
    );
  };

  const LockInputIcon = () => (<LockIcon/>)
  const PhoneIcon = () => (<TelephoneIcon/>)


  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    console.log(state, ' state');
    dispatch(
      LoginHandler(state.phone, state.password, success => {
        setstate(old => ({...old, loader: false}));
        success && navigate('Home');
      }, (screen, params) => navigate(screen, params)),
    );
  };

  return (
    <Container>
      <Header/>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <AuthLogo/>
          <Text style={styles.headerTitle}>{t('Login')}</Text>
        </View>
        <View style={styles.inputsContainer}>

          <Input
            leftContent={PhoneIcon}
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
            rightContent={PasswordIcon}
            leftContent={LockInputIcon}
            options={{
              value: state.password,
              onChangeText: value => {
                setstate(old => ({...old, password: value}));
              },
              secureTextEntry: state.secureTextEntry,
              onSubmitEditing: submitHandler,
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Password')
            }}
            erorrMessage={InputErrorHandler(loginErrors, 'password')}
          />
        </View>
        <TouchableOpacity
          style={{flexDirection: 'row-reverse', marginLeft: 3, marginTop: 5}}
          onPress={() => navigate('Forget')}>
          <Text
            style={styles.forgetBtnText}>
            {t('Forgot Password?')}
          </Text>
        </TouchableOpacity>

        <View style={styles.submitContainer}>
          <Button
            title={t('Login')}
            onPress={submitHandler}
            loader={state.loader}
          />

          <Button
            style={{backgroundColor: Colors.secondColor, marginTop: 15}}
            title={t('Register')}
            onPress={() => navigate('Register')}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    ...commonStyles.contentPaddingHorizontal,
    paddingTop: Pixel(30),
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    color: Colors.mainColor,
    fontSize: Pixel(35),
    marginTop: Pixel(25),
  },
  inputsContainer: {
    marginTop: Pixel(20),
  },
  submitContainer: {
    marginVertical: Pixel(80),
  },
  forgetBtnText: {
    color: Colors.mainColor,
    fontFamily: Fonts.medium,
    fontSize: Pixel(27),
  }
});

export default Login;
