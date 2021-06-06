import React, {FC, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Container} from "../components/containers/Containers";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import PageLoader from "../components/PageLoader";
import EmptyList from "../components/EmptyList";
import {PlusIcon} from "../assets/icons/SvgIcons";
import IconTouchableContainer from "../components/touchables/IconTouchableContainer";
import {useNavigation} from "@react-navigation/native";
import OrderItem from "../components/OrderItem";
import {searchOrdersApi} from "../store/actions/orders";
import HomeHeader from "../components/header/HomeHeader";
import {RootState} from "../store/store";

const {width, height} = Dimensions.get('window');

const Search: FC = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [state, setstate] = useState({loader: false});
  const searchResults = useSelector((state: RootState) => state.orders.searchResults);

  const RightHeaderAction = () => {
    return (
      <IconTouchableContainer dark onPress={() => navigate('NewBank')}>
        <PlusIcon/>
      </IconTouchableContainer>
    )
  };

  const handleSearch = (request_id: string) => {
    setstate(old => ({...old, loader: true}));
    dispatch(
      searchOrdersApi(request_id, (success => success && setstate(old => ({...old, loader: false})))
      )
    )
  }

  return (
    <Container>
      <View style={{paddingHorizontal: 15}}>
        <HomeHeader handleSearch={handleSearch}/>
      </View>
      {state.loader ? (<PageLoader/>) : (
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          data={searchResults}
          renderItem={({item}) => (<OrderItem {...item}/>)}
          ListEmptyComponent={() => <EmptyList text={t('There are no results')}/>}
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


export default Search;
