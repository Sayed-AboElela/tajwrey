import React, {FC, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from "../components/containers/Containers";
import Header from "../components/header/Header";
import {useTranslation} from "react-i18next";
import {commonStyles} from "../styles/styles";
import {SnapchatIcon} from "../assets/icons/SvgIcons";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../constants/styleConstants";
import Input from "../components/textInputs/Input";
import {InputErrorHandler, OpenUrlHandler} from "../constants/helpers";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import Button from "../components/touchables/Button";
import {sendContactApi} from "../store/actions/settings";
import {useNavigation} from "@react-navigation/native";

const {width, height} = Dimensions.get('window');
const ContactUs: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.settings.contacts);
  const contactsUsErrors = useSelector((state: RootState) => state.settings.contactsUsErrors);

  const [state, setstate] = useState({
    loader: false,
    full_name: '',
    mobile_number: '',
    email: '',
    body: '',
  });


  const contactsMemo = useMemo(() => (
    contacts.map((item, index) => {
      return (
        <TouchableOpacity key={index} style={styles.socialItem} onPress={() => OpenUrlHandler(item.link)}>
          <SnapchatIcon/>
        </TouchableOpacity>
      )
    })
  ), [contacts]);

  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    dispatch(
      sendContactApi(state.full_name, state.mobile_number, state.email, state.body, success => {
        setstate(old => ({...old, loader: false}));
        success && navigate('Home');
      }),
    );
  };


  return (
    <Container>
      <Header title={t('Contact us')}/>
      <Content style={styles.container} contentContainerStyle={{marginTop: Pixel(60), paddingBottom: Pixel(120)}}>
        <Text style={styles.sectionTitle}>{t('Follow us on social media')}</Text>
        <View style={styles.socialContainer}>
          {/*<TouchableOpacity style={styles.socialItem}>*/}
          {/*  <SnapchatIcon/>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity style={styles.socialItem}>*/}
          {/*  <InstagramIcon/>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity style={styles.socialItem}>*/}
          {/*  <TwitterIcon/>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity style={styles.socialItem}>*/}
          {/*  <FacebookIcon/>*/}
          {/*</TouchableOpacity>*/}
          {contactsMemo}
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.sectionTitle}>{t('Send us your inquiry')}</Text>

          <Input
            options={{
              value: state.full_name,
              onChangeText: value => {
                setstate(old => ({...old, full_name: value}));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Full name'),
            }}
            erorrMessage={InputErrorHandler(contactsUsErrors, 'full_name')}
          />

          <Input
            options={{
              value: state.mobile_number,
              onChangeText: value => {
                setstate(old => ({...old, mobile_number: value}));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Phone'),
              keyboardType: 'phone-pad',
            }}
            erorrMessage={InputErrorHandler(contactsUsErrors, 'mobile_number')}
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
            erorrMessage={InputErrorHandler(contactsUsErrors, 'email')}
          />
          <Input
            contentContainerStyle={{borderRadius: Pixel(45)}}
            textInputContainer={{textAlignVertical: "top", height: Pixel(190),}}
            options={{
              value: state.body,
              onChangeText: value => {
                setstate(old => ({...old, body: value}));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Message'),
              multiline: true,
            }}
            erorrMessage={InputErrorHandler(contactsUsErrors, 'body')}
          />
        </View>
        <View style={styles.submitContainer}>
          <Button
            title={t('Send')}
            onPress={submitHandler}
            loader={state.loader}
          />
        </View>

      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  socialContainer: {
    ...commonStyles.rowBox,
    justifyContent: 'center',
  },
  socialItem: {
    marginHorizontal: Pixel(10)
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(32),
    color: Colors.mainColor,
    textAlign: 'center',
    marginBottom: Pixel(30)
  },
  inputsContainer: {
    marginTop: Pixel(80)
  },
  submitContainer: {
    marginVertical: Pixel(80),
  },
});
export default ContactUs;
