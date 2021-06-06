import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container} from "../components/containers/Containers";
import Footer from "../components/containers/Footer";
import HomeHeader from '../components/header/HomeHeader';
import HomeSlider from '../components/Home/HomeSlider';
import {useTranslation} from "react-i18next";
import {BuyHomeIcon, SaleHomeIcon} from "../assets/icons/SvgIcons";
import OrdersList from "../components/Home/OrdersList";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../constants/styleConstants";
import {useDispatch} from "react-redux";
import {searchOrdersApi} from "../store/actions/orders";
import {useNavigation} from "@react-navigation/native";

const Home: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const handleSearch = (request_id: string) => {
    dispatch(
      searchOrdersApi(request_id, (success => {
            success && navigate('Search')
            success && console.log('searchOrdersApi success')
          }
        )
      )
    )
  }


  const orderTypeData = [
    {
      title: t('Sale order'),
      icon: <SaleHomeIcon/>,
      navigateTo: 'Sale'
    },
    {
      title: t('Purchase order'),
      icon: <BuyHomeIcon/>,
      navigateTo: 'Buy'
    },
  ];

  return (
    <Container>
      <View style={{paddingHorizontal: 15}}>
        <HomeHeader handleSearch={handleSearch}/>
        <HomeSlider/>
        <OrdersList data={orderTypeData}/>
        <Text
          style={styles.copyrights}>{t('All rights reserved © Tajwrey Corporation') + new Date().getFullYear()}</Text>
      </View>
      <Footer/>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  copyrights: {
    fontFamily: Fonts.medium,
    fontSize: Pixel(28),
    textAlign: 'center',
    marginTop: Pixel(250),
    color: ColorWithOpacity(Colors.dark, 0.6)
  }
});
