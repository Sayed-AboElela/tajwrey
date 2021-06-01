import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SuccessIcon} from "../../assets/icons/SvgIcons";
import {Container} from "../../components/containers/Containers";
import Header from "../../components/header/Header";
import {useTranslation} from "react-i18next";
import {Colors, Fonts, Pixel} from "../../constants/styleConstants";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import Button from "../../components/touchables/Button";
import {commonStyles} from "../../styles/styles";

const Success = () => {
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

  console.log('loginErrors', loginErrors)
  return (
    <Container>
      <Header title={t('Register')}/>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <SuccessIcon/>
        </View>
        <Text style={styles.mainTitle}>
          {t('Your account has been successfully registered')}
        </Text>
        <Text
          style={styles.secondTitle}>{t('You can now log in to your account and start using Tajwrey services')}</Text>

        <View style={styles.submitContainer}>
          <Button
            title={t('Login')}
            // onPress={submitHandler}
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
    marginTop: Pixel(80),
    marginBottom: Pixel(50),

  },
  mainTitle: {
    fontFamily: Fonts.bold,
    color: Colors.mainColor,
    fontSize: Pixel(37),
    marginTop: Pixel(30),
    textAlign: "center"
  },
  secondTitle: {
    fontFamily: Fonts.regular,
    color: Colors.mainColor,
    fontSize: Pixel(34),
    marginTop: Pixel(20),
    textAlign: "center"
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

export default Success;
