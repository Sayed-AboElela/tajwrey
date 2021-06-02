import React, {createRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {EyeIcon} from "../../assets/icons/SvgIcons";
import {Container} from "../../components/containers/Containers";
import Header from "../../components/header/Header";
import {useTranslation} from "react-i18next";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../../constants/styleConstants";
import Input from "../../components/textInputs/Input";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {InputErrorHandler} from '../../constants/helpers';
import {ChangePasswordHandler} from '../../store/actions/auth';
import IconTouchableContainer from "../../components/touchables/IconTouchableContainer";
import Button from "../../components/touchables/Button";
import {commonStyles} from "../../styles/styles";

const ChangePassword = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const {changePasswordErrors} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const passwordConfirmRef = createRef();

  const [state, setstate] = useState({
    secureOldPassword: true,
    securePassword: true,
    securePasswordConfirm: true,
    loader: false,
    old_password: '',
    password: '',
    password_confirmation: '',
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
    dispatch(
      ChangePasswordHandler(state.old_password, state.password, state.password_confirmation, success => {
        setstate(old => ({...old, loader: false}));
        success && navigate('Profile');
      }),
    );
  };
  // console.log('changePasswordErrors', changePasswordErrors)
  return (
    <Container>
      <Header title={t("Password change")}/>
      <View style={styles.contentContainer}>
        <View style={styles.inputsContainer}>

          <Input
            rightContent={OldPasswordIcon}
            options={{
              value: state.old_password,
              onChangeText: value => {
                setstate(old => ({...old, old_password: value}));
              },
              secureTextEntry: state.secureOldPassword,
              onSubmitEditing: submitHandler,
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Old password')
            }}
            erorrMessage={InputErrorHandler(changePasswordErrors, 'old_password')}
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
            erorrMessage={InputErrorHandler(changePasswordErrors, 'password')}
          />
          <Input
            rightContent={PasswordConfirmIcon}
            options={{
              ref: () => passwordConfirmRef,
              value: state.password_confirmation,
              onChangeText: value => {
                setstate(old => ({...old, password_confirmation: value}));
              },
              secureTextEntry: state.securePasswordConfirm,
              onSubmitEditing: submitHandler,
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('New password confirmation')
            }}
            erorrMessage={InputErrorHandler(changePasswordErrors, 'password')}
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
