import {FlatList, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {commonStyles} from '../../styles/styles';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';
import OrderItem from "./OrderItem";

interface IOrdersList {
  data: Array<{ title: string; icon: JSX.Element, navigateTo: string }>;
}


const OrdersList: FC<IOrdersList> = ({data}) => {
  return (
    <FlatList
      keyExtractor={item => item.title}
      columnWrapperStyle={{justifyContent: 'space-between',}}
      data={data}
      renderItem={({item}) => <OrderItem {...item}/>}
      horizontal={false}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
});
export default OrdersList;
