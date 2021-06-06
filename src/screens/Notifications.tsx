import React, {FC} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Container} from "../components/containers/Containers";
import Footer from "../components/containers/Footer";
import {useTranslation} from "react-i18next";
import NotificationHeader from "../components/header/CustomHeader";
import NotificationItem from "../components/Notification/NotificationItem";
import {useNavigation} from "@react-navigation/native";
import CustomHeader from "../components/header/CustomHeader";

const Notifications: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const data = [
    {
      id: 1,
      title: t('The purchase order has been confirmed by the first party, confirm the payment to finish the process'),
      date: new Date().getDate(),
      onPress: () => {
        navigate('NotificationDetail')
      }
    },
    {
      id: 2,
      title: t('The purchase order has been confirmed by the first party, confirm the payment to finish the process'),
      date: new Date().getDate(),
      onPress: () => {
        navigate('NotificationDetail')
      }
    },
    {
      id: 3,
      title: t('The purchase order has been confirmed by the first party, confirm the payment to finish the process'),
      date: new Date().getDate(),
      onPress: () => {
        navigate('NotificationDetail')
      }
    },
  ];
  return (
    <Container>
      <CustomHeader title={t('Notifications')}/>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 25}}
        data={data}
        renderItem={({item}) => <NotificationItem {...item}/>}
        keyExtractor={item => item.id.toString()}
      />
      <Footer/>
    </Container>
  );
};


const styles = StyleSheet.create({});

export default Notifications;
