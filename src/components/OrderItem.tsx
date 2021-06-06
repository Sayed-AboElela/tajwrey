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
  phone: string;
  description: string;
  commission_source: string;
  type: string;
  status: string;
  cost: number;
}

const OrderItem: FC<IBankAccount> = ({
                                       id, name,
                                       phone,
                                       description,
                                       commission_source,
                                       type,
                                       status,
                                       cost
                                     }) => {
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
              <Text style={styles.propertyText}>{t("Applicant's name")}</Text>
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
              <Text style={styles.propertyText}>{t('Phone')}</Text>
            </View>
            <View style={{flex: 1, alignSelf: 'flex-start'}}>
              <Text style={[styles.propertyValue]}>{phone}</Text>
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
              <Text style={styles.propertyText}>{t('Commission source')}</Text>
            </View>
            <View style={{flex: 1, alignSelf: 'flex-start'}}>
              <Text style={[styles.propertyValue, {textAlign: 'left'}]}>{commission_source}</Text>
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
              <Text style={styles.propertyText}>{t('Request type')}</Text>
            </View>
            <View style={{flex: 1, alignSelf: 'flex-start'}}>
              <Text style={[styles.propertyValue, {textAlign: 'left'}]}>{type}</Text>
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
              <Text style={styles.propertyText}>{t('Status')}</Text>
            </View>
            <View style={{flex: 1, alignSelf: 'flex-start'}}>
              <Text style={[styles.propertyValue, {textAlign: 'left'}]}>{status}</Text>
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
              <Text style={styles.propertyText}>{t('Cost')}</Text>
            </View>
            <View style={{flex: 1, alignSelf: 'flex-start'}}>
              <Text style={[styles.propertyValue, {textAlign: 'left'}]}>{cost}</Text>
            </View>

          </View>

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

export default OrderItem;
