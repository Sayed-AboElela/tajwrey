import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {commonStyles} from '../../styles/styles';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

interface IOrderItem {
  // index: number;
  title: string;
  icon: JSX.Element;
  navigateTo: string;
}

const OrderItem: FC<IOrderItem> = ({title, icon, navigateTo}) => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigate(navigateTo);
      }}>
      {icon}
      <Text numberOfLines={1} style={styles.itemTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    ...commonStyles.boxShadow,
    borderRadius: 15,
    width: '47.5%',
    backgroundColor: Colors.mainColor,
    minHeight:Pixel(200),
    marginBottom: 15,
    paddingVertical: Pixel(60),
    position: 'relative',
    alignItems: 'center'
  },
  itemTitle:{
    fontFamily:Fonts.bold,
    fontSize:Pixel(34),
    marginTop:Pixel(25),
    color:Colors.white
  },
});

export default OrderItem;
