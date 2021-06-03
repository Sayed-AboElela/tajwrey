import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, ColorWithOpacity, Fonts, Pixel} from "../constants/styleConstants";

interface IEmptyList {
  text: string;
}

const EmptyList: FC<IEmptyList> = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#f1f1f1',
    // alignSelf:'center'
  },
  text: {
    fontFamily: Fonts.medium,
    fontSize: Pixel(30),
    // textAlign: 'center',
    color: ColorWithOpacity(Colors.dark, 0.5),
    marginTop:Pixel(100)
  }

});

export default EmptyList;
