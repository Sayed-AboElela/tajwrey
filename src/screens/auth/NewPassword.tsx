import React, {createRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {EyeIcon} from "../../assets/icons/SvgIcons";
import {Container} from "../../components/containers/Containers";
import Header from "../../components/header/Header";
import {useTranslation} from "react-i18next";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../../constants/styleConstants";
import Input from "../../components/textInputs/Input";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {InputErrorHandler} from '../../constants/helpers';
import {NewPasswordHandler} from '../../store/actions/auth';
import IconTouchableContainer from "../../components/touchables/IconTouchableContainer";
import Button from "../../components/touchables/Button";
import {commonStyles} from "../../styles/styles";

const NewPassword = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const {changePasswordErrors} = useSelector((state: RootState) => state.auth);
  const route = useRoute();
  const dispatch = useDispatch();

  const passwordConfirmRef = createRef();
  const [state, setstate] = useState({
    securePassword: true,
    securePasswordConfirm: true,
    loader: false,
    password: '',
    password_confirmation: '',
  });
  console.log('route.params', route.params?.phone)
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
    dispatch(
      NewPasswordHandler(route.params?.phone, state.password, state.password_confirmation, success => {
        setstate(old => ({...old, loader: false}));
        success && navigate('Login');
      }));
  };
  return (
    <Container>
      <Header title={t('Password Reset')}/>
      <View style={styles.contentContainer}>
        <View style={styles.inputsContainer}>
          <Input
            rightContent={PasswordIcon}
            options={{
              value: state.password,
              onChangeText: value => {
                setstate(old => ({...old, password: value}));
              },
              secureTextEntry: state.securePassword,
              onSubmitEditing: () => {
                passwordConfirmRef.current?.focus();
              },
              returnKeyType: "next",
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('New password')
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
        <View style={styles.submitContainer}>
          <Button
            title={t('Reset')}
            onPress={submitHandler}
            loader={state.loader}
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
    marginVertical: Pixel(45),
  },
  forgetBtnText: {
    color: Colors.mainColor,
    fontFamily: Fonts.medium,
    fontSize: Pixel(27),
  }
});

export default NewPassword;
