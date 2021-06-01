import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, ColorWithOpacity, Fonts, Pixel} from '../constants/styleConstants';
import {commonStyles} from '../styles/styles';
import {CheckedIcon, UnCheckedIcon} from "../assets/icons/SvgIcons";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";

interface IPaymentOption {
  id: number;
  title: string;
  onPress: () => void;
  selected: boolean,
}

const CheckBox: FC<IPaymentOption> = ({
                                        id,
                                        title,
                                        onPress,
                                        selected,
                                      }) => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <View style={styles.checkBtn}>
        {selected ? <CheckedIcon/> : <UnCheckedIcon/>}
      </View>
      <Text style={styles.optionTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.rowBox,
    alignItems: 'center',
    paddingRight: Pixel(60),
    paddingLeft: Pixel(40),
    marginTop: Pixel(20),
  },
  checkBtn: {
    ...commonStyles.rowBox,
  },
  optionTitle: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(30),
    marginStart: Pixel(30),
    color: ColorWithOpacity(Colors.gray, 0.5),
  },

  actionsContainer: {
    justifyContent: "space-between",
  }

});

export default CheckBox;
