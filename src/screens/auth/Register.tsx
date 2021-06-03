import React, {createRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AuthLogo, DropdownArrowIcon, EyeIcon} from "../../assets/icons/SvgIcons";
import {Container, Content} from "../../components/containers/Containers";
import Header from "../../components/header/Header";
import {useTranslation} from "react-i18next";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../../constants/styleConstants";
import Input from "../../components/textInputs/Input";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {InputErrorHandler} from '../../constants/helpers';
import IconTouchableContainer from "../../components/touchables/IconTouchableContainer";
import Button from "../../components/touchables/Button";
import {commonStyles} from "../../styles/styles";
import Touchable from "../../components/touchables/Touchable";
import CitiesModal from "../../components/CitiesModal";
import {RegisterHandler} from "../../store/actions/auth";

const Register = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const {registerErrors} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const passwordConfirmRef = createRef();

  const [state, setstate] = useState({
    modalShow: false,
    securePassword: true,
    securePasswordConfirm: true,
    loader: false,
    name: '',
    phone: '',
    email: '',
    selectedCity: {
      city_id: "",
      name: t('City')
    },
    password: '',
    password_confirmation: '',
  });

  const toggleLangModal = () => {
    setstate(old => ({...old, modalShow: !old.modalShow}));
  };

  const handleSelectCity = (cityId: number, name: string) => {
    setstate(old => ({...old, selectedCity: {city_id: cityId, name: name}}));
  }

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
    dispatch(
      RegisterHandler(
        state.name,
        state.email,
        state.password,
        state.password_confirmation,
        state.phone,
        state.selectedCity.city_id,
        success => {
          setstate(old => ({...old, loader: false}));
          success ? console.log('register success') : console.log('register failed ');
          success && navigate('PhoneCode', {phone: state.phone, navigateTo: 'Success'});
        }),
    );
  };

  console.log('registerErrors', registerErrors)

  return (
    <Container>
      <Header title={t('Register')}/>
      <Content style={styles.contentContainer} contentContainerStyle={{
        paddingTop: Pixel(30),
        paddingBottom: Pixel(100)
      }}>
        <View style={styles.headerContainer}>
          <AuthLogo/>
        </View>
        <View style={styles.inputsContainer}>
          <Input
            options={{
              value: state.name,
              onChangeText: value => {
                setstate(old => ({...old, name: value}));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Username'),
            }}
            erorrMessage={InputErrorHandler(registerErrors, 'name')}
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
            erorrMessage={InputErrorHandler(registerErrors, 'phone')}
          />
          <Input
            options={{
              value: state.email,
              onChangeText: value => {
                setstate(old => ({...old, email: value}));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Email "optional"'),
              keyboardType: 'email-address',
            }}
            erorrMessage={InputErrorHandler(registerErrors, 'email')}
          />
          {/*<View style={[styles.inputContainer, {marginTop: 15}]}>*/}
          <TouchableOpacity
            style={[styles.dropDown, !!InputErrorHandler(registerErrors, 'city_id') && {borderColor: Colors.warning},]}
            onPress={toggleLangModal}>
            <Text style={styles.dropDownValue}>{state.selectedCity.name}</Text>
            <DropdownArrowIcon style={commonStyles.rtlRotate}/>
          </TouchableOpacity>
          {!!InputErrorHandler(registerErrors, 'city_id') && (
            <View style={{marginBottom: 7}}>
              <Text
                style={[
                  styles.errorMessage,
                  {color: !!InputErrorHandler(registerErrors, 'city_id') ? Colors.warning : 'transparent'},
                ]}>
                {InputErrorHandler(registerErrors, 'city_id')}
              </Text>
            </View>
          )}
          {/*</View>*/}
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
              value: state.password_confirmation,
              onChangeText: value => {
                setstate(old => ({...old, password_confirmation: value}));
              },
              secureTextEntry: state.securePasswordConfirm,
              onSubmitEditing: submitHandler,
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Password confirmation')
            }}
            erorrMessage={InputErrorHandler(registerErrors, 'password')}
          />
        </View>
        <Button
          style={{marginTop: Pixel(30)}}
          title={t('Register')}
          onPress={submitHandler}
          loader={state.loader}
        />
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>{t('Your registration with us means your consent to')}</Text>
          <Touchable onPress={() => navigate('Terms')}>
            <Text style={styles.termsBtnText}>{t('Terms and Conditions')}</Text>
          </Touchable>
        </View>
      </Content>
      <CitiesModal showProp={state.modalShow} toggleLangModal={toggleLangModal} handleSelectCity={handleSelectCity}
                   selectedCity={state.selectedCity}/>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    // ...commonStyles.contentPaddingHorizontal,
    flex: 1,
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
  },
  dropDown: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: Pixel(100),
    padding: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.CommonBorderColor,
    paddingHorizontal: 20,
    marginVertical: Pixel(14),
    height: Pixel(110)
  },
  dropDownValue: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(28),
    color: ColorWithOpacity(Colors.gray, 0.5),
  },
  errorMessage: {
    textAlign: 'center',
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
});

export default Register;
