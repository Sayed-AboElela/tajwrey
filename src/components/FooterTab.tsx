import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts} from "../constants/styleConstants";

interface IFooterTab {
  active: boolean;
  label: string;
  onPress: () => void;
  Icon: () => JSX.Element;
}

const FooterTab: FC<IFooterTab> = ({active, label, onPress, Icon}) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.tabContainer}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon/>
        <Text
          style={
            active
              ? {...styles.activeTitle}
              : {...styles.inActiveTitle}
          }>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  tabContainer: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width:'18.5%'
  },
  activeIcon: {
    fontSize: 20,
    color: Colors.secondColor,
    paddingVertical: 10,
  },
  inActiveIcon: {
    fontSize: 26,
    color: Colors.mainColor,
    // paddingVertical: '5@vs',
    // paddingBottom:10
  },
  activeTitle: {
    color: Colors.secondColor,
    fontFamily: Fonts.bold,
    fontSize: 11,
    marginTop: 3,

    // paddingBottom: 10,
  },
  inActiveTitle: {
    color: Colors.mainColor,
    fontSize: 11,
    fontFamily: Fonts.bold,
    marginTop: 3,
    // paddingBottom: 10,

  },
});

export default FooterTab;
