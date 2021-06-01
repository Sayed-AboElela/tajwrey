import {I18nManager, StyleSheet} from 'react-native';
import {Fonts} from '../constants/styleConstants';

const {isRTL} = I18nManager;
export const commonStyles = StyleSheet.create({
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  boxShadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  mainTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  rtlRotate: {transform: [{rotateY: isRTL ? '0deg' : '160deg'}]},
  contentPaddingHorizontal: {
    paddingHorizontal: 25,
  }

});


export const dir = isRTL ? 'left' : 'right';
