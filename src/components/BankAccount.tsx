import React, {FC} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from "react-i18next";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../constants/styleConstants";
import {commonStyles} from "../styles/styles";
// import Icon from "react-native-vector-icons/FontAwesome5";
/*************************************************************/
interface IBankAccount {
  id:number;
  title: string;
  image: string;
  account_owner: string;
  account_number: string;
  iban: string;
}

const BankAccount: FC<IBankAccount> = ({id,title, image, account_owner, account_number, iban}) => {
  const {t} = useTranslation();
  const screenWidth = Dimensions.get('window');
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
        width: '21%',
        overflow: 'hidden',
        justifyContent: "flex-start",
        alignItems: 'flex-start',
      }}>
        <View style={{width: 60, height: 60, overflow: 'hidden', borderRadius: 30}}>
          <Image style={{width: '100%', height: '100%'}} source={image}/>
        </View>
      </View>

      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 5
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignSelf: 'stretch',
          paddingVertical: 3,
          // paddingHorizontal: 10,
        }}>
          <View style={{flex: 0.8, alignSelf: 'flex-start'}}>
            <Text style={styles.propertyText}>{t('Bank name')}</Text>
          </View>
          <View style={{flex: 1, alignSelf: 'flex-start'}}>
            <Text style={styles.propertyValue}>{title}</Text>
          </View>
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignSelf: 'stretch',
          paddingVertical: 3,
          // paddingHorizontal: 10,
        }}>
          <View style={{flex: 0.8, alignSelf: 'flex-start'}}>
            <Text style={styles.propertyText}>{t('Account owner')}</Text>
          </View>
          <View style={{flex: 1, alignSelf: 'flex-start'}}>
            <Text style={[styles.propertyValue]}>{account_owner}</Text>
          </View>
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignSelf: 'stretch',
          paddingVertical: 3,
          // paddingHorizontal: 10,
        }}>
          <View style={{flex: 0.8, alignSelf: 'flex-start'}}>
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
          <View style={{flex: 0.8, alignSelf: 'flex-start'}}>
            <Text style={styles.propertyText}>{t('IBAN')}</Text>
          </View>
          <View style={{flex: 1, alignSelf: 'flex-start'}}>
            <Text style={[styles.propertyValue, {textAlign: 'left'}]}>{iban}</Text>
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  accountItem: {},
  propertyTitle: {
    color: Colors.mainColor,
    fontSize: Pixel(30),
    fontFamily: Fonts.medium,
  },
  propertyText: {
    color: Colors.mainColor,
    fontSize: Pixel(24),
    fontFamily: Fonts.medium,
    textAlign:"left"
  },
  propertyValue: {
    color: ColorWithOpacity(Colors.dark,0.5),
    fontSize: Pixel(22),
    fontFamily: Fonts.regular,
    alignSelf: 'flex-start',
  },
});

export default BankAccount;
