import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container} from "../../components/containers/Containers";
import Header from "../../components/header/Header";
import {useTranslation} from "react-i18next";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../../constants/styleConstants";
import Input from "../../components/textInputs/Input";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux';
import {ForgetHandler} from '../../store/actions/auth';
import Button from "../../components/touchables/Button";
import {commonStyles} from "../../styles/styles";
import {InputErrorHandler} from "../../constants/helpers";
import {RootState} from "../../store/store";

const Forget = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const forgetPasswordErrors = useSelector((state: RootState) => state.auth.forgetPasswordErrors);

  const dispatch = useDispatch();
  const [state, setstate] = useState({
    loader: false,
    phone: '',
  });


  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    dispatch(
      ForgetHandler(state.phone, success => {
        setstate(old => ({...old, loader: false}));
        success && navigate('PhoneCode', {phone: state.phone, navigateTo: 'NewPassword'});
      }),
    );
  };
  return (
    <Container>
      <Header title={t('Forgot Password?')}/>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text
            style={styles.headerTitle}>{t('Enter your mobile number and a text message will be sent to activate and reset the password')}</Text>
        </View>
        <View style={styles.inputsContainer}>
          <Input
            options={{
              value: state.phone,
              onChangeText: value => {
                setstate(old => ({...old, phone: value}));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Phone'),
              keyboardType: 'phone-pad',
              onSubmitEditing: submitHandler,
            }}
            erorrMessage={InputErrorHandler(forgetPasswordErrors, 'phone')}
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
  contentContainer: {
    ...commonStyles.contentPaddingHorizontal,
    paddingTop: Pixel(30),
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Pixel(75),
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    color: Colors.mainColor,
    fontSize: Pixel(35),
    marginTop: Pixel(25),
    textAlign: 'center',
  },
  inputsContainer: {
    marginTop: Pixel(50),
  },
  submitContainer: {
    marginVertical: Pixel(40),
  },
});

export default Forget;
