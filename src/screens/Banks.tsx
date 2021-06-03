import React, {FC, useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import {Container} from "../components/containers/Containers";
import Header from "../components/header/Header";
import {useTranslation} from "react-i18next";
import BankAccount from "../components/BankAccount";
import {useDispatch, useSelector} from "react-redux";
import {banksApi} from "../store/actions/banks";
import PageLoader from "../components/PageLoader";
import {RootState} from "../store/store";
import EmptyList from "../components/EmptyList";

const {width, height} = Dimensions.get('window');

const Banks: FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [state, setstate] = useState({loader: true});
  const banks = useSelector((state: RootState) => state.banks.banks);
  // const data = [
  //   {
  //     id: 1,
  //     title: t('National Commercial Bank'),
  //     image: require('../assets/images/bank.png'),
  //     account_owner: t('Tajwrey Foundation'),
  //     account_number: '12345678901234',
  //     iban: '12345678901234',
  //   },
  //   {
  //     id: 2,
  //     title: t('National Commercial Bank2'),
  //     image: require('../assets/images/bank.png'),
  //     account_owner: t('Tajwrey Foundation2'),
  //     account_number: '12345678901234',
  //     iban: '12345678901234',
  //   },
  // ];

  useEffect(() => {
    dispatch(banksApi(
      (success) => success && setstate(old => ({...old, loader: false}))
    ));
  }, []);

  return (
    <Container>
      <Header title={t('Banks')} />
      {state.loader ? (<PageLoader/>) : (
        <FlatList
          data={banks}
          renderItem={({item}) => (<BankAccount {...item}/>)}
          ListEmptyComponent={()=><EmptyList text={t('There are no bank accounts')}/>}
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


export default Banks;
