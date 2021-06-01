import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from "../../components/containers/Containers";
import Header from "../../components/header/Header";
import Footer from "../../components/containers/Footer";
import {useTranslation} from "react-i18next";
import Input from "../../components/textInputs/Input";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../../constants/styleConstants";
import {commonStyles} from "../../styles/styles";
import {DropdownArrowIcon, EditProfileIcon} from "../../assets/icons/SvgIcons";
import Button from "../../components/touchables/Button";
import {LoginHandler} from "../../store/actions/auth";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";

const EditProfile: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const {dispatch} = useDispatch();
  const [state, setstate] = useState({
    loader: false,
    phone: '',
  });
  const EditInputIcon = () => (<EditProfileIcon style={{marginEnd: 5, marginTop: 5}} width={13.45} height={14.8}
                                                fill={ColorWithOpacity(Colors.dark, 0.3)}/>)
  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    console.log(state, ' state');
    // dispatch(
    //   LoginHandler(state.phone, state.phone, success => {
    //     setstate(old => ({...old, loader: false}));
    //     success && navigate('Home');
    //   }, () => navigate("PhoneCode")),
    // );
  };

  return (
    <Container>
      <Header title={t('Edit profile')}/>
      <Content contentContainerStyle={{paddingBottom: 150}}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("Username")}</Text>
          <Input
            rightContent={EditInputIcon}
            options={{
              value: state.phone,
              onChangeText: value => {
                setstate(old => ({...old, phone: value}));
              },
            }}
            // erorrMessage={InputErrorHandler(loginErrors, 'phone')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("Phone")}</Text>
          <Input
            rightContent={EditInputIcon}
            options={{
              value: state.phone,
              onChangeText: value => {
                setstate(old => ({...old, phone: value}));
              },
              keyboardType: 'phone-pad'
            }}
            // erorrMessage={InputErrorHandler(loginErrors, 'phone')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("Email")}</Text>
          <Input
            rightContent={EditInputIcon}
            options={{
              value: state.phone,
              onChangeText: value => {
                setstate(old => ({...old, phone: value}));
              },
              keyboardType: 'email-address'
            }}
            // erorrMessage={InputErrorHandler(loginErrors, 'phone')}
          />
        </View>
        <View style={[styles.inputContainer, {marginTop: 15}]}>
          <Text style={styles.inputLabel}>{t("City")}</Text>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => {
              console.log('City')
            }}>
            <Text style={styles.dropDownValue}>{t('Riyadh')}</Text>
            <DropdownArrowIcon style={commonStyles.rtlRotate}/>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => navigate('ChangePassword')}>
            <Text style={[styles.inputLabel, {color: '#E53838', marginTop: 5}]}>{t("Password change")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitContainer}>
          <Button
            title={t('Save')}
            onPress={submitHandler}
            loader={state.loader}
          />
        </View>
      </Content>
      <Footer/>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: '#f1f1f1',
  },
  inputContainer: {
    // marginVertical: 5,
    marginTop: 7,
  },
  inputLabel: {
    color: Colors.mainColor,
    fontFamily: Fonts.medium,
    // marginBottom: Pixel(17),
    alignSelf: 'flex-start',
    marginStart: Pixel(35),
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
  termsText: {
    fontFamily: Fonts.medium,
    fontSize: Pixel(29),
    color: ColorWithOpacity(Colors.gray, 0.4),
    textAlign: 'center',
  },
  termsBtnText: {
    fontFamily: Fonts.medium,
    fontSize: Pixel(28),
    color: Colors.mainColor
  },
  submitContainer: {
    marginVertical: Pixel(80),
  },
});

export default EditProfile;
