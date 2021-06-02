import React, {FC, useState} from 'react';
import {Platform, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle,} from 'react-native';
import {Colors, ColorWithOpacity, Fonts, Pixel, ScreenOptions,} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {NavigationProps} from '../../constants/interfaces';
import {HeaderLogo, NotificationIcon, SearchIcon,} from '../../assets/icons/SvgIcons';
import IconTouchableContainer from '../touchables/IconTouchableContainer';
import {useTranslation} from 'react-i18next';
import Input from '../textInputs/Input';
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

interface IHeader {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const SearchSubmitBtn: FC = () => {
  return (
    <IconTouchableContainer style={styles.submitSearchBtn}>
      <SearchIcon/>
    </IconTouchableContainer>
  );
};

const HomeHeader: FC<NavigationProps & IHeader> = ({
                                                     title,
                                                     containerStyle,
                                                     titleStyle,
                                                   }) => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const notifications: any = useSelector((state: RootState) => state.auth.notifications);
  const [state, setstate] = useState({
    searchKeyword: '',
  });

  return (
    <View style={[styles.mainContainer, containerStyle]}>
      <View style={[styles.rowConatiner]}>
        <View style={styles.right}>
          <HeaderLogo/>
        </View>

        <View style={styles.centerContainer}>
          <Input
            textInputContainer={{height: Pixel(60), padding: 0, fontSize: Pixel(25)}}
            options={{
              value: state.searchKeyword,
              onChangeText: value => {
                setstate(old => ({...old, searchKeyword: value}));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Search by order number'),
            }}
          />
        </View>

        <View style={styles.leftContainer}>
          <IconTouchableContainer style={{overflow: 'visible'}} onPress={() => navigate('Notifications')}>
            <NotificationIcon/>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{!!notifications && notifications.length}</Text>
            </View>
          </IconTouchableContainer>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    paddingTop: ScreenOptions.StatusBarHeight + 15,
    minHeight:
      Platform.OS === 'android'
        ? 56 + ScreenOptions.StatusBarHeight
        : 64 + ScreenOptions.StatusBarHeight,
    // paddingHorizontal: 15,
    zIndex: 200,
    // paddingBottom: Pixel(30),
  },
  rowConatiner: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftContainer: {
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
    // backgroundColor:"#f1f1f1"
  },
  centerContainer: {
    alignItems: 'center',
    flex: 0.93
  },
  searchContainer: {},
  submitSearchBtn: {
    backgroundColor: Colors.white,
  },
  notificationBadge: {
    width: 16,
    height: 16,
    backgroundColor: Colors.secondColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100
  },
  notificationBadgeText: {
    color: Colors.white,
    fontSize: Pixel(19),
    fontFamily: Fonts.bold,
    textAlign: 'center'
  }
});
