import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container} from "../components/containers/Containers";
import Footer from "../components/containers/Footer";
import {useTranslation} from "react-i18next";
import NotificationHeader from "../components/header/CustomHeader";
import Button from "../components/touchables/Button";
import {Colors, Fonts, Pixel} from "../constants/styleConstants";

const NotificationDetail: FC = () => {
  const {t} = useTranslation();

  return (
    <Container>
      <NotificationHeader title={t('Notifications')}/>
      <View style={styles.container}>
        <Text
          style={styles.msgText}>{t('The purchase order has been confirmed by the first party, confirm the payment to finish the process')}</Text>
        <Button
          style={styles.confirmBtn}
          title={t('Confirm the payment')}
          onPress={() => {
            console.log('Confirm the payment')
          }}
        />
      </View>
      <Footer/>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Pixel(70),
    marginTop: Pixel(30),
  },
  msgText: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(32),
    color: Colors.mainColor,
    marginTop: Pixel(20),
    textAlign: "center"
  },
  confirmBtn: {
    backgroundColor: Colors.secondColor,
    marginTop: Pixel(60),
  },
});

export default NotificationDetail;
