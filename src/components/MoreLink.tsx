import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {commonStyles} from "../styles/styles";
import {DropdownArrowIcon, NotificationIcon} from "../assets/icons/SvgIcons";
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../constants/styleConstants";

interface IMoreLink {
  title: string;
  icon: JSX.Element;
  onPress: () => void;
}


const MoreLink: FC<IMoreLink> = ({title,icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <View style={{...commonStyles.rowBox, justifyContent: 'space-between'}}>
        {icon}
        <Text style={styles.btnTitle}>{title}</Text>
      </View>
      <DropdownArrowIcon width={7.5} height={12} style={commonStyles.rtlRotate}/>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  btnContainer: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: ColorWithOpacity('#707070', 0.2),
    paddingHorizontal: Pixel(15),
    paddingBottom: Pixel(30),
    marginTop: Pixel(40),
  },
  btnTitle: {
    marginStart: Pixel(30),
    fontFamily: Fonts.bold,
    fontSize: Pixel(31),
    color: ColorWithOpacity(Colors.dark, 0.6),
  },

});

export default MoreLink;
