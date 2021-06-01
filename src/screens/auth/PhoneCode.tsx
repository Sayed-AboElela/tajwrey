import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container} from '../../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/touchables/Button';
import CodeInput from '../../components/textInputs/CodeInput';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import Header from "../../components/header/Header";
import {commonStyles} from "../../styles/styles";
// import {ResendPhoneCodeHandler, VerifyPhoneCodeHandler} from '../../store/actions/auth';

const PhoneCode: FC = () => {
  const [state, setstate] = useState({
    loader: false,
    code: '',
    minutes: 1,
    seconds: 0
  });

  const dispatch = useDispatch();
  const {userData}: any = useSelector(
    (state: RootState) => state.auth,
    shallowEqual,
  );
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    navigate('NewPassword')
    // dispatch(
    //   VerifyPhoneCodeHandler(state.code, success => {
    //     setstate(old => ({...old, loader: false}));
    //     success && navigate('RegisterLocation');
    //   }),
    // );
  };

  useEffect(() => {
    const titTok = setInterval(() => {
      if (state.seconds > 0) {
        setstate(old => ({...old, seconds: state.seconds - 1}));
      }
      if (state.seconds === 0) {
        if (state.minutes === 0) {
          clearInterval(titTok)
        } else {
          setstate(old => ({
            ...old,
            minutes: state.minutes - 1,
            seconds: 59
          }));
        }
      }
    }, 1000);
    return () => {
      clearInterval(titTok)
    };
  });
  const resedCode = () => {
    // dispatch(ResendPhoneCodeHandler((success) => {
    //   if (success) {
    //     setstate(old => ({
    //       ...old,
    //       minutes: 1,
    //       seconds: 0
    //     }));
    //     const timer = setInterval(() => {
    //       if (state.seconds > 0) {
    //         setstate(old => ({...old, seconds: state.seconds - 1}));
    //       }
    //       if (state.seconds === 0) {
    //         if (state.minutes === 0) {
    //           clearInterval(timer)
    //         } else {
    //           setstate(old => ({
    //             ...old,
    //             minutes: state.minutes - 1,
    //             seconds: 59
    //           }));
    //         }
    //       }
    //     }, 1000);
    //   }
    // }))
  }
  return (
    <Container>
      <Header title={t('Forgot Password?')}/>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text
            style={styles.headerTitle}>{t('Enter the activation code')}</Text>
        </View>

        <View style={styles.inputsContainer}>
          {/*<View style={styles.inputContainer}>*/}
          <CodeInput
            onChangeText={text => {
              setstate(old => ({...old, code: text}));
            }}
            arrayWidth={6}
          />
          {/*</View>*/}

        </View>
        <View style={styles.codeTimerContainer}>
          <Text
            style={styles.codeTimerText}>{state.minutes}:{state.seconds < 10 ? `0${state.seconds}` : state.seconds} {t("Remaining")}</Text>
        </View>
        <View style={[styles.codeTimerContainer, {flexDirection: "row", alignItems: 'center', marginTop: 15}]}>
          <Text
            style={styles.resendText}>{t("Don't Receive The OPT ?")}</Text>
          <TouchableOpacity onPress={resedCode}>
            <Text style={styles.resendBtnText}> {t("RESEND OPT")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitContainer}>
          <Button
            title={t('Verify And Proceed')}
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
    marginBottom:Pixel(10),
  },
  submitContainer: {
    marginVertical: Pixel(50),
  },
  codeTimerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
  codeTimerText: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(30),
    color:"#9E9E9E"
  },
  resendText: {
    color: "#9E9E9E",
    fontFamily: Fonts.medium,
  },
  resendBtnText: {
    fontFamily: Fonts.medium,
    textTransform: 'uppercase',
    color: Colors.mainColor
  }
});

export default PhoneCode;
