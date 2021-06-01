import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, ColorWithOpacity, Fonts, Pixel} from '../../constants/styleConstants';
import {commonStyles} from "../../styles/styles";

interface INotificationItem {
  id: number;
  title: string;
  date: number;
  onPress: () => void;
}

const NotificationItem: FC<INotificationItem> = ({
                                                   id,
                                                   title,
                                                   date,
                                                   onPress
                                                 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      key={id}
      style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Pixel(30),
    backgroundColor: Colors.white,
    paddingHorizontal: Pixel(30),
    ...commonStyles.boxShadow,
    marginTop: 15,
    borderRadius: 15
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: Pixel(26),
    marginBottom: 7,
    color: Colors.mainColor,
  },
  date: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(25),
    color: ColorWithOpacity(Colors.dark, 0.5),
    marginTop: Pixel(15),
  },
});

export default NotificationItem;
