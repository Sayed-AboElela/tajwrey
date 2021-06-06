import React, {FC} from "react";
import {
  I18nManager,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import {useTranslation} from "react-i18next";
import {LanguageHandler} from "../store/actions/settings";
import {Colors, Fonts, Pixel} from "../constants/styleConstants";
import {useDispatch} from "react-redux";

const {isRTL} = I18nManager;

/*************************************************************/

interface ILangModal {
  showProp: boolean;
  toggleLangModal: () => void;
}

const LangModal: FC<ILangModal> = ({showProp, toggleLangModal,}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal animationType="slide" transparent={true} visible={showProp}>
      <TouchableWithoutFeedback onPress={() => toggleLangModal()}>
        <View style={styles.mainWrapper}>

          <View style={styles.modalWrapper}>
            <Text style={styles.head}>{t('Please select language')}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={[styles.langBtn, {backgroundColor: isRTL ? '#878787' : Colors.mainColor}]}
                                onPress={() => {
                                  toggleLangModal()
                                  dispatch(LanguageHandler('en'));
                                }}>
                <Text style={styles.langBtnText}>{t('English')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.langBtn, {backgroundColor: isRTL ? Colors.mainColor : '#878787'}]}
                                onPress={() => {
                                  toggleLangModal()
                                  dispatch(LanguageHandler('ar'))
                                }}>
                <Text style={styles.langBtnText}>{t('Arabic')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};


const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "rgba(186,191,206,0.8)",
  },
  modalWrapper: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: Pixel(50),
    paddingBottom: 60,
    paddingTop: 20,
  },
  head: {
    fontFamily: Fonts.bold,
    fontSize: Pixel(32),
    color: "#000",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 20,
    // paddingVertical: "20@vs",
  },

  langBtn: {
    width: '45%',
    backgroundColor: '#878787',
    elevation: 2,
    borderRadius: 10,
    padding: 10
  },
  langBtnText: {
    color: "#fff",
    fontSize: Pixel(30),
    fontFamily: Fonts.medium,
    textAlign: 'center'
  }
});

export default LangModal;
