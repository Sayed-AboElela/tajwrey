import React from 'react';
import {I18nManager, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle,} from 'react-native';
import {Colors, ColorWithOpacity, Fonts, Pixel} from '../../constants/styleConstants';

const {isRTL} = I18nManager;

interface Props {
  options?: TextInputProps & { ref?: (ref: any) => void };
  contentContainerStyle?: StyleProp<ViewStyle>;
  textInputContainer?: TextInputProps & StyleProp<ViewStyle>;
  iconRightStyle?: StyleProp<ViewStyle>;
  iconLeftStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: TextInputProps;
  leftContent?: () => JSX.Element;
  rightContent?: () => JSX.Element;
  erorrMessage?: string | boolean;
}

const Input: React.FC<Props> = ({
                                  options,
                                  contentContainerStyle,
                                  textInputContainer,
                                  placeholderTextColor,
                                  leftContent,
                                  rightContent,
                                  erorrMessage,
                                  iconRightStyle,
                                  iconLeftStyle,
                                }) => {
  return (
    <>
      <View
        style={[
          styles.container,
          contentContainerStyle,
          !!erorrMessage && {borderColor: Colors.warning},
        ]}>
        {rightContent && (
          <View style={[styles.iconRight, iconRightStyle]}>
            {rightContent()}
          </View>
        )}
        <TextInput
          {...options}
          style={[
            styles.textInputContainer,
            rightContent && {paddingEnd: 25},
            leftContent && {paddingStart: 25},
            textInputContainer,
          ]}
        />
        {leftContent && (
          <View style={[styles.iconLeft, iconLeftStyle]}>{leftContent()}</View>
        )}
      </View>
      {!!erorrMessage && (
        <View style={{marginBottom: 7}}>
          <Text
            style={[
              styles.errorMessage,
              {color: !!erorrMessage ? Colors.warning : 'transparent'},
            ]}>
            {erorrMessage}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Pixel(100),
    padding: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.CommonBorderColor,
    paddingHorizontal: 20,
    marginVertical: Pixel(14)
  },
  textInputContainer: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(28),
    color: ColorWithOpacity(Colors.gray, 0.5),
    height: Pixel(80),
    textAlign: isRTL ? 'right' : 'left'
    // alignSelf:'flex-start'
  },
  iconLeft: {
    position: 'absolute',
    paddingLeft: 20,
    top: 18,
  },
  iconRight: {
    position: 'absolute',
    // paddingRight: 10,
    top: 14,
    right: 15,
    alignSelf: 'center',
    zIndex: 100,
  },
  errorMessage: {
    textAlign: 'center',
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
});

export default Input;
