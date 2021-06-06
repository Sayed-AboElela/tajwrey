import React, {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Container} from "../components/containers/Containers";
import Footer from "../components/containers/Footer";
import {useTranslation} from "react-i18next";
import CustomHeader from "../components/header/CustomHeader";
import NotificationItem from "../components/Notification/NotificationItem";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {deleteNotificationsApi, notificationsApi} from "../store/actions/settings";
import EmptyList from "../components/EmptyList";
import IconTouchableContainer from "../components/touchables/IconTouchableContainer";
import {TrashIcon} from "../assets/icons/SvgIcons";
import {Colors} from "../constants/styleConstants";
import PageLoader from "../components/PageLoader";

const Notifications: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const [state, setstate] = useState({loader: true});
  const notifications: any = useSelector((state: RootState) => state.settings.notifications);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('notifications', notifications)
    dispatch(notificationsApi((success) => success && setstate(old => ({...old, loader: false}))));
  }, []);


  const deleteHandler = () => {
    dispatch(deleteNotificationsApi((success) => success && setstate(old => ({...old, loader: false}))));
  }

  const RightHeaderAction = () => {
    return (
      <IconTouchableContainer dark onPress={deleteHandler}>
        <TrashIcon fill={Colors.mainColor}/>
      </IconTouchableContainer>
    )
  };
  return (
    <Container>
      <CustomHeader rightContent={notifications.length > 0 ? RightHeaderAction : () => <View/>}
                    title={t('Notifications')}/>
      {state.loader ? (<PageLoader/>) : (
        <FlatList
          contentContainerStyle={{paddingHorizontal: 25}}
          data={notifications}
          renderItem={({item}) => <NotificationItem {...item}/>}
          ListEmptyComponent={() => <EmptyList text={t('There are no notifications')}/>}
          keyExtractor={item => item.id.toString()}
        />)}
      <Footer/>
    </Container>
  );
};


const styles = StyleSheet.create({
}
);

export default Notifications;
