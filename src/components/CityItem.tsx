import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, ColorWithOpacity, Fonts, Pixel} from '../constants/styleConstants';

interface ICityItem {
  id: number;
  name: string;
  selected: boolean;
  onPress: () => void;
}

const CityItem: FC<ICityItem> = ({
                                   id,
                                   name,
                                   selected,
                                   onPress,
                                 }) => {
  return (
    <TouchableOpacity
      style={[styles.container, {borderBottomColor: selected ? Colors.mainColor : ColorWithOpacity(Colors.gray, 0.5)}]}
      onPress={() => onPress()}>
      <Text
        style={[styles.optionTitle, {color: selected ? Colors.mainColor : ColorWithOpacity(Colors.gray, 0.5)}]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...commonStyles.rowBox,
    width: '100%',
    // backgroundColor:'#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Pixel(25),
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: ColorWithOpacity(Colors.gray, 0.5),

  },
  optionTitle: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(30),
    color: ColorWithOpacity(Colors.gray, 0.5),
  },

  actionsContainer: {
    justifyContent: "space-between",
  }

});

export default CityItem;
