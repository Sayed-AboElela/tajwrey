import React, {FC, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from "../../components/containers/Containers";
import Header from "../../components/header/Header";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Input from "../../components/textInputs/Input";
import {Colors, Fonts, Pixel} from "../../constants/styleConstants";
import {InputErrorHandler} from "../../constants/helpers";
import Button from "../../components/touchables/Button";
import {AddNewBankHandler, UpdateBankHandler} from "../../store/actions/banks";
import {useNavigation, useRoute} from "@react-navigation/native";

const {width, height} = Dimensions.get('window');

const EditBank: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const addBankErrors = useSelector((state: RootState) => state.banks.addBankErrors);

  const route = useRoute();

  const [state, setstate] = useState({
    loader: false,
    name: route.params?.name,
    account_number: route.params?.account_number,
    owner_name: route.params?.owner_name,
    iban: route.params?.iban,
  });

  const submitHandler = () => {
    setstate(old => ({...old, loader: true}));
    console.log(state, ' state');
    dispatch(
      UpdateBankHandler(route.params?.id,state.name, state.account_number, state.owner_name, state.iban, success => {
        setstate(old => ({...old, loader: false}));
        success && navigate('Banks');
      }),
    );
  };

  return (
    <Container>

      <Header title={t('New bank account')}/>
      <Content contentContainerStyle={{paddingBottom: 50,paddingTop:30}}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("Bank name")}</Text>
          <Input
            options={{
              value: state.name,
              onChangeText: value => {
                setstate(old => ({...old, name: value}));
              },
            }}
            erorrMessage={InputErrorHandler(addBankErrors, 'name')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("Account number")}</Text>
          <Input
            options={{
              value: state.account_number,
              onChangeText: value => {
                setstate(old => ({...old, account_number: value}));
              },
            }}
            erorrMessage={InputErrorHandler(addBankErrors, 'account_number')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("Account owner")}</Text>
          <Input
            options={{
              value: state.owner_name,
              onChangeText: value => {
                setstate(old => ({...old, owner_name: value}));
              },
            }}
            erorrMessage={InputErrorHandler(addBankErrors, 'owner_name')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("IBAN")}</Text>
          <Input
            options={{
              value: state.iban,
              onChangeText: value => {
                setstate(old => ({...old, iban: value}));
              },
            }}
            erorrMessage={InputErrorHandler(addBankErrors, 'iban')}
          />
        </View>
        <View style={styles.submitContainer}>
          <Button
            title={t('Send')}
            onPress={submitHandler}
            loader={state.loader}
          />
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginTop: 7,
  },
  inputLabel: {
    color: Colors.mainColor,
    fontFamily: Fonts.medium,
    // marginBottom: Pixel(17),
    alignSelf: 'flex-start',
    marginStart: Pixel(35),
    textAlign: 'left'
  },
  submitContainer: {
    marginVertical: Pixel(80),
  },
});


export default EditBank;
