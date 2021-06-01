import React, { FC, useState } from 'react';
import { Platform, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle, } from 'react-native';
import { Colors, ColorWithOpacity, Fonts, Pixel, ScreenOptions, } from '../../constants/styleConstants';
import { commonStyles } from '../../styles/styles';
import { NavigationProps } from '../../constants/interfaces';
import {
  HeaderLogo,
  NotificationIcon,
  SearchIcon,
} from '../../assets/icons/SvgIcons';
import IconTouchableContainer from '../touchables/IconTouchableContainer';
import { useTranslation } from 'react-i18next';
import Input from '../textInputs/Input';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

interface IHeader {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const SearchSubmitBtn: FC = () => {
  return (
    <IconTouchableContainer style={styles.submitSearchBtn}>
      <SearchIcon />
    </IconTouchableContainer>
  );
};

const HomeHeader: FC<NavigationProps & IHeader> = ({
  navigate,
  goBack,
  name,
  title,
  containerStyle,
  titleStyle,
}) => {
  const { t } = useTranslation();
  const [state, setstate] = useState({
    searchKeyword: '',
  });

  return (
    <View style={[styles.mainContainer, containerStyle]}>
      <View style={[styles.rowConatiner]}>
        <View style={styles.right}>
          <HeaderLogo />
        </View>

        <View style={styles.centerContainer}>
          <Input
            textInputContainer={{ height: Pixel(60) , fontSize: Pixel(25),}}
            rightContent={() => <SearchSubmitBtn />}
            iconRightStyle={{ top: 4, right: 10, }}
            options={{
              value: state.searchKeyword,
              onChangeText: value => {
                setstate(old => ({ ...old, searchKeyword: value }));
              },
              placeholderTextColor: ColorWithOpacity(Colors.gray, 0.5),
              placeholder: t('Search by order number'),
            }}
          />
        </View>

        <View style={styles.leftContainer}>
          <IconTouchableContainer onPress={() => navigate('Notifications')}>
            <NotificationIcon />
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
  },
  centerContainer: {
    alignItems: 'center',
    flex: 0.93
  },
  searchContainer: {

  },
  submitSearchBtn: {
    backgroundColor: Colors.white,
  },
});
