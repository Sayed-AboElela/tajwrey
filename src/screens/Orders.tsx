import React, {FC, useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import {Container} from "../components/containers/Containers";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import PageLoader from "../components/PageLoader";
import {RootState} from "../store/store";
import EmptyList from "../components/EmptyList";
import {PlusIcon} from "../assets/icons/SvgIcons";
import IconTouchableContainer from "../components/touchables/IconTouchableContainer";
import {useNavigation} from "@react-navigation/native";
import OrderItem from "../components/OrderItem";
import {ordersApi} from "../store/actions/orders";
import Header from "../components/header/Header";

const {width, height} = Dimensions.get('window');

const Orders: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [state, setstate] = useState({loader: true});
  const orders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
    dispatch(ordersApi(
      (success) => success && setstate(old => ({...old, loader: false}))
    ));
  }, []);

  const RightHeaderAction = () => {
    return (
      <IconTouchableContainer dark onPress={() => navigate('NewBank')}>
        <PlusIcon/>
      </IconTouchableContainer>
    )
  };

  return (
    <Container>
      <Header title={t('Orders')}/>
      {state.loader ? (<PageLoader/>) : (
        <FlatList
          contentContainerStyle={{paddingBottom:100}}
          data={orders}
          renderItem={({item}) => (<OrderItem {...item}/>)}
          ListEmptyComponent={() => <EmptyList text={t('There are no orders')}/>}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


export default Orders;
