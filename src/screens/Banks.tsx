import React, {FC} from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import {Container} from "../components/containers/Containers";
import Header from "../components/header/Header";
import {useTranslation} from "react-i18next";
import BankAccount from "../components/BankAccount";

const {width, height} = Dimensions.get('window');

const About: FC = () => {
  const {t} = useTranslation();
  const data = [
    {
      id: 1,
      title: t('National Commercial Bank'),
      image: require('../assets/images/bank.png'),
      account_owner: t('Tajwrey Foundation'),
      account_number: '12345678901234',
      iban: '12345678901234',
    },
    {
      id: 2,
      title: t('National Commercial Bank2'),
      image: require('../assets/images/bank.png'),
      account_owner: t('Tajwrey Foundation2'),
      account_number: '12345678901234',
      iban: '12345678901234',
    },
  ]
  return (
    <Container>
      <Header title={t('Banks')}/>
      <FlatList data={data}
                renderItem={({item}) => (
                  <BankAccount {...item}/>
                )}
                keyExtractor={(item) => item.id.toString()}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


export default About;
