import React, {FC, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from "../components/containers/Containers";
import Header from "../components/header/Header";
import Footer from "../components/containers/Footer";
import {useTranslation} from "react-i18next";
import Input from "../components/textInputs/Input";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../constants/styleConstants";
import CheckBox from "../components/CheckBox";
import {DropdownArrowIcon} from "../assets/icons/SvgIcons";
import {commonStyles} from "../styles/styles";

const Buy: FC = () => {
  const {t} = useTranslation();
  const [state, setstate] = useState({
    loader: false,
    phone: '',
    commissionSourceId: 0,
    type: 0,
  });

  const commission_source = [
    {
      id: 1,
      title: t('The first party requesting the request'),
    },
    {
      id: 2,
      title: t('Second Party'),
    },
    {
      id: 3,
      title: t('The two parties together'),
    }
  ]


  const commissionSourceOptions = useMemo(() => commission_source.map((item, index) => (
    <CheckBox
      {...item}
      onPress={() => setstate((old) => ({...old, commissionSourceId: item.id}))}
      selected={state.commissionSourceId === item.id}
      key={index}
    />
  )), [state.commissionSourceId]);

  return (
    <Container>
      <Header noBack title={t('Purchase order')}/>
      <Content contentContainerStyle={{paddingBottom: 150}}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("The seller's name")}</Text>
          <Input
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
          <Text style={styles.inputLabel}>{t("The seller's mobile number")}</Text>
          <Input
            options={{
              value: state.phone,
              onChangeText: value => {
                setstate(old => ({...old, phone: value}));
              },
              keyboardType: 'phone-pad',
            }}
            // erorrMessage={InputErrorHandler(loginErrors, 'phone')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("Description of the purchase process")}</Text>
          <Input
            contentContainerStyle={{borderRadius: Pixel(45)}}
            textInputContainer={{textAlignVertical: "top", height: Pixel(190),}}
            options={{
              value: state.phone,
              onChangeText: value => {
                setstate(old => ({...old, phone: value}));
              },
              multiline: true,
            }}
            // erorrMessage={InputErrorHandler(loginErrors, 'phone')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text
            style={styles.inputLabel}>{t("Application percentage of 5% of total purchase, select Parties to whom the percentage will be deducted")}</Text>
          {commissionSourceOptions}
        </View>

        <View style={[styles.inputContainer, {marginTop: 15}]}>
          <Text style={styles.inputLabel}>{t("Order type")}</Text>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => {
              console.log('asd')
            }}>
            <Text style={styles.dropDownValue}>{t('Purchase')}</Text>
            <DropdownArrowIcon style={commonStyles.rtlRotate}/>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("The cost of the order")}</Text>
          <Input
            options={{
              value: state.phone,
              onChangeText: value => {
                setstate(old => ({...old, phone: value}));
              },
            }}
            // erorrMessage={InputErrorHandler(loginErrors, 'phone')}
          />
        </View>
        <View style={[styles.inputContainer, {justifyContent: 'center', alignItems: 'center'}]}>
          <Text style={styles.termsText}>{t('Your confirmation of the order means your approval')}</Text>
          <TouchableOpacity>
            <Text style={styles.termsBtnText}>{t('Terms and Conditions')}</Text>
          </TouchableOpacity>
        </View>


      </Content>


      <Footer/>

    </Container>
  );
};

export default Buy;

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

});
