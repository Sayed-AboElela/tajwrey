import React, {FC} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from "react-i18next";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../constants/styleConstants";
import {commonStyles} from "../styles/styles";
import {EditProfileIcon, TrashIcon} from "../assets/icons/SvgIcons";
import IconTouchableContainer from "./touchables/IconTouchableContainer";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {deleteBankHandler} from "../store/actions/banks";
// import Icon from "react-native-vector-icons/FontAwesome5";
/*************************************************************/
interface IBankAccount {
  id: string;
  name: string;
  owner_name: string;
  account_number: string;
  iban: string;
}

const BankAccount: FC<IBankAccount> = ({id, name, owner_name, account_number, iban}) => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const screenWidth = Dimensions.get('window');

  const deleteHandler = () => {
    Alert.alert(
      t("Do you want to delete the bank account?"),
      "",
      [
        {
          text: t("Cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: t("OK"), onPress: () => {
            dispatch(deleteBankHandler(
              id,
              (success) => {
                success && console.log('success')
              }
            ))
          }
        }
      ]
    )
  }

  return (
    <View style={{
      flexDirection: "row",
      backgroundColor: '#fff',
      width: screenWidth.width - 30,
      // overflow: 'hidden',
      borderRadius: 15,
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginVertical: 7,
      alignSelf: 'center',
      ...commonStyles.boxShadow,
      // borderWidth:1
    }}>

      <View style={{
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginStart: 5
      }}>
        <View style={{
          flex: 1,
          // alignItems: 'center',
          // justifyContent: 'center',
          // backgroundColor:'#f1f1f1'
        }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'stretch',
            paddingVertical: 3,
            // paddingHorizontal: 10,
          }}>
            <View style={{flex: 0.9, alignSelf: 'flex-start'}}>
              <Text style={styles.propertyText}>{t('Bank name')}</Text>
            </View>
            <View style={{flex: 1, alignSelf: 'flex-start'}}>
              <Text style={styles.propertyValue}>{name}</Text>
            </View>
          </View>

          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'stretch',
            paddingVertical: 3,
            // paddingHorizontal: 10,
          }}>
            <View style={{flex: 0.9, alignSelf: 'flex-start'}}>
              <Text style={styles.propertyText}>{t('Account owner')}</Text>
            </View>
            <View style={{flex: 1, alignSelf: 'flex-start'}}>
              <Text style={[styles.propertyValue]}>{owner_name}</Text>
            </View>
          </View>

          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'stretch',
            paddingVertical: 3,
            // paddingHorizontal: 10,
          }}>
            <View style={{flex: 0.9, alignSelf: 'flex-start'}}>
              <Text style={styles.propertyText}>{t('Account number')}</Text>
            </View>
            <View style={{flex: 1, alignSelf: 'flex-start'}}>
              <Text style={[styles.propertyValue, {textAlign: 'left'}]}>{account_number}</Text>
            </View>
          </View>

          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'stretch',
            paddingVertical: 3,
            // paddingHorizontal: 10,
          }}>
            <View style={{flex: 0.9, alignSelf: 'flex-start'}}>
              <Text style={styles.propertyText}>{t('IBAN')}</Text>
            </View>
            <View style={{flex: 1, alignSelf: 'flex-start'}}>
              <Text style={[styles.propertyValue, {textAlign: 'left'}]}>{iban}</Text>
            </View>
          </View>

        </View>
        <View style={{flex: 0.1, justifyContent: 'space-evenly', alignItems: 'center'}}>
          <IconTouchableContainer dark onPress={() => navigate('EditBank',{
            id,
            name,
            owner_name,
            account_number,
            iban,
          })}>
            <EditProfileIcon fill={"#1B2B5D"}/>
          </IconTouchableContainer>
          <IconTouchableContainer dark onPress={deleteHandler}>
            <TrashIcon width={18} height={20} fill={'#DC2F30'}/>
          </IconTouchableContainer>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  accountItem: {},
  propertyname: {
    color: Colors.mainColor,
    fontSize: Pixel(30),
    fontFamily: Fonts.medium,
  },
  propertyText: {
    color: Colors.mainColor,
    fontSize: Pixel(24),
    fontFamily: Fonts.medium,
    textAlign: "left"
  },
  propertyValue: {
    color: ColorWithOpacity(Colors.dark, 0.5),
    fontSize: Pixel(22),
    fontFamily: Fonts.regular,
    alignSelf: 'flex-start',
  },
});

export default BankAccount;
