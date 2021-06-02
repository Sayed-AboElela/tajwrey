import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from "../../components/containers/Containers";
import Header from "../../components/header/Header";
import Footer from "../../components/containers/Footer";
import {useTranslation} from "react-i18next";
import Input from "../../components/textInputs/Input";
import {Colors, ColorWithOpacity, Fonts, Images, Pixel} from "../../constants/styleConstants";
import {commonStyles} from "../../styles/styles";
import {DropdownArrowIcon, EditIcon, EditProfileIcon} from "../../assets/icons/SvgIcons";
import Button from "../../components/touchables/Button";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import CitiesModal from "../../components/CitiesModal";
import {updateProfile} from "../../store/actions/auth";
import {InputErrorHandler} from "../../constants/helpers";

const EditProfile: FC = () => {

  const userData: any = useSelector((state: RootState) => state.auth.userData);
  const updateProfileErrors: any = useSelector((state: RootState) => state.auth.updateProfileErrors);

  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [state, setstate] = useState({
    loader: false,
    modalShow: false,
    selectedCity: {
      city_id: "",
      name: t('City')
    },
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    avatar: userData.avatar,
    image: '',
  });
  const toggleLangModal = () => {
    setstate(old => ({...old, modalShow: !old.modalShow}));
  };

  const handleSelectCity = (cityId: number, name: string) => {
    setstate(old => ({...old, selectedCity: {city_id: cityId, name: name}}));
  }

  const EditInputIcon = () => (<EditProfileIcon style={{marginEnd: 5, marginTop: 5}} width={13.45} height={14.8}
                                                fill={ColorWithOpacity(Colors.dark, 0.3)}/>)

  const picImageHandler = async () => {
    try {
      launchImageLibrary(
        {
          includeBase64: true,
          mediaType: 'photo',
          quality: 0.5,
        },
        response => {
          // console.log('responsepicImageHandler', response.assets[0].uri);
          setstate((old: any) => ({
            ...old,
            image: response.assets[0].uri,
            avatar: response.base64,
          }));
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    console.log(state, ' state');
    dispatch(
      updateProfile(
        state.name,
        state.phone,
        state.email,
        state.avatar,
        () => {
          setstate(old => ({...old, loader: false}));
        },
      ),
    );
  };

  return (
    <Container>
      <Header title={t('Edit profile')}/>

      <Content contentContainerStyle={{paddingBottom: 150}}>

        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 10}}>
          <View style={styles.editIcon}>
            <EditIcon/>
          </View>
          <TouchableOpacity
            style={styles.userImage}
            onPress={picImageHandler}>
            <FastImage
              source={
                state.image && state.image !== ""
                  ? {uri: state.image}
                  : userData.avatar
                  ? {uri: userData.avatar}
                  : Images.userImage
              }
              style={commonStyles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("Username")}</Text>
          <Input
            rightContent={EditInputIcon}
            options={{
              value: state.name,
              onChangeText: value => {
                setstate(old => ({...old, name: value}));
              },
            }}
            erorrMessage={InputErrorHandler(updateProfileErrors, 'name')}
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
            erorrMessage={InputErrorHandler(updateProfileErrors, 'phone')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("Email")}</Text>
          <Input
            rightContent={EditInputIcon}
            options={{
              value: state.email,
              onChangeText: value => {
                setstate(old => ({...old, email: value}));
              },
              keyboardType: 'email-address'
            }}
            erorrMessage={InputErrorHandler(updateProfileErrors, 'email')}
          />
        </View>
        <View style={[styles.inputContainer, {marginTop: 15}]}>
          <Text style={styles.inputLabel}>{t("City")}</Text>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={toggleLangModal}>
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
      <CitiesModal showProp={state.modalShow} toggleLangModal={toggleLangModal} handleSelectCity={handleSelectCity}
                   selectedCity={state.selectedCity}/>
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
  userImage: {
    width: Pixel(190),
    height: Pixel(190),
    position: 'relative',
    borderRadius: Pixel(100),
    overflow: 'hidden',
    marginBottom: 10,
    alignSelf: 'center',
  },
  editIcon: {
    width: Pixel(35),
    height: Pixel(35),
    backgroundColor: Colors.white,
    borderRadius: 50,
    position: 'absolute',
    right: Pixel(0),
    top: Pixel(5),
    zIndex: 150,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
});

export default EditProfile;
