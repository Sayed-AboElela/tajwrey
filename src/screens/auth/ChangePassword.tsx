import React, {createRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthLogo, EyeIcon} from "../../assets/icons/SvgIcons";
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
import Touchable from "../../components/touchables/Touchable";

const ChangePassword = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const {registerErrors} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const passwordConfirmRef = createRef();
  const [state, setstate] = useState({
    secureOldPassword: true,
    securePassword: true,
    securePasswordConfirm: true,
    loader: false,
    oldPassword: '',
    password: '',
    passwordConfirm: '',
  });
  const OldPasswordIcon = () => {
    return (
      <IconTouchableContainer
        onPress={() => {
          setstate(old => ({...old, secureOldPassword: !old.secureOldPassword}));
        }}>
        <EyeIcon/>
      </IconTouchableContainer>
    );
  };
  const PasswordIcon = () => {
    return (
      <IconTouchableContainer
        onPress={() => {
          setstate(old => ({...old, securePassword: !old.securePassword}));
        }}>
        <EyeIcon/>
      </IconTouchableContainer>
    );
  };
  const PasswordConfirmIcon = () => {
    return (
      <IconTouchableContainer
        onPress={() => {
          setstate(old => ({...old, securePasswordConfirm: !old.securePasswordConfirm}));
        }}>
        <EyeIcon/>
      </IconTouchableContainer>
    );
  };

  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    console.log(state, ' state');
    // navigate('Success')
    // dispatch(
    //   LoginHandler(state.phone, state.password, success => {
    //     setstate(old => ({...old, loader: false}));
    //     success && navigate('Home');
    //   }, () => navigate("PhoneCode")),
    // );
  };
  console.log('registerErrors', registerErrors)
  return (
    <Container>
      <Header title={'Register'}/>
      <View style={styles.contentContainer}>
        <View style={styles.inputsContainer}>

          <Input
            rightContent={OldPasswordIcon}
            options={{
              value: state.oldPassword,
              onChangeText: value => {
                setstate(old => ({...old, oldPassword: value}));
              },
              secureTextEntry: state.secureOldPassword,
              onSubmitEditing: submitHandler,
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Old password')
            }}
            erorrMessage={InputErrorHandler(registerErrors, 'password')}
          />
          <Input
            rightContent={PasswordIcon}
            options={{
              value: state.password,
              onChangeText: value => {
                setstate(old => ({...old, password: value}));
              },
              secureTextEntry: state.securePassword,
              onSubmitEditing: submitHandler,
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Password')
            }}
            erorrMessage={InputErrorHandler(registerErrors, 'password')}
          />
          <Input
            rightContent={PasswordConfirmIcon}
            options={{
              ref: () => passwordConfirmRef,
              value: state.passwordConfirm,
              onChangeText: value => {
                setstate(old => ({...old, passwordConfirm: value}));
              },
              secureTextEntry: state.securePasswordConfirm,
              onSubmitEditing: submitHandler,
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('New password confirmation')
            }}
            erorrMessage={InputErrorHandler(registerErrors, 'passwordConfirm')}
          />
        </View>
        <Button
          style={{marginTop: Pixel(30)}}
          title={t('Send')}
          onPress={submitHandler}
          loader={state.loader}
        />

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
    marginVertical: Pixel(30),
  },
  forgetBtnText: {
    color: Colors.mainColor,
    fontFamily: Fonts.medium,
    fontSize: Pixel(27),
  },
  termsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: Pixel(50),
  },
  termsText: {
    color: ColorWithOpacity(Colors.gray, 0.4),
    textAlign: 'center',
    fontFamily: Fonts.medium,
    fontSize: Pixel(27)
  },
  termsBtnText: {
    color: Colors.mainColor,
    textAlign: 'center',
    fontFamily: Fonts.medium
  }
});

export default ChangePassword;
