import React, {FC} from 'react';
import {Platform, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle,} from 'react-native';
import {Colors, Fonts, Pixel, ScreenOptions,} from '../../constants/styleConstants';
import {commonStyles} from '../../styles/styles';
import {ArrowRightIcon} from '../../assets/icons/SvgIcons';
import IconTouchableContainer from '../touchables/IconTouchableContainer';
import {useNavigation} from '@react-navigation/native';

interface IHeader {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  noBack?: boolean;
}

const Header: FC<IHeader> = ({title, noBack, containerStyle, titleStyle}) => {
  const {goBack} = useNavigation();
  return (
    <View style={[styles.container, containerStyle]}>
      {!noBack && (<View style={styles.right}>
        <IconTouchableContainer dark onPress={goBack} style={styles.icons}>
          <ArrowRightIcon width={20} style={commonStyles.rtlRotate}/>
        </IconTouchableContainer>
      </View>)}
      {!!title && (
        <View style={[styles.titleConatiner, !noBack && {marginEnd: Pixel(35),}]}>
          <Text
            style={[styles.title, titleStyle]}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {title ? title : ''}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: ScreenOptions.StatusBarHeight,
    height:
      Platform.OS === 'android'
        ? 56 + ScreenOptions.StatusBarHeight
        : 56 + ScreenOptions.StatusBarHeight,
    paddingHorizontal: 15,
    ...commonStyles.rowBox,
    zIndex: 200,
    // justifyContent: 'center',
  },
  left: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  titleConatiner: {
    flex: 1,
    ...commonStyles.rowBox,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',

  },
  title: {
    fontSize: Pixel(30),
    color: Colors.mainColor,
    fontFamily: Fonts.medium,
  },

  icons: {
    width: Pixel(55),
    height: Pixel(55),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
